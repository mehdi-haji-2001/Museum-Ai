<script setup lang="ts">
import { RouterView } from 'vue-router'
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
