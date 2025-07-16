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
const isFocused = ref(false)
const isActive = computed(() => !!props.modelValue.length || isFocused.value)
const inputColors = computed(() => props.status && props.status.length? 'border-red-600 shadow-red-600' : isActive.value ? 'border-sky-500 shadow-sky-500' : 'border-transparent')
</script>

<template>
  <div class="card relative">
    <textarea v-bind="attrs"
           @focus="isFocused = true"
           @blur="isFocused = false"
           :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           :class="['text-sm card bg-white/10 pr-12 resize-y min-h-44 max-h-60 px-5 rounded-2xl border shadow py-3', inputColors]"></textarea>
    <component :is="props.icon" class="w-4 absolute top-4 right-5 opacity-60 pointer-events-none" />
  </div>
</template>

<style scoped>
textarea {
    transition: all .25s, height 0s;
}
</style>