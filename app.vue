<template>
  <div :class="['card']">
    <NuxtLoadingIndicator height="2" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<style>
.page-enter-active,
.page-leave-active,
.layout-enter-active,
.layout-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to,
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(15px);
}
</style>

<script setup>
  useHead({
    titleTemplate: (title) => title? `سکیور - ${title}` : 'سکیور',
    link: [
      { rel: 'icon', type: 'image/ico', href: '/32x32-favicon.ico', sizes: '32x32' },
      { rel: 'apple-touch-icon', type: 'image/ico', href: '/180x180-favicon.ico', sizes: '180x180' },
      { rel: 'icon', type: 'image/ico', href: '/192x192-favicon.ico', sizes: '192x192' },
      { rel: 'icon', type: 'image/ico', href: '/360x360-favicon.ico', sizes: '360x360' },
    ],
    meta: [
    { name:"apple-mobile-web-app-capable", content:"yes" },
    { name:"apple-mobile-web-app-title", content:"سکیور" },
    { property: 'og:title', content: 'سکیور' },
    { name:"apple-mobile-web-app-orientations", content:"portrait-any" },
    { name:"apple-mobile-web-app-capable", content:"yes" },
    ]
  })
  const nuxtApp = useNuxtApp()
  nuxtApp.hook("page:finish", () => {
     window.scrollTo(0, 0)
  })
  if ( typeof window != 'undefined' ){
    window.addEventListener('offline', ()=> useCompactAlert('internet-status','اینترنت شما قطع شد', { time : 3, icon: 'IconsGlobe' }));
    window.addEventListener('online', ()=> useCompactAlert('internet-status','شما دوباره آنلاین شدید', { time : 3, icon: 'IconsGlobe' }));
  }
</script>