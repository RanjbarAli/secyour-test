<template>
    <div class="card">

        <div class="card flex items-end justify-between xs:flex-col xs:items-center gap-5">
            <h1 class="page-title xs:ml-auto">اسکن جدید</h1>
            <div class="rounded-full bg-white dark:bg-gray-700 shadow-md grid xs:rounded-2xl xs:text-sm grid-cols-2 p-1">
                <span :class="{ 'tab': true, 'active': tab == 'free' }" @click="router.replace({ hash: '#free' })">اسکن
                    رایگان</span>
                <span :class="{ 'tab': true, 'active': tab == 'deep' }" @click="router.replace({ hash: '#deep' })">اسکن
                    عمیق</span>
            </div>
        </div>

        <div class="card grid grid-cols-2 mt-10 gap-16 2xl:gap-8 xl:gap-5 lg:grid-cols-1">
            <div>
                <p class="card mb-5 text-justify text-base leading-relaxed text-gray-600 dark:text-gray-400">توجه داشته باشید که طبق سیاست نامه سکیور،
                    برای اسکن عمیق سایت مورد نظر باید یک ایمیل سازمانی از آن دامین داشته باشید و آن را در سکیور تایید
                    کرده باشید. در صورتی که دامنه وارد شده جزو دامنه های تایید شده شما نباشد شما قادر به اسکن نخواهید
                    شد. <a class="text-nowrap text-blue-600 dark:text-blue-400 mr-1 cursor-pointer text-sm" @click.prevent="navigateTo('/panel/account#emails')">(ثبت ایمیل سازمانی)</a></p>
                <PanelFormControl v-model="url" type="url" :status="urlError" dir="ltr" label="آدرس سایت جهت اسکن" icon="IconsLargeGlobe" />
                <div class="card xs:text-sm flex justify-between items-center gap-5 mt-5 bg-gradient-to-l from-white to-white/0 dark:from-gray-700 dark:to-gray-700/0 shadow-sm rounded-xl px-4 py-2.5">
                    <span>اسکن بعد از شب ( کسر 20 درصد هزینه )</span>
                    <PanelFormCheckbox v-model="economyScan" />
                </div>
            </div>
            <div>
                <div class="card xs:text-sm flex justify-between items-center gap-5 mb-3 bg-gradient-to-r from-white to-white/0 dark:from-gray-700 dark:to-gray-700/0 shadow-sm rounded-xl px-4 py-2.5">
                    <span>هزینه اسکن:</span>
                    <span class="font-bold text-nowrap">{{ tab == 'free'? 'رایگان': '100 هزار تومان' }}</span>
                </div>
                <div class="card xs:text-sm flex justify-between items-center gap-5 mb-3 bg-gradient-to-r from-white to-white/0 dark:from-gray-700 dark:to-gray-700/0 shadow-sm rounded-xl px-4 py-2.5">
                    <span>تخفیف:</span>
                    <span class="font-bold">
                        <span v-if="tab != 'free' && economyScan" class="text-green-700"><strong dir="ltr">-20%</strong> (بابت زمان انتخابی)</span>
                        <span v-else>-</span>
                    </span>
                </div>
                <div class="card xs:text-sm flex justify-between items-center gap-5 mb-3 bg-gradient-to-r from-white to-white/0 dark:from-gray-700 dark:to-gray-700/0 shadow-sm rounded-xl px-4 py-2.5">
                    <span>موجودی کیف پول :</span>
                    <span class="font-bold text-nowrap">{{ String(userStore.info.money >= 1e6? `${userStore.info.money / 1e6} میلیون` : userStore.info.money >= 1e3? `${userStore.info.money / 1e3} هزار` : userStore.info.money).replace('.', '/') }} تومان</span>
                </div>
                <div class="card xs:text-sm flex justify-between items-center gap-5 mb-3 bg-gradient-to-r from-white to-white/0 dark:from-gray-700 dark:to-gray-700/0 shadow-sm rounded-xl px-4 py-2.5">
                    <span>هزینه نهایی: <span :class="['text-sm mr-2 text-nowrap xs:block xs:mr-0', canPay? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300']">({{ canPay? 'موجودی کافی' : 'موجودی ناکافی' }})</span></span>
                    <span class="font-bold text-nowrap">{{ tab == 'free'? 'رایگان': economyScan? '80 هزار تومان' : '100 هزار تومان' }}</span>
                </div>
            </div>
            <div class="col-span-full xs:text-sm flex justify-between items-center flex-wrap gap-5">
                <label class="select-none cursor-pointer" @click="acceptTerms = !acceptTerms">
                    <div :class="['inline-block align-middle mb-1 ml-2 w-5 h-5 xs:w-4 xs:h-4 xs:rounded rounded-lg border border-blue-600 dark:border-blue-400', acceptTerms? 'bg-blue-600 dark:bg-blue-400' : 'bg-white dark:bg-gray-800']"></div>
                    <span>با مرام نامه و اساس نامه شرکت موافقت خود را اعلام می کنم</span>
                </label>
                <button :disabled="!url.length || isProcessing || !acceptTerms" @click.prevent="submitScan()"
                class="w-36 mr-auto xs:w-full disabled:opacity-60 text-white rounded-full bg-blue-500 disabled:bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-600/30 py-2.5 px-4">
                <IconsSpin v-if="isProcessing" class="h-5" />
                <span v-else>شروع اسکن</span>
            </button>
            </div>
        </div>

    </div>
</template>

<script setup>
definePageMeta({
    layout: 'panel'
})
const userStore = useUserStore()
const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const router = useRouter()
const tab = computed(() => route.hash == '#deep'? 'deep' : 'free')

const url = ref('')
const urlError = ref('')
const economyScan = ref(true)
const isProcessing = ref(false)

const canPay = computed(() => userStore.info.money >= (tab.value == 'free'? 0 : economyScan.value? 80000 : 100000))
const acceptTerms = ref(false)

watch(url, () => urlError.value = validate('آدرس سایت', url.value, 'unload|url'))

const submitScan = async () => {
    if (isProcessing.value || !acceptTerms.value) return false
    isProcessing.value = true
    if (urlError.value !== null)
        useCompactAlertError('submit-scan', urlError.value, { time: 4 })
    else if (canPay) {
        await useUserApiFetch().post(runtimeConfig.public.API_SCAN_SITE,  { url: url.value, type: tab.value })
        .then(async () => {
            useCompactAlertSuccess(`submit-scan`, 'سایت شما با موفقیت در صف اسکن قرار گرفت.', { time: 4 })
            return await navigateTo('/panel')
        }).catch((error) => {
            useCompactAlertError(`submit-scan`, getErrorMessage(error), { time: 5 })
        })
    } else {
        useCompactAlertError('submit-scan', 'موجودی شما برای انجام اسکن کافی نمی باشد.')
    }
    isProcessing.value = false
}

</script>

<style lang="postcss" scoped>
.tab {
    @apply rounded-full text-center py-1.5 px-4 xs:py-2.5 select-none cursor-pointer duration-100 xs:rounded-xl xs:bg-gray-50 dark:xs:bg-gray-600
}
.tab.active {
    @apply bg-blue-600 text-white
}
</style>