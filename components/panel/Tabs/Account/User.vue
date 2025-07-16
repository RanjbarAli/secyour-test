<script setup>
const userStore = useUserStore()
const runtimeConfig = useRuntimeConfig()

// INPUTS
const avatar = ref(null)
const avatarInput = ref(null)
const name = ref(userStore.info.displayName)
const email = userStore.info.email
const phone = ref(userStore.info.phone)
const code = ref('')


// Status
const emailCountdown = ref(0)
const phoneCountdown = ref(0)
const editProcessing = ref(false)
const emailProcessing = ref(false)
const refreshEmailProcessing = ref(false)
const phoneProcessing = ref(false)
const avatarProcessing = ref(false)
const removeAvatarProcessing = ref(false)
const inputsError = ref({
    name: '',
    phone: userStore.info.isPhoneVerified ? null : '',
})
const codeError = ref('')


// Defaults
const avatarPreview = ref({
    isChanged: !!userStore.info.avatar,
    url: userStore.info.avatar ?? '/images/demo/avatar.jpg'
})


// Computeds
const disableStatus = computed(() => editProcessing.value || refreshEmailProcessing.value || emailProcessing.value || phoneProcessing.value || removeAvatarProcessing.value || avatarProcessing.value)
const submitDisableStatus = computed(() => disableStatus.value || Object.values(inputsError.value).some(i => i != null))


// Watches
watch(emailCountdown, (value) => {
    if (value > 0) setTimeout(() => emailCountdown.value--, 1000);
}, { immediate: true })
watch(phoneCountdown, (value) => {
    if (value > 0) setTimeout(() => phoneCountdown.value--, 1000)
    else code.value = ''
}, { immediate: true })
watch(name, () => inputsError.value.name = validate('نام مستعار', name.value, 'required|min:3|max:40'), { immediate: true })
watch(phone, () => inputsError.value.phone = userStore.info.isPhoneVerified ? null : validate('شماره همراه', phone.value, 'required|phone'), { immediate: true })
watch(code, () => codeError.value = userStore.info.isPhoneVerified ? null : validate('کد ارسال شده', code.value, 'unload|length:6'))


