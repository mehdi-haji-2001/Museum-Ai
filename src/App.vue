<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main>
    <div>
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
}
main > div {
  width: 100%;
  height: 100%;
  max-width: 560px;
}
</style>
