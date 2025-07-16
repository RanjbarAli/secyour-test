<template>
    <div class="grid grid-cols-2 gap-16 xl:gap-8 lg:gap-4 ml:grid-cols-1 ml:gap-16">
        <div>
            <span class="text-sm card leading-relaxed">شما تنها سایت هایی را مجاز به اسکن هستید که ایمیل سازمانی همان
                سایت را ثبت و آن را تایید کرده باشید. برای ثبت ایمیل، آدرس ایمیل سازمانی را وارد کرده و از طریق لینک
                ارسال شده آن ایمیل را تایید کنید.<br />دقت داشته باشید هر لینک تا 15 دقیقه قابل استفاده است.</span>
            <div class="card my-5">
                <PanelFormControl v-model="email" type="email" :status="emailError" dir="ltr" label="ایمیل سازمانی" icon="IconsMail" />
            </div>
            <button :disabled="disableStatus" @click.prevent="addEmail()"
                class="xs:w-full w-32 disabled:opacity-80 float-left text-white rounded-full bg-blue-600 disabled:bg-blue-700 hover:bg-blue-700 shadow-lg shadow-blue-600/30 py-2.5 px-4">
                <IconsSpin v-if="isProcessing" class="h-5" />
                <span v-else>ارسال ایمیل تایید</span>
            </button>
        </div>
        <div>
            <div class="flex justify-between items-center gap-5 mb-6">
                <h4 class="font-bold text-lg">ایمیل های ثبت شده</h4>
                <button :disabled="isLoading" @click.prevent="loadEmails" class="disabled:opacity-80 cursor-pointer disabled:cursor-auto float-left hover:text-blue-600 dark:hover:text-blue-300 disabled:hover:text-inherit rounded-full bg-white dark:bg-gray-600 w-8 h-8 grid place-items-center shadow-lg">
                    <IconsRefresh :class="{'h-4': true, 'animate-spin': isLoading}" />
                </button>
            </div>
            <div v-if="!isLoading" class="bg-gradient-to-r from-white to-white/0 dark:from-gray-700 dark:to-gray-700/0 shadow-sm rounded-xl mb-2 px-3 pt-2 pb-1 text-left" dir="ltr" v-for="(orgEmail, index) in organizationsEmail"><span class="opacity-50">{{ index + 1 }}.</span> {{ orgEmail }}</div>
        </div>
    </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const email = ref('')
const organizationsEmail = ref([])
const isLoading = ref(false)
const emailError = ref('')
const isProcessing = ref(false)
const loadEmails = async () => {
    if (isProcessing.value || isLoading.value) return false
    isLoading.value = true
    await useUserApiFetch().get(runtimeConfig.public.API_GET_ORGANIZATIONS_EMAIL)
    .then(({ data }) => {
        organizationsEmail.value = data
    }).catch((error) => {
        useCompactAlertError(`get-organizations-email`, getErrorMessage(error), { time: 5 })
    })
    isLoading.value = false
}

onMounted(() => {
    loadEmails()
})
const disableStatus = computed(() => isProcessing.value || emailError.value != null)
watch(email, () => emailError.value = validate('ایمیل', email.value, 'unload|required|email'))


const addEmail = async () => {
    if (isProcessing.value) return false
    isProcessing.value = true
    if (emailError.value != null) {
        useCompactAlertError(`add-organizations-email-${email.value}`, emailError.value)
    } else {
        await useUserApiFetch().put(runtimeConfig.public.API_ADD_ORGANIZATIONS_EMAIL, {
            email: email.value
        }).then(() => {
            useCompactAlertSuccess(`add-organizations-email-${email.value}`, `به ${email.value} لینک تایید ایمیل شد.`)
            email.value = ''
        }).catch((error) => {
            useCompactAlertError(`add-organizations-email-${email.value}`, getErrorMessage(error), { time: 5 })
        })
    }
    isProcessing.value = false
}
</script>