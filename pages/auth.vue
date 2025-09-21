<script setup>
definePageMeta({
	middleware: 'guest',
	layout: 'auth',
	title: 'حساب کاربری'
})

const route = useRoute()
const userStore = useUserStore()
const isSent = ref(false)
const timer = ref(null)

const sentDetails = reactive({
	mobile: '',
	secondsLeft: 0
})

const startCountdown = () => {
  sentDetails.secondsLeft = 120
  timer.value = setInterval(() => {
    if (sentDetails.secondsLeft > 0) {
      sentDetails.secondsLeft--
    } else {
      clearInterval(timer.value)
    }
  }, 1000)
}

const form = useForm({
	mobile: { default: '', rules: ['required', 'phone'] }
})

const otpForm = useForm({
	otp: { default: '', rules: ['required', 'integer'], each: true }
})
const isProcessing = ref(false)

const changeNumber = () => {
	sentDetails.mobile = ''
	sentDetails.secondsLeft = 0
	clearInterval(timer.value)
	isSent.value = false
}


const sendCode = async () => {
	isProcessing.value = true

	await form.submit(async (data) => {
		//let result = await userStore.sendCode(data.mobile)
        if (true || result.success) {
			isSent.value = true
			sentDetails.mobile = data.mobile
			startCountdown()
            useAlerts().add('کد با موفقیت ارسال شد.', 'success')
			return true
        }
        useAlerts().add(result.message, 'error')
	})
	isProcessing.value = false
	return false
}

const login = async () => {
	isProcessing.value = true

	await otpForm.submit(async (data) => {
		let result = await userStore.login(data.mobile, data.otp)
        if (result.success) {
            useAlerts().add('با موفقیت وارد شدید.', 'success')
			await navigateTo(route.query?.redirect ?? '/panel')
			return true
        }
        useAlerts().add(result.message, 'error')
	})
	isProcessing.value = false
	return false
}
</script>

<template>
	<form class="p-7 max-md:p-5 bg-white/5 shadow-lg rounded-3xl w-full max-w-94 flex flex-col min-h-80 relative h-full gap-5">
		<h2 class="card text-2xl font-bold drop-shadow-sm">ورود / ثبت نام </h2>
		<div class="w-full" v-if="isSent">
			<p class="text-slate-200 text-sm leading-relaxed mb-3">کد تأیید ۶ رقمی به شماره موبایل {{ sentDetails.mobile }} ارسال شد. در صورتی که شماره را اشتباه وارد کرده‌اید، می‌توانید از طریق گزینه‌ی <span class="linked-text cursor-pointer" @click.prevent="changeNumber">«تغییر شماره»</span> آن را اصلاح نمایید.</p>
			<MainFormOTP v-model="otpForm.otp.data" :error="otpForm.otp.error" />
		</div>
		<div class="w-full" v-else>
			<p class="text-slate-200 text-sm leading-relaxed mb-3">شماره موبایل را جهت ارسال کد وارد کنید.</p>
			<MainFormInput :label="form.mobile.name" name="mobile" type="tel" :error="form.mobile.error" v-model="form.mobile.data" icon="telephone" />
		</div>
		<div class="w-full mt-auto grid grid-cols-2 gap-3" v-if="isSent">
			<button class="btn btn-black btn-large" :disabled="isProcessing || sentDetails.secondsLeft" @click.prevent="resentCode()">ارسال دوباره <span v-if="sentDetails.secondsLeft">({{ sentDetails.secondsLeft }})</span></button>
			<button class="btn btn-blue btn-large" type="submit" :disabled="isProcessing" @click.prevent="login()">تایید</button>
		</div>
		<button v-else class="btn btn-blue btn-large mt-auto" type="submit" :disabled="isProcessing" @click.prevent="sendCode()">ارسال کد</button>
</form>
</template>