// Functions
const changeAvatar = ({ target }) => {
    if (disableStatus.value) return false
    avatarProcessing.value = true
    let url = target.value;
    let ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    if (target?.files[0] && ['png', 'jpeg', 'jpg'].includes(ext)) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let image = new Image()
            image.src = e.target.result
            image.onload = async () => {
                if (image.width === 150 && image.height === 150) {
                    avatarPreview.value = {
                        isChanged: true,
                        url: e.target.result
                    }
                    avatar.value = target.files[0]
                    let result = await userStore.update({ avatar: target.files[0] }, { 'Content-Type': 'multipart/form-data' })
                    if (result.status == 'ok') useCompactAlertSuccess('avatar-change', 'آواتار با موفقیت تغییر یافت.', { time: 4 })
                    else {
                        avatar.value = null
                        avatarPreview.value = {
                            isChanged: !!userStore.info.avatar,
                            url: userStore.info.avatar ?? '/images/demo/avatar.jpg'
                        }
                        useAlertError('avatar-change', 'خطا در تغییر آواتار', getErrorMessage(error), { time: 6 })
                    }

                } else {
                    useAlertError('avatar-change', 'خطا در تغییر آواتار', 'آواتار باید 150 در 150 باشد.')
                }
            }
            image.onerror = () => {
                useAlertError('avatar-change', 'خطا در تغییر آواتار', 'خطایی در تغییر آواتار رخ داد.')
            }
        }
        reader.readAsDataURL(target.files[0]);
    } else {
        useAlertError('avatar-change', 'خطا در تغییر آواتار', 'فرمت آواتار باید png یا jpeg یا jpg باشد.')
    }
    avatarProcessing.value = false
}
const removeAvatar = async () => {
    if (!avatarPreview.value.isChanged || disableStatus.value) return false
    removeAvatarProcessing.value = true
    await useUserApiFetch().delete(runtimeConfig.public.API_REMOVE_AVATAR).then(() => {
        useCompactAlert('remove-change', 'آواتار با موفقیت حذف شد.', { time: 4 })
        avatarPreview.value = {
            isChanged: false,
            url: '/images/demo/avatar.jpg'
        }
        userStore.refreshProperty('avatar')
        avatarInput.value = null
    }).catch((error) => {
        useAlertError('remove-change', 'خطا در حذف آواتار', getErrorMessage(error), { time: 6 })
    })
    removeAvatarProcessing.value = false
}
const editProfile = async () => {
    if (disableStatus.value) return false
    editProcessing.value = true
    if (Object.values(inputsError.value).some(i => i != null)) {
        useCompactAlertError('edit-profile-request', Object.values(inputsError.value).find(i => i?.length))
    } else {

        let result = await userStore.update({
            displayName: name.value,
            ...(userStore.info.isPhoneVerified ? {} : { phone: phone.value })
        })

        if (result.status == 'ok') {
            useCompactAlertSuccess('edit-profile-request', 'اطلاعات شما با موفقیت تغییر یافت.')
            phoneCountdown.value = 0
        }
        else useCompactAlertError('edit-profile-request', getErrorMessage(error))
    }
    editProcessing.value = false
}
const codeAction = async () => {
    if (disableStatus.value) return false
    phoneProcessing.value = true
    if (phoneCountdown.value > 0) {
        if (codeError.value != null)
            useCompactAlertError('verify-phone-request', codeError.value.length > 0? codeError.value : 'کد ارسالی نباید خالی باشد.')
        else await useUserApiFetch().post(runtimeConfig.public.API_VERIFY_PHONE, {
            code: code.value
        }).then(() => {
            userStore.set({ 'isPhoneVerified': true })
            useCompactAlertSuccess('verify-phone-request', 'شماره موبایل با موفقیت تایید شد.')
            phoneCountdown.value = 0
        }).catch((error) => {
            useCompactAlertError('verify-phone-request', getErrorMessage(error))
        })
    } else {
        await useUserApiFetch().post(runtimeConfig.public.API_SEND_PHONE_VERIFACTION)
            .then(() => phoneCountdown.value = 120)
            .catch((error) => useCompactAlertError('send-phone-verifaction', getErrorMessage(error), { time: 4 }))
    }
    phoneProcessing.value = false
}
const refreshEmailStatus = async () => {
    if (disableStatus.value) return false
    refreshEmailProcessing.value = true
    await userStore.refreshProperty('isEmailVerified')
    if (userStore.info.isEmailVerified) emailCountdown.value = 0
    refreshEmailProcessing.value = false
}
const sendEmailVerifaction = async () => {
    if (disableStatus.value) return false
    emailProcessing.value = true
    await useUserApiFetch().post(runtimeConfig.public.API_SEND_EMAIL_VERIFACTION)
        .then(() => emailCountdown.value = 60)
        .catch((error) => useCompactAlertError('send-email-verifaction', getErrorMessage(error), { time: 4 }))
    emailProcessing.value = false
}
</script>

