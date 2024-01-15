<script setup lang="ts">
import TheSlogan from '@/components/TheSlogan.vue'
import MicButton from '@/components/MicButton.vue'
import ConfirmButton from '@/components/ConfirmButton.vue'
import { useSettingsStore, Step } from '@/stores/settings'
import VoiceAnimation from '@/components/VoiceAnimation.vue'
import LikeBar from '@/components/LikeBar.vue'
import IconStop from '@/components/icons/IconStop.vue'
import { useVoice } from '@/composables/voice'
import { useAI } from '@/composables/AI'
import { watch } from 'vue'
import { useReportStore } from '@/stores/report'

const store = useSettingsStore()
const report = useReportStore()
const voice = useVoice()
const AI = useAI()

// TODO: Watcher for change in UserQuery in View to stream text to textbox.

watch(
  () => store.isSettingsModified,
  () => {
    if (store.isSettingsModified) {
      report.incrementTFMS()
      store.isSettingsModified = false
    }
  }
)

const endExchange = () => {
  store.setStep(Step.initial)
  if (store.isLiked === true && store.isDisliked === false) {
    report.updateARS(1)
  } else if (store.isLiked === false && store.isDisliked === true) {
    report.updateARS(0)
  }
  store.toggleLikeStatus()
}
</script>

<template>
  <div class="flex flex-col h-full p-6">
    <RouterLink to="/settings" class="text-2xl font-bold self-start">Setting</RouterLink>

    <div class="pt-10">
      <TheSlogan />
    </div>

    <template v-if="store.step === Step.recording || store.step === Step.loading">
      <div class="flex flex-col items-center self-center gap-2 mt-10">
        <span class="text-center text-4xl font-bold leading-10">
          {{ store.step === Step.recording ? 'Listening...' : 'Loading...' }}
        </span>
      </div>
      <span class="p-4 border-2 rounded-3xl mt-4 text-center"> {{ voice.userQuery }} </span>
    </template>

    <template v-else-if="store.step === Step.editing">
      <div class="flex flex-col items-center self-center gap-2 mt-10">
        <span class="text-center text-4xl font-bold leading-10">Confirm?</span>
      </div>
      <textarea
        class="p-4 border-2 rounded-3xl mt-4 text-center"
        v-model="voice.userQuery"
      ></textarea>
    </template>

    <template v-else-if="store.step === Step.playing">
      <div class="flex flex-col items-center">
        <VoiceAnimation class="mt-10" :scale="3" />
        <span class="p-4 border-2 rounded-3xl mt-4 text-center max-h-32 overflow-y-scroll">
          {{ AI.response }}
        </span>
        <LikeBar class="mt-4" />
        <div class="bg-green-500 rounded-full p-7 mt-8" @click="endExchange">
          <IconStop />
        </div>
      </div>
    </template>

    <MicButton v-if="store.step === Step.initial || store.step === Step.recording" class="mb-6" />
    <ConfirmButton v-if="store.step === Step.editing" class="mb-6" />
  </div>
</template>
