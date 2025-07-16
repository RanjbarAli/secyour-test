<script setup>
useHead({
    title: 'گزارش اسکن'
})
const route = useRoute()
const runtimeConfig = useRuntimeConfig()
definePageMeta({
  validate: async (route) => /^\d+$/.test(route.params.scanid),
  middleware: [
    async function (to) {
      const { data } = await useApiFetch().post(useRuntimeConfig().public.API_SCAN_CHECK, {
        'scanID': to.params.scanid
      })
      if (data.status !== 'ok') return navigateTo('/')
    }
  ],
})

let selectedReport = ref(null)
const scanDetails = ref({})

const scanLoading = computed(()=> !(scanDetails.value?.status))
const loadScanDetail = async () => {
    if (scanDetails.value?.isFinished) return false
    await useApiFetch().get(runtimeConfig.public.API_SCAN_DETAILS, {
        params: {
            uuid: route.params.scanid
        }
    })
        .then(({ data }) => {
            scanDetails.value = data
            useEvent('change-body-class', `${data.status}-shadow`)
            if (selectedReport.value == null && data?.reports.length) selectedReport.value = data.reports[0]
        }).catch(error => {
            scanDetails.value = {
                ...scanDetails.value,
                ...{
                    isFinished: true
                }
            }
            useAlertError('get-scan-details', 'خطایی در بارگذاری رخ داد', error.message)
        })
    if (scanDetails.value.isFinished) {
        useCompactAlertSuccess('get-scan-details', 'اسکن با موفقیت به اتمام رسید', { time: 4 })
    } else {
        setTimeout(loadScanDetail, 10000)
    }
}
onMounted(()=>{
    useCompactAlert('get-scan-details', 'درحال اسکن...', { icon: '...', time: 9999 })
    loadScanDetail()
})

const ReportBGOpacity = (i = 0) => {
  return  (20 + ( (scanDetails.value.reports.length - i) / scanDetails.value.reports.length ) * 80) / 100
}
const copyLink = () => {
  if (!process.client) return false;
  window?.navigator?.clipboard?.writeText(scanDetails.value.shareLink)
  useCompactAlert('scan-share-link-copy','لینک کپی شد', { time: 4 })


}
let colors = {
  critical: '#bb0202',
  bad: '#c02a2a',
  low: '#CE3B0B',
  good: '#F77F00',
  secure: '#007e50'
}
const progressGradient = computed(()=> {
  let details = scanDetails.value.progress < 50? {
    first: 90,
    second: 90 + (scanDetails.value.progress / 50) * 180,
    color: '#2f3439'
  } : {
    first: ((scanDetails.value.progress - 50) / 50) * 180 - 90,
    second: 270,
    color: colors[scanDetails.value.status]
  }
  return `linear-gradient(${details.first}deg, ${details.color} 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(${details.second}deg, ${colors[scanDetails.value.status]} 50%, #2f343970 50%, #2f343970)`
})

const scanStatusIcon = computed(()=> {
  return `/images/scan/scan-status-${scanDetails.value.status}.png`
})

const scanTypeNames = {
  'free' : 'اسکن رایگان',
  'pro' : 'اسکن عمیق',
  'organization' : 'اسکن سازمانی'
}

const itemCountWith = computed(() => {
  if (scanLoading.value) return {}
  let sum = Object.values(scanDetails.value.itemCounts).reduce((a, b) => a + b)
  return {
    good: `${100*scanDetails.value.itemCounts.good/sum}%`,
    low: `${100*scanDetails.value.itemCounts.low/sum}%`,
    bad: `${100*scanDetails.value.itemCounts.bad/sum}%`,
    critical: `${100*scanDetails.value.itemCounts.critical/sum}%`,
  }
})

</script>

