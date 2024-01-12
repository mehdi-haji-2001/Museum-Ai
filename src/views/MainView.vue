<script setup lang="ts">
import TheSlogan from '@/components/TheSlogan.vue'
import TheMic from '@/components/TheMic.vue'
import { useSettingsStore } from '@/stores/settings'
import VoiceAnimation from '@/components/VoiceAnimation.vue'
import LikeBar from '@/components/LikeBar.vue'
import IconStop from '@/components/icons/IconStop.vue'

const store = useSettingsStore()
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
      <span class="p-4 border-2 rounded-3xl mt-4 text-center">
        Why are there electrical coils in the setup of the artifact 4?
      </span>
    </template>
    <template v-else-if="store.isPlaying">
      <div class="flex flex-col items-center">
        <VoiceAnimation class="mt-10" :scale="3" />
        <span class="p-4 border-2 rounded-3xl mt-4 text-center max-h-32 overflow-y-scroll">
          The electrical coils surrounding Artifact 4 are an integral part of its mysterious design,
          harnessing the elemental energies that pulse through the cosmos. Legends suggest these
          coils act as conduits, channeling a harmonious symphony of fire, water, earth, and air
          into the artifact's core, imbuing it with a cosmic resonance. The purpose behind this
          celestial dance remains an enigma, leaving room for speculation about the artifact's role
          in the greater cosmic narrative.
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
