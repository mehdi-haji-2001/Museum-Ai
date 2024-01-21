<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'
import { useClipboard } from '@vueuse/core'
import { useReportStore } from '@/stores/report'
import { LikeStatus } from '@/stores/settings'

const report = useReportStore()
const store = useSettingsStore()
const { copy } = useClipboard()

const showReport = () => {
  const r = JSON.stringify(report.produceReport(), null, 2) + '\n\n' + store.bugReport
  copy(r).then(() => alert(`Copied to clipboard!\n${r}`))
}
</script>

<template>
  <div class="flex flex-col items-center px-5 py-6 h-full overflow-scroll">
    <RouterLink to="/home" class="text-xl font-bold self-start">Back</RouterLink>
    <template v-if="store.responses.length">
      <div
        v-bind:key="index"
        v-for="(r, index) in store.responses"
        class="flex flex-col mb-4 w-full text-black text-sm"
      >
        <span
          class="bg-slate-400 px-4 p-2 rounded-3xl text-left max-w-[75%] rounded-br-none ml-auto"
        >
          {{ r.question }}
        </span>
        <span
          class="bg-gray-200 px-4 p-2 pb-3 rounded-3xl text-left max-w-[75%] rounded-bl-none mt-1 relative"
        >
          {{ r.answer }}
          <span
            v-if="r.likeStatus && r.likeStatus !== LikeStatus.neutral"
            class="absolute border-[1px] border-gray-400 flex justify-center items-center -bottom-4 left-4 bg-gray-300 w-7 h-6 rounded-full leading-none"
          >
            {{ r.likeStatus === LikeStatus.liked ? '👍' : '' }}
            {{ r.likeStatus === LikeStatus.disliked ? '👎' : '' }}
          </span>
        </span>
      </div>
    </template>
    <template v-else>
      <div class="flex flex-1 justify-center items-center">
        <span>Nothing to show</span>
      </div>
    </template>
    <button
      class="fixed bottom-4 right-4 bg-gray-200 rounded-full leading-none p-4"
      @click="showReport"
    >
      <span class="material-icons">bug_report</span>
    </button>
  </div>
</template>
