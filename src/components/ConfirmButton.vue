<script setup lang="ts">
import { useSettingsStore, Step } from '@/stores/settings'

const store = useSettingsStore()
</script>

<template>
  <div class="mt-auto flex flex-col justify-center items-center gap-5">
    <div class="relative text-white leading-none">
      <div
        class="absolute top-1/2 -left-16 -translate-y-1/2 bg-gray-400 rounded-full p-2"
        @click="store.setStep(Step.initial)"
      >
        <span class="material-icons">reply</span>
      </div>
      <div class="bg-green-500 rounded-full p-6" @click="store.setStep(Step.loading)">
        <span class="material-icons md-36">check</span>
      </div>
    </div>
    <div>Confirm question?</div>
  </div>
</template>
