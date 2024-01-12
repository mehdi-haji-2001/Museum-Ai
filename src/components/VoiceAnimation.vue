<script setup lang="ts">
defineProps({
  scale: {
    type: Number,
    default: 1
  }
})
</script>

<template>
  <div id="bars">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
  </div>
</template>

<style scoped>
#bars {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(2px * v-bind(scale));
  height: calc(24px * v-bind(scale));
}

.bar {
  background: black;
  height: calc(2px * v-bind(scale));
  width: calc(2px * v-bind(scale));
  border-radius: 5px;
  animation: sound 0s -6s linear infinite alternate;
}

@keyframes sound {
  0% {
    height: calc(2px * v-bind(scale));
  }
  100% {
    height: 100%;
  }
}

.bar:nth-child(1) {
  animation-duration: 474ms;
}
.bar:nth-child(2) {
  animation-duration: 433ms;
}
.bar:nth-child(3) {
  animation-duration: 407ms;
}
.bar:nth-child(4) {
  animation-duration: 458ms;
}
.bar:nth-child(5) {
  animation-duration: 400ms;
}
.bar:nth-child(6) {
  animation-duration: 427ms;
}
.bar:nth-child(7) {
  animation-duration: 441ms;
}
.bar:nth-child(8) {
  animation-duration: 419ms;
}
.bar:nth-child(9) {
  animation-duration: 487ms;
}
.bar:nth-child(10) {
  animation-duration: 442ms;
}
</style>
