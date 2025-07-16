<template>
  <div @click.self="closeModal()" class="fixed inset-0 w-full h-full z-999 bg-black/40 grid place-items-center">
    <div class="relative drop-shadow max-w-screen flex flex-col gap-2">
        <div class="flex items-center gap-3">
            <div @click="useEvent('close-panel-modal')" class="w-6 h-6 rounded-full bg-red-700 hover:bg-red-800 grid place-items-center">
                <IconsClose class="h-3" />
            </div>
            <strong class="mt-1">{{ name }}</strong>
        </div>
        <component :is="comp" v-bind="compData" />
    </div>
  </div>
</template>

<script setup>
const comp = ref(null)
const compData = ref({})
const name = ref('')
useListen('open-panel-modal', ([{ component, data = {} }, title = '']) => {
    comp.value = component
    compData.value = data
    name.value = title
})
useListen('close-panel-modal', () => {
    comp.value = ''
    compData.value = {}
    name.value = ''
})
const closeModal = () => {
    useEvent('close-panel-modal')
}
</script>

<style>

</style>