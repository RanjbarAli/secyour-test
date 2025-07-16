<script setup>
definePageMeta({
    middleware: 'guest'
})

useHead({
    title: 'فراموشی رمز عبور'
})

const email = ref('')
const inputsError = ref({
    email: ''
})
const isProcessing = ref(false)
const disableStatus = computed(() => isProcessing.value || Object.values(inputsError.value).some(i => i === ''))

watch(email, () => inputsError.value.email = validate('ایمیل', email.value, 'unload|email'))

const runtimeConfig = useRuntimeConfig()

const forget = async () => {
    isProcessing.value = true
    if (Object.values(inputsError.value).some(i => i !== null))
        useCompactAlertError('forget-request', Object.values(inputsError.value).find(i => i?.length))
    else {
        await useApiFetch().post(runtimeConfig.public.API_FORGET_PASSWORD, {
            email: email.value
        }).then(() => useCompactAlertSuccess('forget-request', 'لینک بازیابی رمز عبور برای شما ایمیل شد.'))
        .catch((error) => useCompactAlertError('forget-request', getErrorMessage(error)))
    }
    isProcessing.value = false
}
</script>

<template>
    <LayoutsAuth>
        <h2 class="card text-3xl font-bold mb-7 text-center">فراموشی رمز عبور</h2>
        <form class="card flex flex-col gap-5">
            <MainFormControl v-model="email" dir="ltr" type="email" label="ایمیل" icon="IconsMail"
                :status="inputsError.email" />
            <div class="card grid grid-cols-2 gap-4 xs:grid-cols-1">
                <button type="button" @click.prevent="navigateTo('/login')"
                    class="rounded-full bg-white/10 hover:bg-white/20 shadow py-2.5 px-4">ورود به پنل</button>
                <button type="submit" :disabled="disableStatus" @click.prevent="forget()"
                    class="xs:-order-1 disabled:opacity-80 rounded-full bg-sky-700 disabled:bg-sky-700 hover:bg-sky-800 shadow shadow-sky-700/30 py-2.5 px-4">
                    <IconsSpin v-if="isProcessing" class="h-5" />
                    <span v-else>ارسال لینک</span>
                </button>
            </div>
        </form>
    </LayoutsAuth>
</template>

<style scoped></style>