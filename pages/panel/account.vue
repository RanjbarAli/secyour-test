<script setup>
definePageMeta({
  layout: 'panel'
})
const route = useRoute()
const router = useRouter()
const tab = computed(() => ['#emails', '#notifications', '#security', '#subscription'].includes(route.hash)? route.hash.substring(1) : 'user')

const tabResolves = shallowRef({
        'emails' : resolveComponent('PanelTabsAccountEmails'),
        'notifications' : resolveComponent('PanelTabsAccountNotifications'),
        'security' : resolveComponent('PanelTabsAccountSecuirty'),
        'subscription' : resolveComponent('PanelTabsAccountSubscription'),
        'user': resolveComponent('PanelTabsAccountUser')
    })

const tabCompunent = computed(() => tabResolves.value[tab.value])
</script>

<template>
    <div class="card">
        <div class="card xs:flex xs:justify-center">
            <h1 class="page-title">حساب کاربری</h1>
        </div>

        <div class="card flex items-end text-center border-b-2 xs:flex-col ml:gap-1 ml:items-stretch border-gray-200 ml:flex-wrap ml:border-0 dark:border-gray-500 mt-8 mb-10">
            <div @click="router.replace({hash: '#user'})" :class="{'tab' : true, 'active' : tab == 'user'}">مشخصات کاربری</div>
            <div @click="router.replace({hash: '#emails'})" :class="{'tab' : true, 'active' : tab == 'emails'}">ایمیل های سازمانی</div>
            <div @click="router.replace({hash: '#notifications'})" :class="{'tab' : true, 'active' : tab == 'notifications'}">اعلان ها</div>
            <div @click="router.replace({hash: '#security'})" :class="{'tab' : true, 'active' : tab == 'security'}">رمز عبور و امنیت</div>
            <div @click="router.replace({hash: '#subscription'})" :class="{'tab' : true, 'active' : tab == 'subscription'}">کیف پول / اشتراک</div>
        </div>

        <component class="card component-tab" :id="tab" :is="tabCompunent" />

    </div>
</template>

<style lang="postcss" scoped>
.component-tab {
    scroll-margin-top: 50px;
}
.tab {
    @apply py-2 px-4 bg-gray-50 dark:bg-gray-800 ml:rounded-lg ml:border -mb-0.5 ml:mb-0 ml:px-4 xl:flex-grow xl:px-2 border border-gray-100 dark:border-gray-700 ml:border-gray-200 dark:ml:border-gray-700 border-b-2 border-b-gray-200 dark:border-b-gray-600 cursor-pointer
}
.tab:hover {
    @apply bg-white dark:bg-gray-700
}
.tab.active {
    @apply border-b-blue-600 bg-white dark:bg-gray-700 ml:border-blue-600 sm:text-blue-600 dark:sm:border-blue-300 dark:sm:text-blue-300
}
</style>