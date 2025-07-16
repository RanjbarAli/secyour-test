<script setup>

const alerts = ref([])

let timeOuts = ref({})

const hideAlert = async (key) => {
  while (key in timeOuts.value) {
    clearTimeout(timeOuts.value[key])
    delete timeOuts.value[key]
    let fIndex = alerts.value.findIndex(i => i.key === key)
    if (fIndex >= 0) alerts.value.splice(fIndex, 1);
  }
}

useListen('hide-alert', async (...arg) => await hideAlert(...arg))

const compactAlert = resolveComponent('CompactAlert')
const normalAlert = resolveComponent('NormalAlert')

useListen('show-alert', async function ({ title = null, message, key, type = 'normal', time = 10, status, icon = null, forced = false }) {
    await hideAlert(key)
    if (icon !== null) icon = resolveComponent(icon === '...'? 'IconsSpin' : icon)
    alerts.value.push({
      type,
      message,
      title,
      key,
      time,
      status,
      icon,
      forced
    })
    timeOuts.value[key] = setTimeout(() => hideAlert(key), time * 1000)
})


</script>

<template>
  <div class="alerts fixed z-[9999] bottom-7 flex flex-col items-start gap-4">
    <component v-for="(alert, index) in alerts"
               :key="index"
               :is="alert.type === 'compact'? compactAlert : normalAlert"
               :alert="alert"
    />
  </div>
</template>

<style scoped>
.alerts {
  max-width: min(90%, 320px);
}
.alerts > * {
  transition: all .5s;
}
</style>