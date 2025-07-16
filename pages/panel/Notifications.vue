<script setup>
definePageMeta({
    layout: 'panel'
})

const notifications = ref([])

const isLoading = ref(true)
const runtimeConfig = useRuntimeConfig()
onMounted(() => {
    useUserApiFetch().get(runtimeConfig.public.API_NOTIFICATIONS).then(({ data }) => {
        notifications.value = data
    }).catch((error) => {
        useCompactAlertError('get-notifications', getErrorMessage(error))
    }).finally(() => {
        isLoading.value = false
    })
})

const select = ref(null)
const toggle = (id) => {
    select.value = select.value == id? null : id
}

</script>

<template>
    <div>
        <div class="card xs:flex xs:justify-center">
            <h1 class="page-title">اطلاعیه ها</h1>
        </div>
        <div class="card grid gap-3 mt-7">
            <div v-if="isLoading" class="p-10 grid place-items-center">
                <IconsSpin class="h-10 text-gray-500 dark:text-gray-300"/>
            </div>
            <div v-else v-for="msg in notifications">
                <div @click="toggle(msg.uuid)" :class="['message-box', select == msg.uuid? 'shadow-md' : 'shadow opacity-90 hover:opacity-100 hover:shadow-md']">
                    <strong class="mt-0.5 w-28 sm:w-auto truncate flex-shrink-0">{{ msg.sender }}:</strong>
                    <span class="mt-0.5 tracking-wide word-spacing text-gray-600 dark:text-gray-200">{{ msg.title }}</span>
                    <span class="mt-0.5 text-xs text-gray-400 text-nowrap tracking-wider mr-auto sm:mr-0">{{ msg.date }}</span>
                    <IconsArrowDown :class="{'w-3 text-gray-400':true, 'x-flip': select == msg.uuid}" />
                </div>
                <div v-if="select == msg.uuid" class="card leading-loose p-4 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 shadow rounded-lg mb-7 mt-3 highlight-html">
                    <p v-html="msg.message"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.message-box {
    @apply flex items-center gap-4 sm:gap-2 bg-white dark:bg-gray-700 px-4 sm:p-3 py-3 rounded-lg flex-grow cursor-pointer select-none sm:flex-col sm:text-center
}
.word-spacing {
    word-spacing: 1px;
}
</style>