<template>
    <div class="card mb-5">
        <div
            class="card grid grid-cols-[auto_250px] 2xl:grid-cols-[auto_200px] lg:grid-cols-1 gap-14 2xl:gap-7 lg:gap-5 sm:gap-10">

            <div>
                <div class="card grid grid-cols-2 sm:grid-cols-1 gap-5">

                    <div v-if="!userStore.info.isPhoneVerified"
                        class="col-span-full flex gap-3 items-center mb-5 2xl:justify-stretch flex-wrap rounded-2xl p-4 bg-white xs:p-0 xs:bg-transparent xs:dark:bg-transparent xs:shadow-none dark:bg-gray-700/50 shadow">
                        <div class="text-lg 2xl:w-full font-bold ml-auto">تایید شماره همراه</div>

                        <input placeholder="کد ارسال شده" :disabled="phoneCountdown < 1 || disableStatus" v-model="code" type="tel"
                            :class="['2xl:flex-grow 2xl:flex-shrink xs:w-full disabled:opacity-70 text-sm text-center bg-gray-50 dark:bg-gray-700 px-5 rounded-xl border shadow-sm py-2', codeError && codeError.length ? 'border-red-600/70 shadow-red-600/50' : 'focus:border-blue-500/70 focus:shadow-blue-500/50 border-transparent shadow-gray-400']">

                        <button :disabled="disableStatus || !!(codeError && codeError.length)"
                            @click.prevent="codeAction()"
                            class="xs:w-full disabled:opacity-80 text-white xs:mr-auto rounded-xl bg-blue-600 disabled:bg-blue-700 hover:bg-blue-700 shadow-lg shadow-blue-600/30 py-2.5 px-4">
                            <IconsSpin v-if="phoneProcessing" class="h-5" />
                            <span v-else-if="phoneCountdown > 0">تایید شماره ({{ phoneCountdown }})</span>
                            <span v-else>ارسال کد</span>
                        </button>
                    </div>

                    <div class="col-span-full text-lg font-bold">اطلاعات کاربری</div>

                    <PanelFormControl v-model="email" type="email" dir="ltr" label="ایمیل" disabled="disabled"
                        icon="IconsMail">
                        <div v-if="!userStore.info.isEmailVerified"
                            class="card mt-2 text-xs select-none leading-relaxed">
                            <span v-if="!refreshEmailProcessing">
                                <span v-if="emailCountdown < 1" class="text-red-600 dark:text-red-500 ml-3">ایمیل تان
                                    را هنوز تایید نکرده
                                    اید!</span>
                                <span class="ml-2 text-blue-500 hover:text-blue-600 cursor-pointer whitespace-nowrap">
                                    <span v-if="emailProcessing">( درحال ارسال... )</span>
                                    <span v-else-if="emailCountdown > 0">( {{ emailCountdown }} ثانیه تا ارسال مجدد )</span>
                                    <span v-else @click="sendEmailVerifaction()">( ارسال لینک تایید )</span>
                                </span>
                            </span>
                            <span class="text-blue-500 hover:text-blue-600 cursor-pointer whitespace-nowrap" @click="refreshEmailStatus()">
                                <span v-if="refreshEmailProcessing">( درحال بررسی... )</span>
                                <span v-else>(بررسی)</span>
                            </span>
                        </div>
                    </PanelFormControl>

                    <PanelFormControl v-model="phone" :disabled="userStore.info.isPhoneVerified" type="tel"
                        label="شماره همراه" icon="IconsTelephone" :status="inputsError.phone" />

                    <PanelFormControl v-model="name" type="text" label="نام مستعار" icon="IconsUser"
                        :status="inputsError.name" />

                    <div class="flex justify-end items-end">
                        <button :disabled="submitDisableStatus" @click.prevent="editProfile()"
                            class="xs:w-full w-32 disabled:opacity-80 text-white rounded-full bg-blue-600 disabled:bg-blue-700 hover:bg-blue-700 shadow-lg shadow-blue-600/30 py-2.5 px-4">
                            <IconsSpin v-if="editProcessing" class="h-4.5" />
                            <span v-else>ذخیره تغییرات</span>
                        </button>
                    </div>

                </div>
            </div>

            <div class="lg:-order-1">
                <div
                    class="card lg:max-w-52 lg:mx-auto lg:float-none lg:p-0 lg:bg-transparent bg-white dark:bg-gray-700/50 shadow p-4 rounded-xl">
                    <input @change="changeAvatar" id="profile-avatar" type="file" ref="avatarInput"
                        accept="image/png,image/jpeg,image/jpg" class="hidden">
                    <img :src="avatarPreview.url" alt="" class="card rounded-md mb-3" />
                    <div class="card flex items-center justify-between">
                        <button type="button" :disabled="disableStatus"
                            class="bg-blue-600 disabled:opacity-70 text-white hover:bg-blue-700 py-1.5 px-3 rounded-xl"
                            onclick="document.getElementById('profile-avatar').click()">
                            <IconsSpin v-if="avatarProcessing" class="h-3" />
                            <IconsUpload v-if="!avatarProcessing" class="h-3 ml-2" />
                            <span v-if="!avatarProcessing">تغییر آواتار</span>
                        </button>
                        <component :is="removeAvatarProcessing? 'IconsSpin' : 'IconsTrash'" v-if="avatarPreview.isChanged" @click="removeAvatar()"
                            :class="['h-4 float-left', removeAvatarProcessing? 'text-gray-500' : 'cursor-pointer hover:text-red-600 dark:hover:text-red-500']" />
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped></style>