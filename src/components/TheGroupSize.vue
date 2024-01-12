<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'

const store = useSettingsStore()
</script>

<template>
  <div class="text-black text-base mt-8">Choose your group size</div>
  <div class="flex flex-row gap-2 mt-2 overflow-x-scroll p-1.5 -mx-6 px-6">
    <div
      class="shadow-md cursor-pointer flex flex-col justify-center items-center flex-none rounded-2xl h-16 w-16"
      :class="item.active ? 'bg-indigo-500' : 'bg-white'"
      v-for="(item, index) in store.groupSizes"
      :key="index"
      @click="store.setGroupSize(item)"
    >
      <div
        class="text-center text-base self-center whitespace-nowrap leading-none"
        :class="item.active ? 'text-white' : 'text-black'"
      >
        {{ item.size }}
      </div>
    </div>
  </div>
</template>
