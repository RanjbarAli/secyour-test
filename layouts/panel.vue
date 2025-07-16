<script setup>
if (process.client) {
    document.body.style.background = '#232E3C'
}
useHead({
  title: 'پنل کاربری',
})
const route = useRoute()
const isModalOpen = ref(false)
useListen('open-panel-modal', () => isModalOpen.value = true)
useListen('close-panel-modal', () => isModalOpen.value = false)
</script>

<template>
  <div :class="['layout min-h-screen relative grid']">
    <PanelSideMenu :class="{ 'blur-[10px]': isModalOpen }" />
    <div :class="['min-h-screen overflow-hidden md:overflow-visible bg-[#f0f5fb] dark:bg-[#19222c] rounded-3xl text-gray-700 dark:text-gray-200', isModalOpen? 'blur-[10px]' : 'blur-none']">
      <PanelNav />
      <div class="card p-14 !pt-7 2xl:p-10 xl:px-5">
        <PanelAlerts />
        <NuxtPage />
      </div>
    </div>
    <PanelModal v-show="isModalOpen" />
    <Alerts class="left-7" />
  </div>
</template>
<style lang="postcss">
.page-title {
  @apply relative z-0 font-bold text-2xl
}
.page-title::before {
  content: "";
  z-index: -1;
  @apply absolute w-7 h-7 rounded-full bg-[#3390ec] opacity-10 pointer-events-none -top-1.5 -right-2
}
</style>
<style scoped>
.layout {
  grid-template-columns: 260px auto;
}
@media screen and (max-width: 980px) {
  .layout {
    grid-template-columns: 240px auto;
  }
}
@media screen and (max-width: 780px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
@media screen and (min-width: 1600px) {
  .layout {
    max-width: 1600px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 1599px) {
  .layout {
    float: right;
    width: 100%
  }
}
</style>
