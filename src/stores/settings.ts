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
  playing = 'playing'
}

// TODO: Voices should be made with new SpeechSynthesisVoice() or speechSynthesis.getVoices()
export const useSettingsStore = defineStore('settings', () => {
  const responses = ref<PastResponse[]>([])
  // When voices are loaded into the browser, we collect them.
  const loadVoices = () => {
    const _voices = window.speechSynthesis
      .getVoices()
      .filter((v) => v.lang.toLowerCase().includes('en-us'))
    _voices.forEach((v) => {
      addToBugReport('Voice', {
        name: v.name,
        lang: v.lang,
        voiceURI: v.voiceURI,
        default: v.default
      })
      voices.value.push({
        name: v.name,
        image:
          'https://cdn.builder.io/api/v1/image/assets/TEMP/53078945d32f8debb00124f30e994d230cbb26d7305b8221923ee1bb7cda7d70',
        voice: v,
        active: false
      })
    })
    voices.value[0].active = true
  }

  const voices = ref<Voice[]>([])
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
  const bugReport = ref('')

  const step = ref<Step>(Step.initial)
  const isRecording = computed(() => step.value === Step.recording)
  const isPlaying = computed(() => step.value === Step.playing)
  const isLoading = computed(() => step.value === Step.loading)
  const likeStatus = ref<LikeStatus>()
  const isLiked = computed(() => likeStatus.value === LikeStatus.liked)
  const isDisliked = computed(() => likeStatus.value === LikeStatus.disliked)
  const isSettingsModified = ref(false)

  function addToBugReport(title: string, report: any) {
    bugReport.value += `\n\n${title}:\n${JSON.stringify(report, null, 2)}`
  }
  function getBugReport() {
    return bugReport.value
  }
  function setStep(newStep: Step) {
    step.value = newStep
  }
  function toggleLikeStatus(status?: LikeStatus) {
    if (status) {
      likeStatus.value = likeStatus.value === status ? LikeStatus.neutral : status
      responses.value[responses.value.length - 1].likeStatus = likeStatus.value
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
    addResponse,
    bugReport,
    addToBugReport,
    getBugReport,
    loadVoices
  }
})
