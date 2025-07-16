<script setup>
defineOptions({
  inheritAttrs: false
})
const props = defineProps({
  modelValue: String,
  status: String,
  icon: String
})
const attrs = useAttrs()
const bindAttrs = {...attrs}
delete bindAttrs.label
delete bindAttrs.type
delete bindAttrs.disabled
const isFocused = ref(false)
const isActive = computed(() => !!props.modelValue.length || isFocused.value)
const isShow = ref(false)
const changeShow = () => {
  if (attrs.type === 'password') isShow.value = !isShow.value
}
const eyeIcon = resolveComponent('IconsEye')
const eyeHideIcon = resolveComponent('IconsEyeHide')
const dynamicIcon = computed(() => isActive.value && attrs.type === 'password' ? (isShow.value? eyeHideIcon: eyeIcon) : resolveComponent(props.icon))
const inputColors = computed(() => props.status && props.status.length? 'border-red-600/70 dark:border-red-500/70' : isActive.value ? 'border-blue-500/70 dark:border-blue-400/70' : 'border-gray-200 dark:border-gray-400')
</script>

<template>
  <div class="card relative">
    <input v-bind="bindAttrs"
           @focus="isFocused = true"
           @blur="isFocused = false"
           :value="modelValue"
           :disabled="attrs.disabled"
           :type="attrs.type === 'password'? (isShow? 'text' : 'password') : attrs.type"
           @input="$emit('update:modelValue', $event.target.value)"
           :class="['text-sm card bg-gray-50 dark:bg-gray-700 disabled:opacity-70 pr-12 px-5 rounded-md border', inputColors, isActive? 'pt-5 pb-1' : 'py-3']">
    <component :is="dynamicIcon" @click="changeShow" :class="['w-4 absolute top-1/2 -translate-y-1/2 right-5 opacity-60', (isActive && attrs.type === 'password')? 'cursor-pointer hover:opacity-80' : 'pointer-events-none']" />
    <label :class="['absolute right-12 pointer-events-none', isActive? 'top-1.5 text-xs opacity-60' : 'top-1/2 text-sm -translate-y-1/2 opacity-80']">{{ attrs.label }}</label>
  </div>
</template>

<style scoped>

</style>