<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'

const store = useSettingsStore()

console.log(store.responses)
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-center py-10">Past Responses</h1>
    <RouterLink to="/" class="text-2xl font-bold absolute top-10">Back</RouterLink>
  </div>
  <div class="flex flex-col items-center">
    <span
      class="pt-1 pb-3 border-2 rounded-3xl mt-4 text-center max-h-32 overflow-y-scroll text-black"
      v-bind:key="index"
      v-for="(r, index) in store.responses"
    >
      <p class="font-bold text-lg py-4">{{ r.question }}</p>
      <p>{{ r.answer }}</p>
    </span>
  </div>
</template>
