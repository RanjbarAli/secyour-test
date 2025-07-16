<script setup>

definePageMeta({
  layout: 'panel'
})

const runtimeConfig = useRuntimeConfig()

const filter = ref('datetime')
const lastScans = ref([])
const ticketsCount = ref(null)
const sitesCount = ref(null)
let isLoading = ref(true)

const getDetails = async () => {
    isLoading.value = true
    await useUserApiFetch().get(runtimeConfig.public.API_DASHBOARD_DETAILS).then(({ data }) => {
        lastScans.value = data.lastScans
        ticketsCount.value = data.ticketsCount
        sitesCount.value = data.sitesCount
    }).catch((error) => {
        useCompactAlertError('get-dashboard-details', getErrorMessage(error))
    })
    isLoading.value = false
    return false
}

onMounted(()=> getDetails())

const userStore = useUserStore()

const profileProcess = computed(()=> {
    let process = 25
    if (!userStore.info.avatar.endsWith('avatar.jpg')) process += 25
    if (userStore.info.isPhoneVerified) process += 25
    if (userStore.info.type !== 'free') process += 25
    return process
})

</script>

<template>
    <div class="card">
        <div class="card xs:flex xs:justify-center">
            <h1 class="page-title">داشبورد</h1>
        </div>
        <div class="card">
            <div
                class="card grid grid-cols-4 text-center 2xl:gap-3 xl:grid-cols-2 xs:grid-cols-1 gap-5 mt-7 text-gray-600 dark:text-gray-200">
                <div
                    class="p-4 bg-white dark:bg-gray-700 shadow-sm rounded-2xl flex flex-col gap-1 items-center border-b-2 border-blue-600">
                    <div class="bg-blue-600/10 w-10 h-10 grid place-items-center rounded-full">
                        <IconsSearchBug class="h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <strong class="text-xl mt-2 text-gray-700 dark:text-gray-100">{{ isLoading? '-' : `${sitesCount} سایت` }}</strong>
                    <span>تحت نظارت</span>
                </div>
                <div
                    class="p-4 bg-white dark:bg-gray-700 shadow-sm rounded-2xl flex flex-col gap-1 items-center border-b-2 border-green-600">
                    <div class="bg-green-600/10 w-10 h-10 grid place-items-center rounded-full">
                        <IconsWallet class="h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <strong class="text-xl mt-2 text-gray-700 dark:text-gray-100">{{ useNumberFormat(userStore.info.money) }} <small
                            class="opacity-70 mr-0.5">تومان</small></strong>
                    <span>موجودی کیف پول</span>
                </div>
                <div
                    class="p-4 bg-white dark:bg-gray-700 shadow-sm rounded-2xl flex flex-col gap-1 items-center border-b-2 border-orange-700">
                    <div class="bg-orange-700/10 w-10 h-10 grid place-items-center rounded-full">
                        <IconsTicket class="h-5 text-orange-700 dark:text-orange-400" />
                    </div>
                    <strong class="text-xl mt-2 text-gray-700 dark:text-gray-100">{{ isLoading? '-' : `${ticketsCount} تیکت` }}</strong>
                    <span>ایجاد شده</span>
                </div>
                <div
                    class="p-4 bg-white dark:bg-gray-700 shadow-sm rounded-2xl flex flex-col gap-1 items-center border-b-2 border-purple-600">
                    <div class="bg-purple-600/10 w-10 h-10 grid place-items-center rounded-full">
                        <IconsPremium class="h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <strong class="text-xl mt-2 text-gray-700 dark:text-gray-100">حرفه ای</strong>
                    <span>اشتراک حال حاضر</span>
                </div>
            </div>
            <div class="card grid grid-cols-3 2xl:grid-cols-1 2xl:gap-16 gap-7 mt-12 items-start">
                <div class="col-span-2 2xl:col-span-1">
                    <div class="card">
                        <div class="card flex items-center justify-between mb-4 sm:flex-col gap-5">
                            <h4 class="font-bold text-xl">آخرین اسکن ها</h4>
                            <div class="flex items-center gap-3">
                                <span>بر اساس</span>
                                <div class="rounded-full overflow-hidden bg-white dark:bg-gray-700 shadow">
                                    <button @click.prevent="filter = 'datetime'"
                                        :class="{ 'py-1.5 px-3 rounded-full': true, 'bg-blue-600 text-white': filter !== 'rate' }">تاریخ</button>
                                    <button @click.prevent="filter = 'rate'"
                                        :class="{ 'py-1.5 px-3 rounded-full': true, 'bg-blue-600 text-white': filter === 'rate' }">امتیاز</button>
                                </div>
                            </div>
                        </div>
                        <div
                            :class="['card divide-y text-center divide-gray-200 dark:divide-gray-800', isLoading ? 'shadow-sm' : 'bg-white dark:bg-gray-700 shadow']">
                            <div v-if="lastScans.length || isLoading"
                                class="grid grid-table xs:text-center gap-3 bg-gray-50 dark:bg-gray-700 p-3">
                                <div class="ml:hidden">شناسه</div>
                                <div class="xs:col-span-full">دامنه</div>
                                <div>تاریخ</div>
                                <div>امتیاز</div>
                                <div></div>
                            </div>
                            <div v-if="!isLoading" v-for="scan in (filter == 'datetime'? lastScans : lastScans.toSorted((a,b)=>b.rate-a.rate))"
                                class="group relative items-center hover:z-[2] hover:shadow hover:shadow-blue-200/40 dark:hover:shadow-blue-300/40 hover:bg-blue-200/10 dark:hover:bg-blue-300/10 text-sm grid grid-table xs:text-center gap-3 bg-white dark:bg-gray-700 p-3">
                                <div class="ml:hidden">{{ scan.uuid }}</div>
                                <div class="xs:col-span-full xs:text-lg xs:font-bold">{{
                                    scan.domain.replace(/^https?:\/\//,
                                    '') }}
                                </div>
                                <div>{{ scan.datetime.split('-')[0] }}<span><small> -
                                        </small></span>{{ scan.datetime.split('-')[1] }}</div>
                                <div dir="ltr" class="flex items-center gap-3 justify-center">
                                    <span
                                        :class="['pt-1 px-2 tracking-wider rounded-full text-white', (70 <= scan.rate) ? 'bg-green-700' : ((50 <= scan.rate) ? 'bg-amber-700' : 'bg-red-700')]">{{
                                        scan.rate }}/100</span>
                                </div>
                                <div class="text-left xs:text-center xs:col-span-full">
                                    <NuxtLink :to="`/scan/${scan.uuid}`" target="_blank">
                                        <IconsSearch
                                            class="h-4 ml-3 xs:ml-0 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-100" />
                                    </NuxtLink>
                                </div>
                            </div>
                            <div v-if="isLoading" v-for="i of 3"
                                class="items-center grid grid-table gap-3 2xl:gap-1 bg-white dark:bg-gray-700 p-3"
                                :style="{ opacity: ((8 - i) / 7) * 100 + '%' }">
                                <div class="ml:hidden"><span class="isLoading w-10 h-6 my-1 rounded-full"></span></div>
                                <div class="xs:col-span-full"><span
                                        class="isLoading w-full h-6 my-1 rounded-full"></span></div>
                                <div><span class="isLoading w-full h-6 my-1 rounded-full"></span></div>
                                <div><span class="isLoading w-full h-6 my-1 rounded-full"></span></div>
                                <div class="xs:col-span-full"><span
                                        class="isLoading w-full xs:w-8 h-6 xs:mx-auto my-1 rounded-full"></span></div>
                            </div>
                        </div>
                        <div v-if="!isLoading && !lastScans.length"
                            class="card text-center p-7 bg-gray-300/10 border border-gray-300">
                            <IconsDetect class="h-24 text-gray-400" />
                            <span class="block mt-7 text-lg">تا حالا اسکن نکرده اید!</span>
                        </div>
                    </div>
                </div>
                <div class="bg-white dark:bg-gray-700 shadow flex flex-col 2xl:flex-row 2xl:items-center gap-x-5 sm:flex-col 2xl:-order-1">
                    <div class="p-5">
                        <div class="mx-auto max-w-40 relative">
                            <svg viewBox="0 0 160 160" style="transform: rotate(-90deg)">
                                <circle r="70" cx="80" cy="80" fill="transparent" class="stroke-gray-400/20"
                                    stroke-width="12px"></circle>
                                <circle r="70" cx="80" cy="80" fill="transparent" class="stroke-green-500"
                                    stroke-linecap="round" stroke-width="12px" :stroke-dasharray="2 * Math.PI * 70"
                                    :stroke-dashoffset="2 * Math.PI * 70 * ((100 - profileProcess) / 100)"></circle>
                            </svg>
                            <span
                                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-4xl mt-2">{{ profileProcess }}%</span>
                        </div>
                        <strong class="card mt-3 text-center text-xl whitespace-nowrap">{{ profileProcess == 100 ? "پروفایل شما تکمیل است" : "ماموریت نا تمام دارید!" }}</strong>
                    </div>
                    <ul class="space-y-px">
                        <li :class="['process', userStore.info.avatar.endsWith('avatar.jpg')? 'fail' : 'success']">عکس پروفایل را عوض کنید <button @click.prevent="navigateTo('/panel/account')" class="opacity-90 hover:opacity-100 bg-blue-600 text-white mr-3 px-1.5 py-0.5 rounded text-xs">تغییر</button></li>
                        <li :class="['process', userStore.info.isPhoneVerified? 'success' : 'fail']">شماره همراه را تایید کنید <button @click.prevent="navigateTo('/panel/account')" class="opacity-90 hover:opacity-100 bg-blue-600 text-white mr-3 px-1.5 py-0.5 rounded text-xs">تایید</button></li>
                        <li :class="['process', userStore.info.type == 'free'? 'fail' : 'success']">اشتراک بگیرید یا تمدید کنید <button @click.prevent="navigateTo('/panel/account#subscription')" class="opacity-90 hover:opacity-100 bg-blue-600 text-white mr-3 px-1.5 py-0.5 rounded text-xs">تمدید</button></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.grid-table {
    grid-template-columns: 4rem auto 10rem 6rem 5%;
}
@media screen and (max-width: 890px) {
    .grid-table {
        grid-template-columns: auto 10rem 6rem 5%;
    }
}
@media screen and (max-width: 560px) {
    .grid-table {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px
    }
}
.process {
    @apply border-r-2 bg-gradient-to-l p-2 float-right w-full text-sm
}
.process.success {
    @apply border-green-700 from-green-700/10 to-green-700/0
}
.process.fail {
    @apply border-red-700 from-red-700/10 to-red-700/0
}
.process.success button {display: none;}
</style>
