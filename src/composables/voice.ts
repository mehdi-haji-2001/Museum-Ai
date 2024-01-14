import { ref, watch } from 'vue'
import { useSettingsStore } from '../stores/settings'
import { computed } from 'vue'
import OpenAI from 'openai'

export function useVoice() {
  const store = useSettingsStore()

  const userQuery = ref('Please hold down the button to record your question.')

  const speechBot: any = new webkitSpeechRecognition() || new SpeechRecognition()

  // TODO: Watcher for change of these settings.

  const defaultStatements = ['Please hold down the button to record your question.', 'Thinking']

  speechBot.lang = 'en-US'
  speechBot.interimResults = true
  speechBot.timeout = 5000

  speechBot.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript
    userQuery.value = transcript.charAt(0).toUpperCase() + transcript.slice(1) + '?'
  }

  const playQuestion = () => {
    if ('speechSynthesis' in window) {
      const userQuestion = 'Did you ask   ' + userQuery.value
      const speak = new SpeechSynthesisUtterance(userQuestion)
      // TODO: Voice Selection should be from settings store.
      // TODO: Add validation for it the userQuestion is sufficient.
      speak.lang = 'en-US'
      speak.rate = 0.8
      window.speechSynthesis.speak(speak)
    } else {
      alert('Sorry, your browser does not support text to speech!')
    }
  }

  const getActiveDuration = computed(() => {
    return store.durations.find((duration) => duration.active)?.length
  })

  const produceAPIMessage = () => {
    return (
      `Respond to the following question with response whose duration is around ${getActiveDuration.value} seconds when spoken aloud: ` +
      userQuery.value
    )
  }

  const gpt_bot = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true
  })

  const botResponse = ref('')

  const produceResponse = async () => {
    botResponse.value = 'Thinking...'
    const responseStream = await gpt_bot.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: produceAPIMessage() }],
      stream: true
    })
    botResponse.value = ''
    // TODO: Test if this plays chunk by chunk as generated, or if we should play the whole audio at once.
    for await (const responsePiece of responseStream) {
      const rp = responsePiece.choices[0]?.delta?.content || ''
      botResponse.value += rp
      playResponse(rp)
    }
  }

  const playResponse = (playback: string) => {
    if ('speechSynthesis' in window) {
      const speak = new SpeechSynthesisUtterance(playback)
      window.speechSynthesis.speak(speak)
      // TODO: Configure Settings
    } else {
      alert('Your browser is not compatible. Please visit the website on a different browser.')
    }
  }

  watch(
    () => store.isRecording,
    (newValue: boolean, oldValue: boolean) => {
      console.log('Recording changed from ' + oldValue + ' to ' + newValue)
      if (oldValue == false && newValue == true) {
        resetUserQuery()
        speechBot.start()
      } else if (oldValue == true && newValue == false) {
        speechBot.stop()
        playQuestion()
      }
    }
  )

  watch(
    () => store.isPlaying,
    (newValue: boolean, oldValue: boolean) => {
      console.log('Playing changed from ' + oldValue + ' to ' + newValue)
      if (oldValue == false && newValue == true && validQuestion.value) {
        produceResponse()
      }
    }
  )

  const validQuestion = computed(() => {
    return (
      wordCount(userQuery.value) > 0 &&
      wordCount(userQuery.value) < 50 &&
      defaultStatements.every((statement) => !userQuery.value.includes(statement))
    )
  })

  const wordCount = (text: string) => {
    return text.split(' ').length
  }

  const resetUserQuery = () => {
    userQuery.value = defaultStatements[0]
  }

  return {
    userQuery,
    botResponse,
    resetUserQuery
  }
}
