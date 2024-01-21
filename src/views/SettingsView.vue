<script setup lang="ts">
import TheDuration from '@/components/TheDuration.vue'
import TheGroupSize from '@/components/TheGroupSize.vue'
import TheVoice from '@/components/TheVoice.vue'
import TheSlogan from '@/components/TheSlogan.vue'
</script>

<template>
  <div class="flex flex-col py-8 px-6">
    <TheSlogan />
    <TheVoice class="mt-6" />
    <TheDuration class="mt-4" />
    <TheGroupSize class="mt-4" />
    <RouterLink
      to="/home"
      class="text-white text-center text-base whitespace-nowrap justify-center items-stretch border shadow-sm bg-green-500 mt-14 px-4 py-4 rounded-lg border-solid border-green-600"
    >
      Save Your Assistant
    </RouterLink>
  </div>
</template>
