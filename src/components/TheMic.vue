<script setup lang="ts">
import IconMic from '@/components/icons/IconMic.vue'
import { useSettingsStore } from '@/stores/settings'

const store = useSettingsStore()
</script>

<template>
  <div class="mt-auto flex flex-col justify-center items-center gap-5">
    <div
      class="bg-green-500 rounded-full p-6"
      :class="store.isRecording ? 'scale-150' : ''"
      @mousedown="store.toggleRecording(true)"
      @touchstart="store.toggleRecording(true)"
      @mouseup="store.toggleRecording(false)"
      @touchend="store.toggleRecording(false)"
    >
      <IconMic :class="store.isRecording ? 'fill-[#a1e2b1]' : 'fill-white'" />
    </div>
    <div>{{ store.isRecording ? '&nbsp;' : 'Hold the button to start' }}</div>
  </div>
</template>

<style scoped>
div,
svg {
  transition: all 0.2s ease-in-out;
}
</style>
