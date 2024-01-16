import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { watch } from 'vue'

export interface Voice {
  name: 'Julia' | 'Alex' | 'Anna' | 'David'
  active: boolean
  image?: string
  voice?: SpeechSynthesisVoice
}

export interface Duration {
  title: 'Brief answer' | 'Moderate answer' | 'Detailed answer'
  active: boolean
  length: number
}

export interface GroupSize {
  active: boolean
  size: 1 | 2 | 3 | 4
}

export enum LikeStatus {
  liked = 'liked',
  disliked = 'disliked',
  neutral = 'neutral'
}

export enum Step {
  initial = 'initial',
  recording = 'recording',
  editing = 'editing',
  loading = 'loading',
  playing = 'playing'
}

// TODO: Voices should be made with new SpeechSynthesisVoice() or speechSynthesis.getVoices()
export const useSettingsStore = defineStore('settings', () => {
  const playbackVoices = ref<SpeechSynthesisVoice[]>([])

  // When voices are loaded into the browser, we collect them.
  window.speechSynthesis.onvoiceschanged = () => {
    const voices = window.speechSynthesis.getVoices()
    playbackVoices.value = voices
  }

  watch(playbackVoices, (newVoices: SpeechSynthesisVoice[]) => {
    voices.value.forEach((voice) => {
      configureVoiceAssistants(voice, newVoices)
    })
  })

  const configureVoiceAssistants = (voice: Voice, newVoices: SpeechSynthesisVoice[]) => {
    let v = null
    if (voice.name === 'Julia') {
      v = newVoices.find(
        (voice: any) => voice.name === 'Microsoft Hazel - English (United Kingdom)'
      )
    } else if (voice.name === 'Alex') {
      v = newVoices.find((voice: any) => voice.name === 'Microsoft David - English (United States)')
    } else if (voice.name === 'Anna') {
      v = newVoices.find((voice: any) => voice.name === 'Microsoft Zira - English (United States)')
    } else {
      v = newVoices.find((voice: any) => voice.name === 'Microsoft Mark - English (United States)')
    }
    voice.voice = v
  }

  const voices = ref<Voice[]>([
    {
      name: 'Julia',
      active: true,
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/9422fc76432fd1e0b6c5fe66e55f1e26b389f433de6d6395668f1809fc90938f',
      voice: undefined
    },
    {
      name: 'Alex',
      active: false,
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/53078945d32f8debb00124f30e994d230cbb26d7305b8221923ee1bb7cda7d70',
      voice: undefined
    },
    {
      name: 'Anna',
      active: false,
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/9cd200aa6f9fa0bd3a96e55345e38d6655c393d069876c56a9878f790b162764',
      voice: undefined
    },
    {
      name: 'David',
      active: false,
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/d9dcf5439a49a815f01d05295b4c89f37b35132b479b771a9b94e8c93a6190c3',
      voice: undefined
    }
  ])
  const durations = ref<Duration[]>([
    {
      title: 'Brief answer',
      active: true,
      length: 5
    },
    {
      title: 'Moderate answer',
      active: false,
      length: 20
    },
    {
      title: 'Detailed answer',
      active: false,
      length: 40
    }
  ])
  const groupSizes = ref<GroupSize[]>([
    {
      active: true,
      size: 1
    },
    {
      active: false,
      size: 2
    },
    {
      active: false,
      size: 3
    },
    {
      active: false,
      size: 4
    }
  ])
  const step = ref<Step>(Step.initial)
  const isRecording = computed(() => step.value === Step.recording)
  const isPlaying = computed(() => step.value === Step.playing)
  const isLoading = computed(() => step.value === Step.loading)
  const likeStatus = ref<LikeStatus>()
  const isLiked = computed(() => likeStatus.value === LikeStatus.liked)
  const isDisliked = computed(() => likeStatus.value === LikeStatus.disliked)
  const isSettingsModified = ref(false)

  function setStep(newStep: Step) {
    step.value = newStep
    if (newStep === Step.loading) {
      setTimeout(() => {
        step.value = Step.playing
      }, 3000)
    }
  }
  function toggleLikeStatus(status?: LikeStatus) {
    if (status) {
      likeStatus.value = likeStatus.value === status ? LikeStatus.neutral : status
    } else {
      likeStatus.value = LikeStatus.neutral
    }
  }
  // function toggleRecording(active?: boolean) {
  //   if (isRecording.value) {

  //   }
  //   isRecording.value = active ?? !isRecording.value
  //   if (isRecording.value) setStep(Step.recording)
  // }
  // function togglePlaying(active?: boolean) {
  //   isPlaying.value = active ?? !isPlaying.value
  // }
  // function toggleLoading(active?: boolean) {
  //   isLoading.value = active ?? !isLoading.value
  // }
  function setVoice(voice: Voice) {
    isSettingsModified.value = true
    voices.value = voices.value.map((v) => {
      v.active = v.name === voice.name
      return v
    })
  }
  function setDuration(duration: Duration) {
    isSettingsModified.value = true
    durations.value = durations.value.map((d) => {
      d.active = d.title === duration.title
      return d
    })
  }
  function setGroupSize(groupSize: GroupSize) {
    isSettingsModified.value = true
    groupSizes.value = groupSizes.value.map((g) => {
      g.active = g.size === groupSize.size
      return g
    })
  }

  return {
    voices,
    setVoice,
    durations,
    setDuration,
    groupSizes,
    setGroupSize,
    isRecording,
    // toggleRecording,
    isPlaying,
    // togglePlaying,
    isLoading,
    // toggleLoading,
    toggleLikeStatus,
    isLiked,
    isDisliked,
    step,
    setStep,
    isSettingsModified
  }
})
