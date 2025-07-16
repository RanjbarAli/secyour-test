<script setup>
definePageMeta({
    middleware: 'guest'
})
useHead({
    title: 'ایجاد حساب'
})
const userStore = useUserStore()
const email = ref('')
const name = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptTerms = ref(false)
const isProcessing = ref(false)
const disableStatus = computed(() => !acceptTerms.value || isProcessing.value || Object.values(inputsError.value).some(i => i === ''))
const inputsError = ref({
    email: '',
    name: '',
    phone: '',
    password: '',
    confirmPassword: ''
})
watch(email, () => inputsError.value.email = validate('ایمیل', email.value, 'unload|email'))
watch(name, () => inputsError.value.name = validate('نام مستعار', name.value, 'unload|min:3|max:40'))
watch(phone, () => inputsError.value.phone = validate('شماره همراه', phone.value, 'unload|phone'))
const checkConfirmPassword = () => inputsError.value.confirmPassword = validate('تایید رمز عبور', confirmPassword.value, { unload: 0, same: ['رمز عبور', password.value] })
watch(password, () => {
    inputsError.value.password = validate('رمز عبور', password.value, 'unload|min:8|max:40')
    checkConfirmPassword()
})
watch(confirmPassword, checkConfirmPassword)

const runtimeConfig = useRuntimeConfig()

const register = async () => {
    isProcessing.value = true
    if (Object.values(inputsError.value).some(i => i !== null)) {
        useCompactAlertError('register-request', Object.values(inputsError.value).find(x => x?.length))
    }
    else {
        await useApiFetch().put(runtimeConfig.public.API_REGISTER, {
            email: email.value,
            displayName: name.value,
            phone: phone.value,
            password: password.value
        }).then(async ({ data }) => {
            await userStore.getUser(data.token)
            useCompactAlertSuccess('register-request', 'شما با موفقیت ثبت نام شدید.')
            await navigateTo('/panel')
        }).catch((error) => useCompactAlertError('register-request', getErrorMessage(error)))
    }
    isProcessing.value = false
}
</script>

<template>
    <LayoutsAuth>
        <h2 class="card text-3xl font-bold mb-7 text-center">ایجاد حساب کاربری </h2>
        <form class="card flex flex-col gap-5">
            <MainFormControl v-model="name" type="text" label="نام مستعار" icon="IconsUser" :status="inputsError.name" />
            <MainFormControl v-model="email" dir="ltr" type="email" label="ایمیل" icon="IconsMail"
                :status="inputsError.email" />
            <MainFormControl v-model="phone" dir="ltr" type="tel" label="شماره همراه" icon="IconsTelephone"
                :status="inputsError.phone" />
            <MainFormControl v-model="password" dir="ltr" type="password" label="رمز عبور" icon="IconsLock"
                :status="inputsError.password" />
            <MainFormControl v-model="confirmPassword" dir="ltr" type="password" label="تایید رمز عبور" icon="IconsLock"
                :status="inputsError.confirmPassword" />
            <label class="select-none">
                <input class="ml-2" type="checkbox" v-model="acceptTerms" />
                <NuxtLink to="/terms" class="text-sky-400 hover:text-sky-500">قوانین و مقررات</NuxtLink> را می پذیرم.
            </label>
            <div class="card grid grid-cols-2 gap-4 xs:grid-cols-1">
                <button type="button" @click.prevent="navigateTo('/login')"
                    class="rounded-full bg-white/10 hover:bg-white/20 shadow py-2.5 px-4">ورود به پنل</button>
                <button type="submit" :disabled="disableStatus" @click.prevent="register()"
                    class="xs:-order-1 disabled:opacity-80 rounded-full bg-sky-700 disabled:bg-sky-700 hover:bg-sky-800 shadow shadow-sky-700/30 py-2.5 px-4">
                    <IconsSpin v-if="isProcessing" class="h-5" />
                    <span v-else>ایجاد حساب</span>
                </button>
            </div>
        </form>
</LayoutsAuth>
</template>

<style scoped></style>