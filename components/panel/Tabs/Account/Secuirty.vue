<script setup>
const userStore = useUserStore()
const password = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')
const twoVerifaction = ref(false)
const inputsError = ref({
    password: '',
    newPassword: '',
    confirmNewPassword: ''
})
const isProcessing = ref(false)
const disableStatus = computed(() => isProcessing.value || Object.values(inputsError.value).some(i => i === ''))
const checkConfirmPassword = () => inputsError.value.confirmNewPassword = validate('تایید رمز عبور', confirmNewPassword.value, { unload: 0, same: ['رمز عبور جدید', newPassword.value] })
watch(password, () => inputsError.value.password = validate('رمز عبور فعلی', password.value, { unload: 0, min: 8, max: 40 }))
watch(newPassword, () => {
    inputsError.value.newPassword = validate('رمز عبور جدید', newPassword.value, { unload: 0, min: 8, max: 40, regex: '[a-zA-Z0-9]' })
    checkConfirmPassword()
})
watch(confirmNewPassword, checkConfirmPassword)

const changePassword = async () => {
    isProcessing.value = true
    if (Object.values(inputsError.value).some(i => i !== null))
        useCompactAlertError('change-password-request', Object.values(inputsError.value).find(i => i?.length))
    else {
        let result = await userStore.changePassword(password.value, newPassword.value)
        if (result.status == 'ok') {
            useCompactAlertSuccess('change-password-request', 'رمز عبور شما با موفقیت تغییر یافت.', { time: 5 })
            password.value = ''
            newPassword.value = ''
            confirmNewPassword.value = ''
        }
        else useCompactAlertError('change-password-request', result.message, { time: 7 })
    }
    isProcessing.value = false
}
</script>

<template>
    <div class="grid grid-cols-2 gap-14 xl:gap-8 lg:gap-4 ml:grid-cols-1 ml:gap-16">
        <div class="flex flex-col items-end gap-5">
            <PanelFormControl v-model="password" dir="ltr" type="password" label="رمز عبور فعلی" icon="IconsLock"
                :status="inputsError.password" />
            <PanelFormControl v-model="newPassword" dir="ltr" type="password" label="رمز عبور جدید"
                icon="IconsLock" :status="inputsError.newPassword">
                <div class="card mt-3 text-sm text-gray-500 tracking-wide word-spacing leading-relaxed">رمز عبور جدید انتخابی باید حداقل 8 کاراکتر و شامل یک حرف بزرگ و کوچک انگلیسی و عدد باشد.</div>
            </PanelFormControl>
            <PanelFormControl v-model="confirmNewPassword" dir="ltr" type="password" label="تکرار رمز عبور جدید"
                icon="IconsLock" :status="inputsError.confirmNewPassword" />
            <button :disabled="disableStatus" @click.prevent="changePassword()"
                class="w-36 xs:w-full disabled:opacity-60 text-white rounded-full bg-blue-500 disabled:bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-600/30 py-2.5 px-4">
                <IconsSpin v-if="isProcessing" class="h-5" />
                <span v-else>تغییر رمز</span>
            </button>
        </div>
        <div>
            <div class="card flex items-center justify-between bg-white dark:bg-gray-700 px-4 py-3 shadow-md rounded-lg">
                <span>ورود دو مرحله ای با شماره همراه</span>
                <PanelFormCheckbox disabled v-model="twoVerifaction" />
            </div>
            <div class="card text-sm mt-3 text-red-600 dark:text-red-500">ورود دو مرحله ای موقتا غیرفعال می باشد.</div>
        </div>
    </div>
</template>