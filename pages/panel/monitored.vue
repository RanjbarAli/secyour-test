<script setup>
definePageMeta({
    layout: 'panel'
})
let isLoading = ref(false)
const page = ref(1)
const count = ref(1)
const sort = ref('desc')

const sites = ref([])

const runtimeConfig = useRuntimeConfig()

const getSites = async (resetPage = false) => {
    isLoading.value = true
    if (resetPage) page.value = 1
    await useUserApiFetch().get(runtimeConfig.public.API_MONITORED_SITES, {
        params: {
            page: page.value,
            sort: sort.value
        }
    }).then(({ data }) => {
        count.value = data.pagesCount
        sites.value = data.sites
    }).catch((error) => {
        count.value = 0
        sites.value = []
        useCompactAlertError('get-monitored-sites', getErrorMessage(error))
    })
    await setTimeout(() => isLoading.value = false, 200)
    return false
}

onMounted(() => getSites())
watch(sort, async () => await getSites(true))
watch(page, async () => await getSites())

const changeScanInterval = async (value, uuid) => {
    useCompactAlert(`change-interval-${uuid}`, 'درحال انجام...', { time: 99, icon: '...' })
    await useUserApiFetch().post(runtimeConfig.public.API_CHANGE_MONITORED_SITES_SCAN_INTERVAL, {
        interval: Number(value),
        id: uuid
    }).then(({ data }) => {
        useCompactAlertSuccess(`change-interval-${uuid}`, 'دوره زمانی اسکن با موفقیت تغییر یافت.', { time: 5 })
    }).catch((error) => {
        useCompactAlertError(`change-interval-${uuid}`, getErrorMessage(error), { time: 5 })
    })
    return false
}

const isSortOpen = ref(false)
const sortList = [
    {
        label: 'آخرین ها',
        icon: 'IconsZA',
        name: 'desc'
    },
    {
        label: 'اولین ها',
        icon: 'IconsAZ',
        name: 'asc'
    },
    {
        label: 'بالاترین امتیاز',
        icon: 'IconsStarAZ',
        name: 'rate-desc'
    },
    {
        label: 'کمترین امتیاز',
        icon: 'IconsStarZA',
        name: 'rate-asc'
    }
]

const openScanModal = (event, uuid, domain) => {
    if (['SELECT', 'OPTION'].includes(event.target.nodeName)) return false
    useEvent('open-panel-modal', [{ component: 'PanelModalsMonitoredSite', data: { uuid } }, `اسکن های سایت ${domain.replace(/^https?:\/\//, '')}`])
}

</script>

