<template>
    <div class="grid grid-cols-2 gap-16 2xl:gap-8 xl:gap-4 lg:grid-cols-1 lg:gap-20">
        <div>
            <h4 class="font-bold text-lg">
                <IconsWallet class="inline-block h-5 mb-1 align-middle ml-2" /> کیف پول
            </h4>
            <div
                class="flex justify-between items-center gap-5 mt-3 mb-10 bg-gradient-to-l from-white to-white/0  dark:from-gray-700 dark:to-gray-700/0 shadow-sm rounded-xl px-3 py-2">
                <div>
                    <span class="font-bold text-blue-700 dark:text-blue-200 ml-1 tracking-wider">{{ isWalletLoading? '-' :
                        useNumberFormat(userStore.info.money) }}</span> تومان
                </div>
                <button :disabled="disableStatus" @click.prevent="refreshWallet()"
                    class="disabled:opacity-80 cursor-pointer disabled:cursor-auto float-left hover:text-blue-600 dark:hover:text-blue-300 disabled:hover:text-inherit rounded-full bg-white dark:bg-gray-600 w-8 h-8 grid place-items-center shadow-lg">
                    <IconsRefresh :class="{'h-4': true, 'animate-spin': isWalletLoading}" />
                </button>
            </div>

            <div class="card grid grid-cols-2 xs:grid-cols-1 xs:gap-2 grid-rows-2 gap-4 mb-5">
                <div v-for="size in [100000, 250000, 500000, 1000000]" @click="increaseSize = size"
                    :class="['bg-white dark:bg-gray-700 rounded-md shadow-sm pt-2 pb-1.5 cursor-pointer px-3 text-center border select-none', increaseSize == size? 'border-blue-600 text-blue-600 dark:border-blue-300 dark:text-blue-300':'border-gray-200 dark:border-gray-500']">
                    <span class="ml-1">{{ useNumberFormat(size) }}</span> تومان</div>
            </div>


            <div class="card flex gap-3 xs:flex-col items-center">
                <input placeholder="مبلغ دلخواه (تومان)" v-model="increaseSize" type="number"
                    :class="['tracking-widest placeholder:tracking-wide flex-shrink w-full disabled:opacity-70 text-sm text-center bg-gray-50 dark:bg-gray-700 px-5 rounded-xl border shadow-sm py-2 focus:border-blue-500/70 focus:shadow-blue-500/50 border-transparent shadow-gray-400']">
                <button :disabled="disableStatus" @click.prevent="increaseMoney()"
                    class="xs:w-full text-nowrap disabled:opacity-80 text-white xs:mr-auto rounded-xl bg-blue-600 disabled:bg-blue-700 hover:bg-blue-700 shadow-lg shadow-blue-600/30 py-2.5 px-4">
                    <IconsSpin v-if="isWalletProcessing" class="h-5" />
                    <span v-else>افزایش موجودی</span>
                </button>
            </div>
        </div>

        <div>
            <div class="card flex items-center justify-between gap-5">
                <h4 class="font-bold text-lg">
                    <IconsPremium class="inline-block text-purple-600 h-5 mb-1 align-middle ml-2" /> اشتراک
                </h4>
                <div :class="['rounded-md py-1 px-2 text-sm', userStore.info.type == 'free'? 'text-gray-500' : 'bg-main-purple-700 text-white']">
                    <span>{{ {free: 'رایگان', pro: 'حرفه ای', organization: 'سازمانی'}[userStore.info.type] }}</span>
                    <span v-if="userStore.info.type != 'free'" class="mr-2 text-xs">({{ subscriptionDaysLeft }} روز مانده)</span>
                </div>
            </div>
            <div class="card mt-5 rounded-full bg-white dark:bg-gray-700 shadow-md grid grid-cols-4 xs:grid-cols-2 xs:gap-1 xs:rounded-xl p-1">
                <span v-for="period in Object.keys(periods)" :class="{'period-tab': true, 'active': subscriptionPeriod == period}" @click="subscriptionPeriod = period">{{ periods[period] }}</span>
            </div>
            <div class="card mt-5 mb-8">
                <div class="card rounded-lg bg-white dark:bg-gray-700 shadow-md flex items-center py-3 px-4 cursor-pointer gap-3">
                    <div class="rounded-full w-4 h-4 bg-main-purple-700/50 dark:bg-purple-500 border-4 border-main-purple-900/30"></div>
                    <div>
                        <strong class="text-main-purple-700 dark:text-purple-300 text-lg xs:text-base">اشتراک حرفه ای</strong>
                        <p class="text-sm xs:text-xs">اسکن عمیق و کامل</p>
                    </div>
                    <div class="mr-auto text-left">
                        <strong class="text-blue-600 dark:text-blue-300 xs:text-base">
                            {{ String((proPrices[subscriptionPeriod])/1e6).replace('.', '/') }} میلیون
                        </strong>
                        <div class="text-xs xs:text-xs mt-0.5 text-gray-500 dark:text-gray-300">تومان / {{ periods[subscriptionPeriod] }}</div>
                    </div>
                </div>
                <div class="card rounded-lg bg-white dark:bg-gray-700 shadow-md flex items-center py-3 px-4 xs:p-3 mt-3 gap-3 opacity-60">
                    <div class="rounded-full w-4 h-4 bg-gray-200 dark:bg-gray-300 border-4 border-gray-300 dark:border-gray-400"></div>
                    <div>
                        <strong class="text-gray-700 dark:text-gray-200 text-lg xs:text-base">اشتراک سازمانی</strong>
                        <p class="text-sm xs:text-xs">تنظیم توسط کارشناسان</p>
                    </div>
                    <div class="mr-auto text-left">
                        <strong class="text-gray-700 dark:text-gray-300 xs:text-sm">تماس بگیرید</strong>
                        <div class="text-xs mt-0.5 text-gray-500 dark:text-gray-300">{{ periods[subscriptionPeriod] }}</div>
                    </div>
                </div>
            </div>
            <div class="card flex items-center justify-between gap-5 xs:flex-col xs:text-center">
                <div>
                    <div>
                        <span class="block text-xs mb-1.5">مبلغ کل پرداختی:</span>
                        <strong class="text-lg text-gray-700 dark:text-white" style="word-spacing:3px">{{ useNumberFormat(proPrices[subscriptionPeriod]) }} تومان</strong>
                    </div>
                </div>
                <button :disabled="disableStatus" @click.prevent="subscribe()"
                    class="xs:w-full disabled:opacity-80 text-white rounded-full bg-blue-600 disabled:bg-blue-700 hover:bg-blue-700 shadow-lg shadow-blue-600/30 py-2.5 px-4">
                    <IconsSpin v-if="isSubscriptionProcessing" class="h-5" />
                    <span v-else class="tracking-wide">پرداخت و {{ userStore.info.type == 'pro'? 'رزرو' : 'خرید' }} اشتراک</span>
                </button>
            </div>
        </div>

    </div>
