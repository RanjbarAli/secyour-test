<script setup>
const props = defineProps({
  modelValue: Number,
  count: Number
})
const nextPageCount = computed(() => props.count - props.modelValue)
const emit = defineEmits()
const changePage = (x) => {
  return emit('update:modelValue', x)
}
</script>

<template>
<div v-if="count" class="flex flex-wrap justify-center items-center gap-2 text-sm select-none" dir="ltr">
  <template v-if="props.modelValue > 1">
    <div class="link" @click="changePage(props.modelValue - 1)">{{ '<' }}</div>
    <div class="link" @click="changePage(1)">1</div>
    <div v-if="props.modelValue > 3" class="link" @click="changePage(props.modelValue - 2)">{{ props.modelValue - 2 }}</div>
    <div v-if="props.modelValue > 2" class="link" @click="changePage(props.modelValue - 1)">{{ props.modelValue - 1 }}</div>
  </template>
  <div class="link current">{{ props.modelValue }}</div>
  <template v-if="nextPageCount > 0">
    <div v-for="i of (nextPageCount > 2? 2 : nextPageCount)" class="link" @click="changePage(props.modelValue + i)">{{ props.modelValue + i }}</div>
    <div v-if="nextPageCount > 3" class="link" @click="changePage(props.count)">{{ props.count }}</div>
    <div class="link" @click="changePage(props.modelValue + 1)">{{ '>' }}</div>
  </template>
</div>
</template>

<style scoped>
.link {
  @apply py-1 px-3 shadow-lg bg-white cursor-pointer rounded-lg hover:text-blue-500 dark:bg-gray-700 dark:hover:text-blue-300
}
.link.current {
  @apply bg-blue-600 text-white shadow-blue-600/30 hover:text-white
}
</style>