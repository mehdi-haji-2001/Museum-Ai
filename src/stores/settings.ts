import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { PastResponse } from '@/types/PastResponse'

export interface Voice {
  name: string
  active?: boolean
  image: string
  voice?: SpeechSynthesisVoice
}

export interface Duration {
  title: string
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
  playing = 'playing',
  awaiting = 'awaiting'
}

// TODO: Voices should be made with new SpeechSynthesisVoice() or speechSynthesis.getVoices()
export const useSettingsStore = defineStore('settings', () => {
  const responses = ref<PastResponse[]>([])

  // When voices are loaded into the browser, we collect them.
  window.speechSynthesis.onvoiceschanged = () => {
    const _voices = window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith('en'))
    const female = _voices.filter((v) => v.name.includes('Female'))[0] || undefined
    const male = _voices.filter((v) => v.name.includes('Male'))[0] || undefined
    voices.value[0].voice = female
    voices.value[1].voice = male
  }

  const voices = ref<Voice[]>([
    {
      active: true,
      name: 'Julia',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/9422fc76432fd1e0b6c5fe66e55f1e26b389f433de6d6395668f1809fc90938f'
    },
    {
      active: false,
      name: 'Alex',
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/53078945d32f8debb00124f30e994d230cbb26d7305b8221923ee1bb7cda7d70'
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
  }
  function toggleLikeStatus(status?: LikeStatus) {
    if (status) {
      likeStatus.value = likeStatus.value === status ? LikeStatus.neutral : status
    } else {
      likeStatus.value = LikeStatus.neutral
    }
  }
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
  function addResponse(question: string, answer: string) {
    responses.value.push({
      question,
      answer
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
    isPlaying,
    isLoading,
    toggleLikeStatus,
    isLiked,
    isDisliked,
    step,
    setStep,
    isSettingsModified,
    responses,
    addResponse
  }
})
