<script setup lang="ts">
import IconLike from '@/components/icons/IconLike.vue'
import IconDislike from '@/components/icons/IconDislike.vue'
import { useSettingsStore, LikeStatus } from '@/stores/settings'

const store = useSettingsStore()

//
</script>

<template>
  <div class="flex gap-5">
    <div
      class="rounded-full p-4"
      :class="store.isLiked ? 'bg-[#0C8CE9]' : ''"
      @click="store.toggleLikeStatus(LikeStatus.liked)"
    >
      <IconLike :class="store.isLiked ? 'fill-white' : 'fill-[#202020]'" />
    </div>
    <div
      class="rounded-full p-4"
      :class="store.isDisliked ? 'bg-[#FF1773]' : ''"
      @click="store.toggleLikeStatus(LikeStatus.disliked)"
    >
      <IconDislike :class="store.isDisliked ? 'fill-white' : 'fill-[#202020]'" />
    </div>
  </div>
</template>

<style scoped>
div,
svg {
  transition: all 0.2s ease-in-out;
}
</style>
