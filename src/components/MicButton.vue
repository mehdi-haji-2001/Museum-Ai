<script setup lang="ts">
import IconMic from '@/components/icons/IconMic.vue'
import { useSettingsStore, Step } from '@/stores/settings'
import { ref } from 'vue'

const store = useSettingsStore()

const isRecording = ref(false)

const startRecording = () => {
  isRecording.value = true
  store.setStep(Step.recording)
}
const stopRecording = () => {
  isRecording.value = false
  setTimeout(() => {
    store.setStep(Step.editing)
  }, 300)
}
</script>

<template>
  <div class="mt-auto flex flex-col justify-center items-center gap-5">
    <div
      class="bg-green-500 rounded-full p-6"
      :class="isRecording ? 'scale-150' : ''"
      @mousedown="startRecording"
      @touchstart="startRecording"
      @mouseup="stopRecording"
      @touchend="stopRecording"
    >
      <IconMic :class="isRecording ? 'fill-[#a1e2b1]' : 'fill-white'" />
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
