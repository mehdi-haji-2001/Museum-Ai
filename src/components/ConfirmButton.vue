<script setup lang="ts">
import IconTick from '@/components/icons/IconTick.vue'
import IconBack from './icons/IconBack.vue'
import { useSettingsStore, Step } from '@/stores/settings'

const store = useSettingsStore()
</script>

<template>
  <div class="mt-auto flex flex-col justify-center items-center gap-5">
    <div class="relative">
      <div
        class="absolute top-1/2 -left-16 -translate-y-1/2 bg-gray-400 rounded-full p-2"
        @click="store.setStep(Step.initial)"
      >
        <IconBack class="fill-white" />
      </div>
      <div class="bg-green-500 rounded-full p-6" @click="store.setStep(Step.loading)">
        <IconTick class="fill-white" />
      </div>
    </div>
    <div>Confirm question?</div>
  </div>
</template>