<template>
    <div class="card">
        <div class="card flex items-center xs:flex-col gap-5">
            <h1 class="page-title">سایت های تحت نظارت</h1>
            <button @click="navigateTo('/panel/scan')"
                class="mr-auto xs:mr-0 mb-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg pt-1.5 shadow-lg shadow-blue-500/40 hover:shadow-blue-600/40 pb-1 px-3 text-base flex items-center gap-2">
                <IconsSearchBug class="h-3.5 mb-1" />اسکن جدید
            </button>
        </div>
        <div class="card flex justify-between items-center mt-7">
            <div class="relative" v-click-outside="() => { isSortOpen = false }">
                <button @click.prevent="isSortOpen = !isSortOpen"
                    :class="['px-3 py-2 border dark:border-gray-500 rounded-lg text-gray-500 dark:text-gray-300', isSortOpen ? 'shadow text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-500' : 'shadow-sm hover:shadow hover:text-gray-600 bg-white dark:bg-gray-600 dark:hover:bg-gray-500 dark:hover:text-gray-200']">
                    <IconsSort class="h-4" />
                </button>
                <div v-if="isSortOpen"
                    class="absolute overflow-hidden divide-y select-none divide-gray-200 dark:divide-gray-500  text-sm z-20 right-0 top-full mt-2 drop-shadow-sm shadow-md border border-gray-200 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-600 w-40">
                    <div v-for="theSort in sortList" @click="sort = theSort.name, isSortOpen = false"
                        :class="['card flex items-center gap-2 px-3 py-2 cursor-pointer', theSort.name == sort ? 'bg-gray-100 dark:bg-gray-500/30' : 'hover:bg-gray-100 dark:hover:bg-gray-500/30']">
                        <component :is="theSort.icon" class="h-3.5 text-gray-500 dark:text-gray-400" />
                        <span>{{ theSort.label }}</span>
                    </div>
                </div>
            </div>
            <span class="text-gray-500"><strong>5</strong> سایت</span>
        </div>
        <div class="card mt-4">
            <div
                :class="['card divide-y text-center divide-gray-200 dark:divide-gray-800', isLoading ? 'shadow-sm' : 'bg-white dark:bg-gray-700 shadow']">
                <div v-if="sites.length || isLoading"
                    class="grid grid-table xs:text-center gap-3 2xl:gap-1 bg-gray-50 dark:bg-gray-700 p-3">
                    <div class="xl:hidden">ردیف</div>
                    <div class="sm:col-span-full">دامنه</div>
                    <div>تاریخ آخرین اسکن</div>
                    <div>امتیاز آخرین اسکن</div>
                    <div class="sm:hidden">دوره زمانی اسکن</div>
                    <div class="sm:hidden"></div>
                </div>
                <div v-if="!isLoading" v-for="(site, index) in sites"
                    @click="openScanModal($event, site.uuid, site.domain)"
                    class="group relative items-center hover:z-[2] hover:shadow hover:shadow-blue-200/40 dark:hover:shadow-blue-300/40 hover:bg-blue-200/10 dark:hover:bg-blue-300/10 text-sm grid grid-table xs:text-center gap-3 2xl:gap-1 bg-white dark:bg-gray-700 p-3 lg:px-1">
                    <div class="xl:hidden">{{ index + 1 }}</div>
                    <div class="sm:col-span-full sm:text-lg sm:font-bold">{{ site.domain.replace(/^https?:\/\//, '') }}
                    </div>
                    <div>{{ site.latestScanDate.split('-')[0] }}<span class="lg:block lg:mt-1"><small class="lg:hidden"> -
                            </small></span>{{ site.latestScanDate.split('-')[1] }}</div>
                    <div dir="ltr" class="flex items-center gap-3 justify-center lg:flex-col lg:gap-1">
                        <span
                            :class="['pt-1 px-2 tracking-wider rounded-full text-white', (70 <= site.latestScanRate) ? 'bg-green-700' : ((50 <= site.latestScanRate) ? 'bg-amber-700' : 'bg-red-700')]">{{
                                site.latestScanRate }}/100</span>
                        <div
                            :class="['pt-1 pb-0.5 px-1 rounded-full flex items-center gap-1', site.growth > 0 ? 'text-green-700 dark:text-green-300' : site.growth < 0 ? 'text-red-700 dark:text-red-300' : 'text-gray-600 dark:text-gray-300']">
                            <span class="mt-1 tracking-widest">{{ site.growth }}%</span>
                            <component
                                :is="site.growth > 0? 'IconsArrowUp' : site.growth < 0? 'IconsArrowDown' : 'IconsDash'"
                                class="w-3" />
                        </div>
                    </div>
                    <div>
                        <select @click.prevent="" @change.prevent="changeScanInterval($event.target.value, site.uuid)"
                            class="w-28 py-1 bg-transparent border-b border-gray-300" :value="site.scanInterval">
                            <option value="1" class="dark:bg-gray-600">هر روز یک بار</option>
                            <option value="2" class="dark:bg-gray-600">هر 2 روز یک بار</option>
                            <option value="3" class="dark:bg-gray-600">هر 3 روز یک بار</option>
                            <option value="7" class="dark:bg-gray-600">هر هفته یک بار</option>
                            <option value="30" class="dark:bg-gray-600">هر ماه یک بار</option>
                            <option value="90" class="dark:bg-gray-600">هر 3 ماه یک بار</option>
                        </select>
                    </div>
                    <div class="text-left sm:text-center">
                        <IconsSearch
                            class="h-4 ml-3 sm:ml-0 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-100" />
                    </div>
                </div>
                <div v-if="isLoading" v-for="i of 3"
                    class="items-center grid grid-table gap-3 2xl:gap-1 bg-white dark:bg-gray-700 p-3 lg:px-1"
                    :style="{ opacity: ((8 - i) / 7) * 100 + '%' }">
                    <div class="xl:hidden"><span class="isLoading w-10 h-6 my-1 rounded-full"></span></div>
                    <div class="sm:col-span-full"><span class="isLoading w-36 h-6 my-1 rounded-full"></span></div>
                    <div><span class="isLoading w-24 h-6 my-1 rounded-full"></span></div>
                    <div><span class="isLoading w-24 h-6 my-1 rounded-full"></span></div>
                    <div><span class="isLoading w-24 h-6 my-1 rounded-full"></span></div>
                    <div><span class="isLoading w-6 h-6 my-1 rounded-full"></span></div>
                </div>
            </div>
            <div v-if="!isLoading && !sites.length"
                class="card text-center p-7 bg-gray-300/10 border border-gray-300 rounded-lg">
                <IconsSearchBug class="h-24 text-gray-400" />
                <span class="block mt-7 text-lg">هیچ سایتی اضافه نشده است!</span>
            </div>
            <div v-if="sites.length && !isLoading" class="card flex items-center justify-center mt-10">
                <PanelPagination v-model="page" :count="count" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.grid-table {
    grid-template-columns: 3rem auto 10rem 10rem 9rem 5%;
}

@media screen and (max-width: 1075px) {
    .grid-table {
        grid-template-columns: auto 10rem 10rem 9rem 3%;
    }
}

@media screen and (max-width: 980px) {
    .grid-table {
        grid-template-columns: auto 7.5rem 7.5rem 8rem 3%;
    }
}

@media screen and (max-width: 680px) {
    .grid-table {
        grid-template-columns: repeat(2, auto);
        gap: 10px
    }
}
</style>