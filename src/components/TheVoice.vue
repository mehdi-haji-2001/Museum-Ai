<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'

const store = useSettingsStore()
</script>

<template>
  <div>
    <div class="text-base">Choose your assistant's voice</div>
    <div class="flex flex-row gap-2 overflow-x-scroll p-1.5 -mx-6 px-6">
      <div
        class="shadow-md cursor-pointer flex flex-col flex-none pb-2 w-28 rounded-2xl border-[3px] border-solid overflow-hidden"
        :class="item.active ? 'bg-indigo-500 border-indigo-500' : 'bg-white border-white'"
        v-for="item in store.voices"
        :key="item.name"
        @click="store.setVoice(item)"
      >
        <img :src="item.image" class="object-contain w-full" loading="lazy" />
        <div
          class="text-center text-base self-center whitespace-nowrap mt-2 w-full truncate"
          :class="item.active ? 'text-white' : 'text-black'"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
