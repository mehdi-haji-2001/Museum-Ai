import { ref, watch } from 'vue'
import { useSettingsStore, Step } from '../stores/settings'
import { useSpeechRecognition, useSpeechSynthesis } from '@vueuse/core'
import { useAI } from './AI'
import { defineStore } from 'pinia'
import { useReportStore } from '@/stores/report'

export const useVoice = defineStore('voice', () => {
  const store = useSettingsStore()
  const AI = useAI()
  const report = useReportStore()

  const userQuery = ref('Please hold down the button to record your question.')
  const originalQuery = ref('')
  const speakText = ref('')
  const listen = useSpeechRecognition()

  /**
   * Seeing as a SpeechSynthesisVoice is not a reactive object, we cannot directly pass the result of selectedVoice into { voice: selectedVoice.value.voice }.
   * Instead, the computation of the voice (which voice is active) must be done on a layer higher than assignment to useSpeechSynthesis, whose second property is:
   * UseSpeechSynthesisOptions
   */

  const defaultStatements = [
    'Please hold down the button to record your question.',
    'Please ask a valid question.',
    'Thinking...',
    'Sorry, your browser does not support text to speech!',
    'Sorry, I am having trouble connecting to the server, please try again later.'
  ]
  const voice = ref<SpeechSynthesisVoice>(undefined as unknown as SpeechSynthesisVoice)
  const speak = useSpeechSynthesis(speakText, { voice })

  watch(store.voices, (newValue: any) => {
    voice.value = newValue.find((v: any) => v.active).voice
  })

  watch(listen.result, (newValue: any) => {
    const transcript = newValue
    userQuery.value = transcript.charAt(0).toUpperCase() + transcript.slice(1) + '?'
  })

  const playQuestion = () => {
    if (!speak.isSupported) {
      alert('Sorry, your browser does not support text to speech!')
      return
    }
    speakText.value = `Did you ask    ${userQuery.value}`
    originalQuery.value = userQuery.value
    speak.speak()
  }

  const playResponse = (playback: string = `${AI.response}`) => {
    if (!speak.isSupported) {
      alert('Sorry, your browser does not support text to speech!')
      return
    }
    speakText.value = playback
    speak.speak()
  }

  watch(
    () => store.step,
    (newValue: Step, oldValue: Step) => {
      if (oldValue == Step.initial && newValue == Step.recording) {
        resetUserQuery()
        listen.start()
      } else if (oldValue == Step.recording && newValue == Step.editing) {
        listen.stop()
        playQuestion()
      } else if (oldValue == Step.editing && newValue == Step.loading) {
        if (userQuery.value != originalQuery.value) {
          report.incrementTQE()
        }
        if (!validQuestion(userQuery.value)) {
          alert('Please ask a valid question.')
          report.incrementQ(false, false)
          report.updateAQWC(wordCount(userQuery.value))
          store.step = Step.initial
          return
        }
        report.updateAQWC(wordCount(userQuery.value))
        AI.produceResponse(userQuery.value).then(() => {
          store.setStep(Step.playing)
          console.log(`AI response: ${AI.response}`)
        })
      } else if (oldValue == Step.loading && newValue == Step.playing) {
        playResponse(AI.response)
        store.addResponse(userQuery.value, AI.response)
        console.log(report.produceReport())
        console.log('finished playing')
      } else if (oldValue == Step.playing && newValue == Step.initial) {
        resetUserQuery()
        speak.stop()
        console.log('cancelled')
      } else {
        speak.stop()
        console.log('stop')
      }
    }
  )

  const validQuestion = (question: string) => {
    return (
      wordCount(question) > 0 &&
      wordCount(question) < 50 &&
      defaultStatements.every((statement: string) => !question.includes(statement)) &&
      question != ''
    )
  }

  const wordCount = (text: string) => {
    return text.split(' ').length
  }

  const resetUserQuery = () => {
    userQuery.value = defaultStatements[0]
  }

  return {
    userQuery,
    resetUserQuery,
    playResponse
  }
})
