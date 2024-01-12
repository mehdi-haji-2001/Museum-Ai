<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'

const store = useSettingsStore()
</script>

<template>
  <div class="text-black text-base mt-8">Response duration</div>
  <div class="flex flex-row gap-2 mt-2 overflow-x-scroll p-1.5 -mx-6 px-6">
    <div
      class="shadow-md cursor-pointer flex flex-col flex-none rounded-2xl border-[3px] border-solid overflow-hidden"
      :class="item.active ? 'bg-indigo-500 border-indigo-500' : 'bg-white border-white'"
      v-for="(item, index) in store.durations"
      :key="index"
      @click="store.setDuration(item)"
    >
      <div
        class="text-center text-base self-center whitespace-nowrap p-3"
        :class="item.active ? 'text-white' : 'text-black'"
      >
        {{ item.title }}
        <br />
        ({{ item.length }} - {{ item.length + 5 }} seconds)
      </div>
    </div>
  </div>
</template>
