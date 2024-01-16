import { ref, watch } from 'vue'
import { useSettingsStore, Step } from '../stores/settings'
import { computed } from 'vue'
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

  const selectedVoice = computed(() => {
    return store.voices.find((voice) => voice.active)
  })

  /**
   * Seeing as a SpeechSynthesisVoice is not a reactive object, we cannot directly pass the result of selectedVoice into { voice: selectedVoice.value.voice }.
   * Instead, the computation of the voice (which voice is active) must be done on a layer higher than assignment to useSpeechSynthesis, whose second property is:
   * UseSpeechSynthesisOptions
   */
  const voiceConfig = computed(() => {
    const selected = selectedVoice.value
    return selected ? { voice: selected.voice } : undefined
  })

  const defaultStatements = [
    'Please hold down the button to record your question.',
    'Please ask a valid question.',
    'Thinking...',
    'Sorry, your browser does not support text to speech!',
    'Sorry, I am having trouble connecting to the server, please try again later.'
  ]

  watch(listen.result, (newValue: any) => {
    const transcript = newValue
    userQuery.value = transcript.charAt(0).toUpperCase() + transcript.slice(1) + '?'
  })

  const playQuestion = () => {
    const speak = useSpeechSynthesis(speakText, voiceConfig.value)
    if (!speak.isSupported) {
      alert('Sorry, your browser does not support text to speech!')
      return
    }
    speakText.value = `Did you ask    ${userQuery.value}`
    originalQuery.value = userQuery.value
    speak.speak()
    console.log(store.voices)
    console.log(speak)
  }

  const playResponse = (playback: string) => {
    const speak = useSpeechSynthesis(speakText, voiceConfig.value)
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
      console.log('Step changed from ' + oldValue + ' to ' + newValue)
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
        AI.produceResponse(userQuery.value).then((res) => {
          playResponse(res)
          store.step = Step.playing
          console.log(report.produceReport())
        })
      } else if (oldValue == Step.playing && newValue == Step.initial) {
        resetUserQuery()
      }
      // TODO: Check for the case where it changes from loading --> initial, as it is displaying output even though question was invalid.
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
    resetUserQuery
  }
})
