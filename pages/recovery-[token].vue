<script setup>
const runtimeConfig = useRuntimeConfig()
definePageMeta({
    validate: async (to, from) => {
        const { token } = to.params
        const { data } = await useApiFetch().post(useRuntimeConfig().public.API_RESET_PASSWORD_TOKEN_CHECK, { token })
        if (data.status != 'ok') return navigateTo('/forget-password')
        return true
    },
    middleware: 'guest'
})
useHead({
    title: 'تغییر رمز عبور'
})
const password = ref('')
const confirmPassword = ref('')
const isProcessing = ref(false)
const disableStatus = computed(() => isProcessing.value || Object.values(inputsError.value).some(i => i === ''))
const inputsError = ref({
    password: '',
    confirmPassword: ''
})
const checkConfirmPassword = () => inputsError.value.confirmPassword = validate('تایید رمز عبور', confirmPassword.value, { unload: 0, same: ['رمز عبور', password.value] })
watch(password, () => {
    inputsError.value.password = validate('رمز عبور', password.value, 'unload|min:8|max:40')
    checkConfirmPassword()
})
watch(confirmPassword, checkConfirmPassword)
const route = useRoute()
const userStore = useUserStore()


const changePassword = async () => {
    isProcessing.value = true
    if (Object.values(inputsError.value).some(i => i !== null)) {
        useCompactAlertError('change-password-request', Object.values(inputsError.value).find(x => x?.length))
    }
    else {
        await useApiFetch().post(runtimeConfig.public.API_RESET_PASSWORD, {
            token: route.params.token,
            password: password.value
        }).then(async ({ data }) => {
            await userStore.getUser(data.token)
            useCompactAlertSuccess('register-request', 'رمز عبور شما با موفقیت تغییر یافت.')
            await navigateTo('/panel')
        }).catch((error) => useCompactAlertError('register-request', getErrorMessage(error)))
    }
    isProcessing.value = false
}
</script>

<template>
    <LayoutsAuth>
        <h2 class="card text-3xl font-bold mb-7 text-center">تغییر رمز عبور</h2>
        <form class="card flex flex-col gap-5">
            <MainFormControl v-model="password" dir="ltr" type="password" label="رمز عبور" icon="IconsLock"
                :status="inputsError.password" />
            <MainFormControl v-model="confirmPassword" dir="ltr" type="password" label="تایید رمز عبور" icon="IconsLock"
                :status="inputsError.confirmPassword" />
            <div class="card grid grid-cols-2 gap-4 xs:grid-cols-1">
                <div></div>
                <button type="submit" :disabled="disableStatus" @click.prevent="changePassword()"
                    class="xs:-order-1 disabled:opacity-80 rounded-full bg-sky-700 disabled:bg-sky-700 hover:bg-sky-800 shadow shadow-sky-700/30 py-2.5 px-4">
                    <IconsSpin v-if="isProcessing" class="h-5" />
                    <span v-else>تغییر رمز</span>
                </button>
            </div>
        </form>
    </LayoutsAuth>
</template>

<style scoped></style>