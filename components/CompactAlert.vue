<script setup>
defineOptions({
  inheritAttrs: false
})
const attrs = useAttrs()
let alert = computed(() => attrs.alert)
let timeout = alert.value.time + 's'
const colors = {
  error: '#bb0202',
  success: '#007e50',
  warn: '#e34b04',
  info: '#0469e3',
  alert: '#474747'
}
</script>

<template>
  <div @click="()=> !alert.forced && useEvent('hide-alert', alert.key)" class="alert shadow-lg relative drop-shadow-md rounded px-3 pt-1.5 pb-2 overflow-hidden text-sm text-white"
       :style="{ 'background-color': colors[alert.status] }">
    <component v-if="'icon' in alert" :is="alert.icon" class="h-[18px] ml-1" />
    {{ alert.message }}
    <div class="timeout h-px bg-white absolute bottom-0 right-0"></div>
  </div>
</template>

<style scoped>
.right-7 .alert {
  animation: show-alert-from-right .2s linear forwards;
}
@keyframes show-alert-from-right {
  from {
    @apply -mr-8 translate-x-full
  }
  to {
    @apply mr-0 translate-y-0
  }
}
.left-7 .alert {
  animation: show-alert-from-left .2s linear forwards;
}
@keyframes show-alert-from-left {
  from {
    @apply -ml-8 -translate-x-full
  }
  to {
    @apply ml-0 translate-y-0
  }
}
.timeout {
  animation: timeout v-bind(timeout) linear forwards;
}
@keyframes timeout {
  from {
    opacity: .3;
    width: 0;
  }
  to {
    width: 100%;
    opacity: .7;
  }
}
</style>