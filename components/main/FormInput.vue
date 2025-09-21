<script setup>
defineOptions({
  inheritAttrs: false
})
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
})
const attrs = useAttrs()
const declaredAtttrs = {dir: ['tel', 'number', 'email', 'password', 'url'].includes(attrs.type)? 'ltr' : 'rtl', type: 'text', 'show-error': !!props.error.length, ...attrs}

const { label, type, 'show-error': showError, ...bindAttrs } = declaredAtttrs
const isFocused = ref(false)
const isActive = computed(() => !!props.modelValue.length || isFocused.value)
const isShow = ref(false)
const changeShow = () => {
  if (attrs.type === 'password') isShow.value = !isShow.value
}
let passwordIcon = null, icon = null
if (attrs.type == 'password') {
  passwordIcon = {
    on: resolveComponent(`IconsEye`),
    off: resolveComponent(`IconsEyeOff`)
    
  }
}
if (props?.icon) {
  icon = resolveComponent(`Icons${props.icon.charAt(0).toUpperCase() + props.icon.slice(1)}`)
}
const dynamicIcon = computed(() => isActive.value && attrs.type === 'password' ? (isShow.value? passwordIcon.on : passwordIcon.off) : icon)
const inputColors = computed(() => props?.error?.length ? 'border-red-600' : isActive.value ? 'border-blue-500 shadow-blue-500' : 'border-transparent')
</script>

<template>
  <div class="form-control">
    <div :class="['form-input', dynamicIcon ? 'has-icon' : '']">
      <input v-bind="bindAttrs"
            @focus="isFocused = true"
            @blur="isFocused = false"
            :value="modelValue"
            :type="attrs.type === 'password'? (isShow? 'text' : 'password') : attrs.type"
            @input="$emit('update:modelValue', $event.target.value)"
            :class="[inputColors, isActive? 'pt-5 pb-1' : 'py-3']">
      <component v-if="dynamicIcon" :is="dynamicIcon" @click="changeShow" :class="['icon', (isActive && attrs.type === 'password')? 'cursor-pointer hover:opacity-80' : 'pointer-events-none']" />
      <label :class="[isActive? 'active' : 'not-active']">{{ attrs.label }}</label>
    </div>
    <span v-if="declaredAtttrs['show-error'] && props?.error?.length" class="error-message">{{ props.error }}</span>
  </div>
</template>