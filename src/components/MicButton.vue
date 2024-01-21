<script setup lang="ts">
import { useSettingsStore, Step } from '@/stores/settings'
import { useVoice } from '@/composables/voice'
import { ref } from 'vue'

const store = useSettingsStore()
const voice = useVoice()

const isRecording = ref(false)

const startRecording = () => {
  isRecording.value = true
  store.setStep(Step.recording)
}
const stopRecording = () => {
  isRecording.value = false
  setTimeout(() => {
    if (voice.defaultStatements.includes(voice.userQuery)) {
      store.setStep(Step.initial)
      return
    }
    store.setStep(Step.editing)
  }, 300)
}
</script>

<template>
  <div class="mt-auto flex flex-col justify-center items-center gap-5">
    <div
      class="bg-green-500 rounded-full p-6 leading-none"
      :class="isRecording ? 'scale-150' : ''"
      @mousedown="startRecording"
      @touchstart="startRecording"
      @mouseup="stopRecording"
      @touchend="stopRecording"
    >
      <span class="material-icons md-48" :class="isRecording ? 'text-[#a1e2b1]' : 'text-white'">
        mic
      </span>
    </div>
    <div>{{ isRecording ? '&nbsp;' : 'Hold the button to start' }}</div>
  </div>
</template>

<style scoped>
div,
svg {
  transition: all 0.2s ease-in-out;
}
</style>
