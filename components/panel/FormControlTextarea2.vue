<script setup>
const props = defineProps({
  modelValue: String,
  status: String
})
const isFocused = ref(false)
const isActive = computed(() => !!props.modelValue.length || isFocused.value)
const inputColors = computed(() => props.status && props.status.length? 'border-red-600/70 dark:border-red-500/70' : isActive.value ? 'border-blue-500/70 dark:border-blue-400/70' : 'border-gray-200 dark:border-gray-400')
</script>

<template>
  <textarea @focus="isFocused = true"
            @blur="isFocused = false"
            :class="['text-sm min-h-52 card  bg-gray-50 dark:bg-gray-700 disabled:opacity-70 py-3 px-5 rounded-md rounded-bl-sm transition-none border', inputColors]"
            @input="$emit('update:modelValue', $event.target.value)"></textarea>
</template>

<style scoped>

</style>