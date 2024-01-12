<script setup lang="ts">
import TheSlogan from '@/components/TheSlogan.vue'
import TheMic from '@/components/TheMic.vue'
import { useSettingsStore } from '@/stores/settings'
import VoiceAnimation from '@/components/VoiceAnimation.vue'

const store = useSettingsStore()
</script>

<template>
  <div class="flex flex-col h-full px-6 py-12">
    <RouterLink to="/settings" class="text-2xl font-bold ml-4 self-start">Setting</RouterLink>
    <div class="pt-16">
      <TheSlogan />
    </div>
    <div v-if="store.isRecording">
      <div class="flex flex-col items-center self-center gap-2 mt-16">
        <span class="text-center text-4xl font-bold leading-10">Listening...</span>
        <VoiceAnimation />
      </div>
    </div>
    <TheMic />
  </div>
</template>