<template>
    <div class="card mt-10">
        <div class="container">
            <div v-if="scanLoading" class="card my-16 text-center">
                <IconsSpin class="w-8 inline-block ml-3" />در حال بارگذاری...
            </div>
            <div v-if="!scanLoading" class="card grid grid-cols-[13rem_auto] lg:grid-cols-1 gap-12">
                <div class="flex flex-col items-center gap-3">
                    <div class="progress-radial float-right relative w-52 h-52 lg:w-56 lg:h-56 rounded-full">
                        <div
                            class="grid place-items-center absolute w-48 h-48 overflow-hidden lg:w-52 lg:h-52 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0b0d12]">
                            <img :src="scanStatusIcon" class="max-w-[80%] mt-1" alt="Scan Status" />
                        </div>
                    </div>
                    <div class="flex items-center gap-3.5 justify-center" dir="ltr">
                        <span
                            :class="['py-1 px-2 rounded text-sm mt-1', scanDetails.type === 'free'? 'bg-white/10' : 'bg-main-purple-700']">{{
                            scanTypeNames[scanDetails.type] }}</span>
                        <strong class="text-lg mt-2"><span class="text-2xl">{{ scanDetails.progress / 10 }}</span> / 10</strong>
                    </div>
                </div>
                <div>
                    <div
                        class="card grid grid-cols-auto-auto sm:grid-cols-1 sm:flex sm:flex-col sm:items-center gap-7 mt-3">
                        <div class="flex flex-col items-start gap-3 xs:items-center xs:gap-7">
                            <div class="flex items-center gap-3 xs:flex-col xs:gap-1">
                                <IconsCalendar class="h-5 text-main-gray-100 opacity-75" /> <span
                                    class="text-gray-300 mt-1">زمان اسکن:</span> <span class="mt-1">{{
                                    scanDetails.datetime }}</span>
                            </div>
                            <div class="flex items-center gap-3 xs:flex-col xs:gap-1">
                                <IconsTime class="h-5 mb-1 text-main-gray-100 opacity-75" /> <span
                                    class="text-gray-300 mt-1">مدت اسکن:</span> <span class="mt-1">{{
                                    scanDetails.elapsed }}</span>
                            </div>
                            <div class="flex items-center gap-3 xs:flex-col xs:gap-1">
                                <IconsSearchBug class="h-5 mb-1 text-main-gray-100 opacity-75" /> <span
                                    class="text-gray-300 mt-1">نوع اسکنرهای استفاده شده:</span> <span class="mt-1">{{
                                    scanDetails.scanersType }}</span>
                            </div>
                        </div>
                        <div class="flex flex-col items-end gap-7 sm:items-center">
                            <div dir="ltr" class="flex items-center gap-3 md:-order-1">
                                <IconsLargeGlobe class="h-6" /> <span class="tracking-wider font-bold text-lg mt-1.5">{{
                                    scanDetails.domain }}</span>
                            </div>
                            <div dir="ltr" class="flex items-center gap-3 md:-order-1">
                                <div class="bg-white/10 py-0.5 px-3 flex items-center gap-2">
                                    <IconsLink class="h-3.5" /> <span class="tracking-wider mt-1">{{
                                        scanDetails.shareLink
                                        }}</span>
                                </div>
                                <IconsCopy @click="copyLink()"
                                    class="h-4 opacity-80 hover:opacity-100 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                    <div dir="ltr" class="card mt-12 flex flex-wrap gap-8 items-center lg:justify-center">
                        <div v-for="tech in scanDetails.technologies" class="flex items-center gap-2 drop-shadow">
                            <img :src="`/images/scan/technologies/${tech.icon}`" rel="nofollow" class="w-6" />
                            <span class="font-bold text-white mt-1.5" v-text="tech.name"></span>
                        </div>
                    </div>
                </div>
                <div
                    class="col-span-full mt-14 text-center sm:mt-14 flex xs:grid xs:grid-cols-2 xs:gap-x-2 xs:gap-y-20" style="text-shadow:0 0 5px #000000">
                    <div class="i-good relative sm:flex sm:items-center sm:flex-col pt-2 pb-1.5 min-w-[110px] xs:!w-full"
                        :style="{ 'background' : `${colors.good}B9` }">
                        <div>نیمه امن</div>
                        <div class="tooltip"><strong class="ml-1.5 text-base sm:!text-white" style="color:#FFCF25">{{
                                scanDetails.itemCounts.good }}</strong> مورد</div>
                    </div>
                    <div class="i-low relative sm:flex sm:items-center sm:flex-col pt-2 pb-1.5 min-w-[110px] xs:!w-full"
                        :style="{ 'background' : `${colors.low}B9` }">
                        <div>آسیب پذیر</div>
                        <div class="tooltip"><strong class="ml-1.5 text-base sm:!text-white" style="color:#E57F17">{{
                                scanDetails.itemCounts.low }}</strong> مورد</div>
                    </div>
                    <div class="i-bad relative sm:flex sm:items-center sm:flex-col pt-2 pb-1.5 min-w-[110px] xs:!w-full"
                        :style="{ 'background' : `${colors.bad}B9` }">
                        <div>هشدار</div>
                        <div class="tooltip"><strong class="ml-1.5 text-base sm:!text-white" style="color:#f03c0c">{{
                                scanDetails.itemCounts.bad }}</strong> مورد</div>
                    </div>
                    <div class="i-critical relative sm:flex sm:items-center sm:flex-col pt-2 pb-1.5 min-w-[110px] xs:!w-full"
                        :style="{ 'background': `${colors.critical}B9` }">
                        <div>مرگ</div>
                        <div class="tooltip"><strong class="ml-1.5 text-base sm:!text-white" style="color:#fa0000">{{
                scanDetails.itemCounts.critical }}</strong> مورد</div>
                    </div>
                </div>
            </div>
            <div v-if="!scanLoading"
                class="card my-24 sm:my-16 grid grid-cols-[18rem_auto] gap-10 lg:gap-5 md:gap-10 md:grid-cols-1">
                <div class="flex flex-col gap-7">
                    <ul class="w-full md:grid md:grid-cols-2 sm:grid-cols-1 sm:gap-0 md:gap-1">
                        <li v-for="(report, index) in scanDetails.reports" @click="selectedReport = report"
                            :key="report.uuid"
                            :class="['card truncate cursor-pointer pt-2.5 pb-2 px-3 bg-light-primary border-r md:border-r-2', selectedReport.uuid === report.uuid? 'border-r-4' : 'hover:border-r-4']"
                            :style="{ 'border-right-color': colors[report.status], '--tw-bg-opacity': selectedReport.uuid === report.uuid ? 0 : ReportBGOpacity(index) }">
                            {{ report.name }}</li>
                    </ul>
                    <NuxtLink to="/contact" class="md:-order-1 md:justify-center w-full px-3 py-2.5 bg-main-purple-900 hover:bg-main-purple-700 shadow-sm rounded-xl flex items-center gap-3">
                        <IconsHeadphone class="h-5" />
                        <span class="mt-0.5">درخواست رفع مشکلات امنیتی</span>
                    </NuxtLink>
                </div>
                <div>
                    <h2 class="card text-2xl sm:text-xl font-bold"><span class="w-2.5 h-2.5 ml-2 inline-block"
                            :style="{ 'background-color': colors[selectedReport.status] }"></span> {{
                        selectedReport.name }}</h2>
                    <div v-html="selectedReport.content" class="card mt-6 text-[#E6E6E6] leading-loose"></div>
                    <a v-if="selectedReport?.name"
                        :href="`https://blog.${$config.public.SITE_URL}/?s=`+ selectedReport.uuid.replace(' ', '+')"
                        target="_blank"
                        class="card bg-light-primary bg-opacity-80 hover:bg-opacity-100 flex gap-3 justify-between items-center mt-10 border-r-2 border-sky-600 pt-2.5 pb-2 px-4">
                        <span>آموزش حل `{{ selectedReport.name }}` را در وبلاگ بخوانید</span>
                        <IconsArrowLeft class="h-4 sm:hidden" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.progress-radial {
  background-image: v-bind(progressGradient);
}

.i-good {
  width: v-bind('itemCountWith.good')
}
.i-low {
  width: v-bind('itemCountWith.low')
}
.i-bad {
  width: v-bind('itemCountWith.bad')
}
.i-critical {
  width: v-bind('itemCountWith.critical')
}

.tooltip {
  @apply w-20 py-1.5 pb-1 text-center bg-main-gray-700 absolute -top-3.5 -translate-y-full right-1/2 translate-x-1/2 text-sm
}
.strip > div > div {
  text-shadow: 0 0 5px #00000090;
}
.tooltip::before {
  content: "";
  @apply bg-white/10 absolute bottom-0 translate-y-full right-1/2 translate-x-1/2 border-x-8 border-x-[#0b0d12] border-t-8 border-t-main-gray-700
}
</style>