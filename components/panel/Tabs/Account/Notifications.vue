<template>
    <div class="grid grid-cols-3 2xl:grid-cols-2 ml:grid-cols-1 gap-5">
        <div class="group-name">ایمیل</div>
        <div class="item">
            <span>گزارش ورود</span>
            <PanelFormCheckbox v-model="form.email.loginReport" />
        </div>
        <div class="item">
            <span>گزارش هر اسکن</span>
            <PanelFormCheckbox v-model="form.email.scanResult" />
        </div>
        <div class="item">
            <span>تغییر وضعیت تیکت ها</span>
            <PanelFormCheckbox v-model="form.email.ticketStatusChange" />
        </div>
        <div class="item">
            <span>تغییر موجودی کیف پول</span>
            <PanelFormCheckbox v-model="form.email.walletChange" />
        </div>

        <div class="group-name">پیامک</div>
        <div class="item">
            <span>تغییر وضعیت تیکت ها</span>
            <PanelFormCheckbox v-model="form.sms.ticketStatusChange" />
        </div>
        <div class="item">
            <span>تغییر موجودی کیف پول</span>
            <PanelFormCheckbox v-model="form.sms.walletChange" />
        </div>
        <div class="col-span-full flex items-center justify-between mt-10">
            <button @click.prevent="reset()"
                class="mb-1 bg-white dark:bg-gray-700 opacity-80 hover:opacity-100 hover:shadow-md rounded-lg shadow text-md py-2 px-4 flex items-center gap-2">
                حالت پیش فرض
            </button>
            <button type="button" @click.prevent="saveChanges()"
                class="mr-auto mb-1  rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30 py-2 px-4 text-md flex items-center gap-2">
                <IconsSpin v-if="isProcessing" class="h-5" />
                <IconsSave v-else class="h-3.5 mb-1" /> <span v-if="!isProcessing" >ذخیره</span>
            </button>
        </div>
    </div>
</template>

<script setup>
const userStore = useUserStore()
const form = ref({ ...userStore.info.notifications })
const reset = () => form.value = { ...userStore.defaultUserObject().notifications }
const isProcessing = ref(false)
const saveChanges = async () => {
    if (isProcessing.value) return false
    isProcessing.value = true
    let result = await userStore.update({ notifications: form })
    if (result.status == 'ok') useCompactAlertSuccess('account-notifications-update', 'اعلانات با موفقیت بروزرسانی شد.', { time: 5 })
    else useCompactAlertError('account-notifications-update', result.message, { time: 7 })
    isProcessing.value = false
}
</script>

<style lang="postcss" scoped>
.group-name {
    @apply col-span-full text-lg font-bold
}
div > .group-name:not(:first-child) {
    @apply mt-5 -mb-2
}
.item {
    @apply flex items-center justify-between bg-white dark:bg-gray-700 px-4 py-3 shadow-md rounded-lg
}
</style>