<script setup lang="ts">
import TheSlogan from '@/components/TheSlogan.vue'
</script>

<template>
  <section class="flex-col text-white relative flex w-full h-full items-center px-6 py-12">
    <TheSlogan class="mt-24" />
    <RouterLink
      to="/settings"
      class="relative text-center text-4xl font-bold leading-10 whitespace-nowrap mt-80 mb-20"
    >
      Start
    </RouterLink>
  </section>
</template>

<style scoped>
section {
  background: url('https://cdn.builder.io/api/v1/image/assets/TEMP/687dbc9edc5f4b3507e9cafb695ff54a4ad3af19b15dbbb35d098fee3beaba52')
    no-repeat center center;
  background-size: cover;
}
</style>
