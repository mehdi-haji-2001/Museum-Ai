<script setup lang="ts">
import TheSlogan from '@/components/TheSlogan.vue'
import TheMic from '@/components/TheMic.vue'
import { useSettingsStore } from '@/stores/settings'
import VoiceAnimation from '@/components/VoiceAnimation.vue'
import LikeBar from '@/components/LikeBar.vue'
import IconStop from '@/components/icons/IconStop.vue'
import { useVoice } from '@/composables/voice'

const store = useSettingsStore()
const { userQuery, botResponse } = useVoice()

// TODO: Watcher for change in UserQuery in View to stream text to textbox.
</script>

<template>
  <div class="flex flex-col h-full px-6 py-12">
    <RouterLink to="/settings" class="text-2xl font-bold ml-4 self-start">Setting</RouterLink>
    <div class="pt-10">
      <TheSlogan />
    </div>
    <template v-if="store.isRecording || store.isLoading">
      <div class="flex flex-col items-center self-center gap-2 mt-10">
        <span class="text-center text-4xl font-bold leading-10">
          {{ store.isLoading ? 'Loading' : 'Listening' }}...
        </span>
        <div class="flex gap-0.5" v-if="store.isRecording">
          <VoiceAnimation />
          <VoiceAnimation />
          <VoiceAnimation />
        </div>
      </div>
      <span class="p-4 border-2 rounded-3xl mt-4 text-center"> {{ userQuery }} </span>
    </template>
    <template v-else-if="store.isPlaying">
      <div class="flex flex-col items-center">
        <VoiceAnimation class="mt-10" :scale="3" />
        <span class="p-4 border-2 rounded-3xl mt-4 text-center max-h-32 overflow-y-scroll">
          {{ botResponse }}
        </span>
        <LikeBar class="mt-4" />
        <div class="bg-green-500 rounded-full p-7 mt-8" @click="store.togglePlaying()">
          <IconStop />
        </div>
      </div>
    </template>
    <TheMic v-if="!store.isLoading && !store.isPlaying" />
  </div>
</template>
