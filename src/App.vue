<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'
import { useVoice } from '@/composables/voice'

const store = useSettingsStore()
const voice = useVoice()

onMounted(() => {
  if (voice.speak.isSupported) {
    setTimeout(() => {
      store.loadVoices()
    })
  }
})
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style>
#app {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
}
#app > main {
  width: 100%;
  height: 100%;
  max-width: 560px;
}
</style>
