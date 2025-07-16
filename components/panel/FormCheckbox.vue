<template>
    <div @click="toggle"
        :class="['flex-grow-0 flex-shrink-0 h-6 w-10 rounded-full mr-auto shadow-inner relative overflow-hidden transition-all duration-300', props.modelValue ? 'bg-blue-600' : 'bg-gray-400', props.disabled? 'opacity-50' : 'cursor-pointer']">
        <div :class="['w-4 h-4 rounded-full absolute drop-shadow top-1 right-1 transition-all duration-300', props.modelValue ? 'bg-white' : '-translate-x-full bg-white/90']">
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])
const toggle = () => {
    if (!props.disabled) emit('update:modelValue', !props.modelValue)
}
</script>