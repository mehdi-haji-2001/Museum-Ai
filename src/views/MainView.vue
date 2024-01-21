<script setup lang="ts">
import TheSlogan from '@/components/TheSlogan.vue'
import MicButton from '@/components/MicButton.vue'
import ConfirmButton from '@/components/ConfirmButton.vue'
import { useSettingsStore, Step } from '@/stores/settings'
import VoiceAnimation from '@/components/VoiceAnimation.vue'
import LikeBar from '@/components/LikeBar.vue'
import IconCopy from '@/components/icons/IconCopy.vue'
import IconRepeat from '@/components/icons/IconRepeat.vue'
import { useVoice } from '@/composables/voice'
import { useAI } from '@/composables/AI'
import { watch } from 'vue'
import { useReportStore } from '@/stores/report'
import { onBeforeRouteLeave } from 'vue-router'
import { useClipboard } from '@vueuse/core'

const store = useSettingsStore()
const report = useReportStore()
const voice = useVoice()
const AI = useAI()
const { copy } = useClipboard()

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

const copyResponse = () => {
  copy(`${voice.userQuery}\n${AI.response}`).then(() => alert('Copied to clipboard!'))
}

onBeforeRouteLeave((to) => {
  if (to.path === '/history') {
    report.incrementTAPR()
  }
})
</script>

<template>
  <div class="flex flex-col h-full p-6">
    <div class="flex justify-between">
      <RouterLink to="/settings" class="text-xl font-bold self-start">Settings</RouterLink>
      <RouterLink to="/history" class="text-xl font-bold self-start">History</RouterLink>
    </div>

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
      <div class="flex flex-col items-center flex-1">
        <VoiceAnimation class="mt-4" :scale="2" />
        <div class="flex flex-col gap-1">
          <span class="p-4 border-2 rounded-xl mt-4 text-center max-h-52 overflow-y-scroll">
            {{ AI.response }}
          </span>
          <div class="flex justify-end gap-2">
            <div class="leading-none p-2" @click="copyResponse()">
              <span class="material-icons md-18">content_copy</span>
            </div>
            <div class="leading-none p-2" @click="voice.playResponse()">
              <span class="material-icons md-18">replay</span>
            </div>
          </div>
        </div>
        <LikeBar class="mt-4" />
        <div class="bg-gray-200 leading-none rounded-full p-7 mt-auto" @click="endExchange">
          <span class="material-icons">home</span>
        </div>
      </div>
    </template>

    <MicButton v-if="store.step === Step.initial || store.step === Step.recording" class="mb-6" />
    <ConfirmButton v-if="store.step === Step.editing" class="mb-6" />
  </div>
</template>