</template>

<script setup>
const userStore = useUserStore()
const runtimeConfig = useRuntimeConfig()

const disableStatus = computed(() => isSubscriptionLoading.value || isSubscriptionProcessing.value || isWalletProcessing.value || isWalletLoading.value)

const isWalletLoading = ref(false)
const isWalletProcessing = ref(false)
const increaseSize = ref('')
const increaseMoney = async () => {
    if (disableStatus.value) return false
    isWalletProcessing.value = true
    if (increaseMoney.value < 50000) useCompactAlertError('increase-money-request', 'مبلغ وارد شده باید حداقل 50 هزار تومان باشد.', { time: 4 })
    await useUserApiFetch().post(runtimeConfig.public.API_INCREASE_MONEY, { money: increaseSize.value })
        .then(async ({ data }) => await navigateTo(data.redirect, { external: true }))
        .catch((error) => useCompactAlertError('increase-money-request', getErrorMessage(error), { time: 5 }))
    isWalletProcessing.value = false
}
const refreshWallet = async () => {
    if (isWalletProcessing.value || isWalletLoading.value) return false
    isWalletLoading.value = true
    await userStore.refreshProperty('money')
    isWalletLoading.value = false
}

const isSubscriptionProcessing = ref(false)
const isSubscriptionLoading = ref(false)
const subscriptionPeriod = ref(1)
const subscriptionDaysLeft = ref('-')
const periods = {
    1: 'یک ماهه',
    3: 'سه ماهه',
    6: 'شش ماهه',
    12: 'یک ساله'
}
const proPrices = { 1: 1_000_000, 3: 2_700_000, 6: 5_200_000, 12: 9_600_000 }
const subscribe = async () => {
    if (disableStatus.value) return false
    isSubscriptionProcessing.value = true
    await useUserApiFetch().post(runtimeConfig.public.API_SUBSCRIBE_PLAN, { type: 'pro', period: subscriptionPeriod.value })
        .then(async ({ data }) => await navigateTo(data.redirect, { external: true }))
        .catch((error) => useCompactAlertError('subscribe-request', getErrorMessage(error), { time: 5 }))
    isSubscriptionProcessing.value = false
}

onMounted(async () => {
    isSubscriptionLoading.value = true
    await useUserApiFetch().get(runtimeConfig.public.API_GET_SUBSCRIPTION_DAYS_LEFT)
    .then(({ data }) => {
        subscriptionDaysLeft.value = data.days
    }).catch((error) => {
        useCompactAlertError(`get-subscription-days-left`, getErrorMessage(error))
    })
    isSubscriptionLoading.value = false
})
</script>

<style lang="postcss" scoped>
.period-tab {
    @apply rounded-full text-center py-1.5 px-2 xs:py-2.5 select-none cursor-pointer text-sm duration-100 xs:rounded-xl xs:bg-gray-50 dark:xs:bg-gray-600
}
.period-tab.active {
    @apply bg-blue-600 text-white
}
</style>