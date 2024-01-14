import { ref, watch } from 'vue'
import { useSettingsStore, Step } from '../stores/settings'
import { computed } from 'vue'
import { useSpeechRecognition, useSpeechSynthesis } from '@vueuse/core'
import { useAI } from './AI'
import { defineStore } from 'pinia'

export const useVoice = defineStore('voice', () => {
  const store = useSettingsStore()
  const AI = useAI()
  const userQuery = ref('Please hold down the button to record your question.')
  const speakText = ref('')
  const listen = useSpeechRecognition()
  const speak = useSpeechSynthesis(speakText)

  // TODO: Watcher for change of these settings.

  const defaultStatements = ['Please hold down the button to record your question.', 'Thinking']

  watch(listen.result, (newValue: any) => {
    const transcript = newValue
    userQuery.value = transcript.charAt(0).toUpperCase() + transcript.slice(1) + '?'
  })

  const playQuestion = () => {
    if (!speak.isSupported) {
      alert('Sorry, your browser does not support text to speech!')
      return
    }
    // TODO: Voice Selection should be from settings store.
    // TODO: Add validation for it the userQuestion is sufficient.
    speakText.value = `Did you ask ${userQuery.value}`
    speak.speak()
  }

  const playResponse = (playback: string) => {
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
        if (!validQuestion.value) {
          alert('Please ask a valid question.')
          store.step = Step.initial
          return
        }
        AI.produceResponse(userQuery.value).then((res) => {
          playResponse(res)
          store.step = Step.playing
        })
      } else if (oldValue == Step.playing && newValue == Step.initial) {
        resetUserQuery()
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
    resetUserQuery
  }
})
