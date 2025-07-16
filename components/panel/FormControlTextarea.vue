<script setup>
const props = defineProps({
  modelValue: String,
  status: String
})
const isFocused = ref(false)
const isActive = computed(() => !!props.modelValue.length || isFocused.value)
const inputColors = computed(() => props.status && props.status.length? 'border-red-600/70 shadow-red-600/50' : isActive.value ? 'border-blue-500/70 shadow-blue-500/50' : 'border-transparent shadow-gray-400')
</script>

<template>
  <textarea @focus="isFocused = true"
            @blur="isFocused = false"
            :class="['text-sm min-h-52 card bg-white dark:bg-gray-700 disabled:bg-gray-50 disabled:opacity-70 disabled:!shadow-gray-400 disabled:border-transparent py-3 px-5 rounded-2xl rounded-bl-sm transition-none border shadow-sm', inputColors]"
            @input="$emit('update:modelValue', $event.target.value)"></textarea>
</template>

<style scoped>

</style>