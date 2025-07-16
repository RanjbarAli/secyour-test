<script setup>
useHead({
    title: 'تماس با ما'
})

const config = useRuntimeConfig()

const email = ref('')
const name = ref('')
const title = ref('')
const message = ref('')
const isProcessing = ref(false)
const disableStatus = computed(() => isProcessing.value || Object.values(inputsError.value).some(i => i === ''))
const inputsError = ref({
    email: '',
    name: '',
    title: '',
    message: ''
})
watch(email, () => inputsError.value.email = validate('ایمیل', email.value, 'unload|email'))
watch(name, () => inputsError.value.name = validate('نام و نام خانوادگی', name.value, 'unload|min:3|max:40'))
watch(title, () => inputsError.value.title = validate('عنوان', title.value, 'unload|min:10|max:160'))
watch(message, () => inputsError.value.message = validate('پیام', message.value, 'unload|min:20|max:2000'))
const sendMessage = async () => {
    isProcessing.value = true
    if (Object.values(inputsError.value).some(i => i !== null)) {
        useCompactAlertError('contact-request', Object.values(inputsError.value).find(x => x?.length))
    }
    else {
        await useApiFetch().put(config.public.API_CONTACT, {
            email: email.value,
            name: name.value,
            title: title.value,
            message: message.value
        }).then(async () => {
            useCompactAlertSuccess('contact-request', 'پیام شما با موفقیت ارسال شد.', { time: 5 })
            email.value = ''
            name.value = ''
            title.value = ''
            message.value = ''
        }).catch((error) => useCompactAlertError('contact-request', getErrorMessage(error)))
    }
    isProcessing.value = false
}
</script>

<template>
    <div class="container mt-28 lg:mt-10 relative grid grid-cols-2 gap-16 lg:gap-5 md:grid-cols-1">
        <div>
            <div class="text-gray-200">
                <h1 class="card text-2xl text-white font-bold">در هر لحظه پاسخگوی شما هستیم!</h1>
                <span class="card mt-4">تیم سکیور 24 ساعت 7 روز هفته در خدمت شما عزیزان می باشد</span>
                <div class="card mt-6 px-3.5 py-2 rounded-xl bg-gradient-to-l from-white/10 to-white/0 flex justify-between items-center">
                    <span>ایمیل :</span>
                    <div dir="ltr" class="flex items-center gap-3">
                        <IconsEnvelopeSolid class="w-4.5 opacity-50" />
                        <a class="mt-0.5 text-lg tracking-wider hover:text-sky-200" dir="ltr" :href="`mailto:support@${config.public.SITE_URL}`">{{ `support@${config.public.SITE_URL}` }}</a>
                    </div>
                </div>
                <div class="card mt-3 px-3.5 py-2 rounded-xl bg-gradient-to-l from-white/10 to-white/0 flex justify-between items-center">
                    <span>شماره تماس :</span>
                    <div dir="ltr" class="flex items-center gap-3">
                        <IconsTelephone class="w-4.5 opacity-50" />
                        <a class="mt-0.5 text-lg tracking-wider hover:text-sky-200" dir="ltr" href="tel:09123456789">0912 345 6789</a>
                    </div>
                </div>
                <div class="card mt-3 px-3.5 py-2 rounded-xl bg-gradient-to-l from-white/10 to-white/0 flex justify-between items-center">
                    <span>آیدی تلگرام :</span>
                    <div dir="ltr" class="flex items-center gap-3">
                        <IconsTelegram class="w-4.5 opacity-50" />
                        <a class="mt-0.5 text-lg tracking-wider hover:text-sky-200" target="_blank" href="https://t.me/secyour">@secyour</a>
                    </div>
                </div>
                <div class="card mt-3 px-3.5 py-2 rounded-xl bg-gradient-to-l from-white/10 to-white/0 flex justify-between items-center">
                    <span>پیج اینستاگرام :</span>
                    <div dir="ltr" class="flex items-center gap-3">
                        <IconsInstagramSolid class="w-4.5 opacity-50" />
                        <a class="mt-0.5 text-lg tracking-wider hover:text-sky-200" target="_blank" href="https://instagram.me/secyour.com">@secyour.com</a>
                    </div>
                </div>
            </div>
            <p></p>
        </div>
        <div>
            <div class="card grid grid-cols-2 lg:grid-cols-1 gap-4">
                <div class="col-span-full px-3.5 py-3 rounded-xl bg-gradient-to-l font-bold from-white/10 to-white/0">ارسال پیام به پشتیبانی</div>
                <MainFormControl v-model="name" type="text" label="نام و نام خانوادگی" icon="IconsUser"
                    :status="inputsError.name" />
                <MainFormControl v-model="email" dir="ltr" type="email" label="ایمیل" icon="IconsMail"
                    :status="inputsError.email" />
                <div class="col-span-full">
                    <MainFormControl v-model="title" type="text" label="عنوان" icon="IconsEditPen"
                    :status="inputsError.title" />
                </div>
                <div class="col-span-full">
                    <MainFormTextarea v-model="message" placeholder="پیام شما" icon="IconsTelegram"
                    :status="inputsError.message" />
                </div>
                <div class="col-span-full">
                    <button type="submit" :disabled="disableStatus" @click.prevent="sendMessage()"
                        class="float-left disabled:opacity-80 rounded-full bg-sky-700 disabled:bg-sky-700 hover:bg-sky-800 shadow shadow-sky-700/30 py-2.5 px-10">
                        <IconsSpin v-if="isProcessing" class="h-5" />
                        <span v-else>ارسال پیام</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
</style>