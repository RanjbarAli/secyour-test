<template>
    <div class="w-[650px] max-w-[95vw] bg-white dark:bg-gray-700 overflow-auto max-h-[70vh] text-gray-600 dark:text-gray-200" dir="ltr">
        <div v-if="isLoading" class="grid place-items-center p-14">
            <IconsSpin class="h-10" />
        </div>
        <div v-else dir="rtl" :class="['card divide-y text-center divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-700 shadow']">
            <div class="sticky top-0 z-20 border-b border-gray-300 dark:border-gray-800 grid grid-table gap-3 bg-gray-50 dark:bg-gray-700 p-3">
                <div class="xs:hidden">ردیف</div>
                <div>تاریخ اسکن</div>
                <div>امتیاز اسکن</div>
                <div>نسبت تغییرات</div>
                <div>نتیجه</div>
            </div>
            <div v-for="(scan, index) in scans"
                class="group relative items-center hover:z-[2] hover:shadow hover:shadow-blue-200/40 dark:hover:shadow-blue-300/40 hover:bg-blue-200/10 dark:hover:bg-blue-300/10 text-sm grid grid-table gap-3 bg-white dark:bg-gray-700 p-3">
                <div class="xs:hidden">{{ scans.length - index }}</div>
                <div>{{ scan.date }}</div>
                <div dir="ltr" class="flex items-center gap-3 justify-center lg:flex-col lg:gap-1">
                    <span :class="['pt-1 pb-0.5 px-2 tracking-wider rounded-full text-white', (70 <= scan.rate) ? 'bg-green-700' : ((50 <= scan.rate) ? 'bg-amber-700' : 'bg-red-700')]">{{
                            scan.rate }}/100</span>
                </div>
                <div>
                    <IconsList @click="selected = selected == scan.uuid? null : scan.uuid" class="h-4 hover:text-sky-600 dark:hover:text-sky-400" />
                </div>
                <div>
                    <NuxtLink :to="`/scan/${scan.uuid}`" class="hover:text-sky-600 dark:hover:text-sky-400" target="_blank">
                        <IconsSearchBug class="h-4" />
                    </NuxtLink>
                </div>
                <ul v-show="selected == scan.uuid" class="col-span-full flex flex-wrap mt-2 gap-x-7 gap-y-3 text-right px-2">
                    <li v-for="item in scan.changes" :class="['flex items-center gap-2', item.isFixed? 'text-green-700 dark:text-green-200' : 'text-red-700 dark:text-red-200']">
                        <component :is="item.isFixed? 'IconsTick' : 'IconsX'" class="w-2.5" />
                        <span class="mt-1">{{ item.title }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>

const attrs = useAttrs()
const scans = ref([])
const isLoading = ref(true)
const selected = ref(null)

const runtimeConfig = useRuntimeConfig()

const getScans = async () => {
    await useUserApiFetch().get(runtimeConfig.public.API_MONITORED_SITE, {
        params: {
            uuid: attrs.uuid
        }
    }).then(({ data }) => {
        scans.value = data
    }).catch((error) => {
        scans.value = []
        useCompactAlertError(`get-monitored-site-${attrs.uuid}`, getErrorMessage(error))
    })
    isLoading.value = false
    return false
}
getScans()
</script>

<style>
.grid-table {
    grid-template-columns: 1fr 3fr 2fr 2fr 1fr;
}

@media screen and (max-width: 560px) {
    .grid-table {
        grid-template-columns: 3fr 2fr 2fr 1fr;
        gap: 10px
    }
}
</style>