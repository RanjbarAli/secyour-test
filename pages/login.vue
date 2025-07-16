<script setup>
definePageMeta({
    middleware: 'guest'
})

useHead({
    title: 'ورود به حساب'
})

const route = useRoute()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const inputsError = ref({
    email: '',
    password: ''
})
const isProcessing = ref(false)
const disableStatus = computed(() => isProcessing.value || Object.values(inputsError.value).some(i => i === ''))

watch(email, () => inputsError.value.email = validate('ایمیل', email.value, 'unload|email'))
watch(password, () => inputsError.value.password = validate('رمز عبور', password.value, 'unload|min:8|max:40'))


const login = async () => {
    isProcessing.value = true
    if (Object.values(inputsError.value).some(i => i !== null))
        useCompactAlertError('login-request', Object.values(inputsError.value).find(i => i?.length))
    else {
        let result = await userStore.login(email.value, password.value)
        if (result.status == 'ok') {
            useCompactAlertSuccess('login-request', 'شما با موفقیت وارد شدید.')
            return await navigateTo(route.query?.redirect?.length ? route.query.redirect : '/panel')
        }
        useCompactAlertError('login-request', result.message)
    }
    isProcessing.value = false
    return false
}
</script>

<template>
    <LayoutsAuth>
        <h2 class="card text-3xl font-bold mb-7">ورود به حساب </h2>
        <form class="card flex flex-col gap-5">
            <MainFormControl v-model="email" dir="ltr" type="email" label="ایمیل" icon="IconsMail"
                :status="inputsError.email" />
            <MainFormControl v-model="password" dir="ltr" type="password" label="رمز عبور" icon="IconsLock"
                :status="inputsError.password" />
            <NuxtLink to="/forget-password" class="text-sm text-sky-400 hover:text-sky-500">رمز عبورتان را گم کرده اید؟
            </NuxtLink>
            <div class="card grid grid-cols-2 gap-4 xs:grid-cols-1">
                <button type="button" @click.prevent="navigateTo('/register')"
                    class="rounded-full bg-white/10 hover:bg-white/20 shadow py-2.5 px-4">ایجاد حساب</button>
                <button type="submit" :disabled="disableStatus" @click.prevent="login()"
                    class="xs:-order-1 disabled:opacity-80 rounded-full bg-sky-700 disabled:bg-sky-700 hover:bg-sky-800 shadow shadow-sky-700/30 py-2.5 px-4">
                    <IconsSpin v-if="isProcessing" class="h-5" />
                    <span v-else>ورود به پنل</span>
                </button>
            </div>
        </form>
    </LayoutsAuth>
</template>