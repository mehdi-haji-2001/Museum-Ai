<script setup lang="ts">
import { useSettingsStore, LikeStatus } from '@/stores/settings'

const store = useSettingsStore()
</script>

<template>
  <div class="flex gap-5 leading-none">
    <div
      class="rounded-full p-4"
      :class="store.isLiked ? 'bg-[#0C8CE9]' : ''"
      @click="store.toggleLikeStatus(LikeStatus.liked)"
    >
      <span class="material-icons md-36" :class="store.isLiked ? 'text-white' : 'text-[#202020]'">
        {{ store.isLiked ? 'thumb_up' : 'thumb_up_off_alt' }}
      </span>
    </div>
    <div
      class="rounded-full p-4"
      :class="store.isDisliked ? 'bg-[#FF1773]' : ''"
      @click="store.toggleLikeStatus(LikeStatus.disliked)"
    >
      <span
        class="material-icons md-36"
        :class="store.isDisliked ? 'text-white' : 'text-[#202020]'"
      >
        {{ store.isDisliked ? 'thumb_down' : 'thumb_down_off_alt' }}
      </span>
    </div>
  </div>
</template>

<style scoped>
div,
svg {
  transition: all 0.2s ease-in-out;
}
</style>
