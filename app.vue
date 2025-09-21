<script setup>
const baseTitle = useTrans('site-name')
useHead({
  titleTemplate: (title) => title ? `${baseTitle} | ${title}` : baseTitle,
})
onMounted(() => {
  const route = useRoute()
  const setBodyId = (newLayout) => {
      if (process.client) document.body.id = `${newLayout == 'auth'? 'default' : newLayout || 'default'}-layout`
  }
  watch(() => route.meta.layout, (newLayout) => {
    setBodyId(newLayout)
  }, { immediate: true })
})

</script>

<template>
  <NuxtLayout />
  <ClientOnly>
    <Teleport to="body">
      <NuxtLoadingIndicator :height="2" />
      <Alerts />
    </Teleport>
  </ClientOnly>
</template>