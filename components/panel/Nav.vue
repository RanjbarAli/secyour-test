<script setup>
const search = ref('')
const searchResults = computed(() => [
{
    icon: 'IconsListSquare',
    title: 'داشبورد',
    link: '/panel/'
  }, {
    icon: 'IconsBell',
    title: 'اطلاعیه ها',
    link: '/panel/notifications'
  }, {
    icon: 'IconsEqualizer',
    title: 'سایت های تحت نظارت',
    link: '/panel/monitored'
  }, {
    icon: 'IconsSearchBug',
    title: 'اسکن جدید',
    link: '/panel/scan'
  }, {
    icon: 'IconsTicket',
    title: 'تیکت ها',
    link: '/panel/tickets'
  }, {
    icon: 'IconsMessagePlus',
    title: 'تیکت جدید',
    link: '/panel/tickets/new'
  }, {
    icon: 'IconsCog',
    title: 'حساب کاربری',
    link: '/panel/account'
  }, {
    icon: 'IconsCog',
    title: 'حساب کاربری / مشخصات کاربری',
    link: '/panel/account#user'
  }, {
    icon: 'IconsCog',
    title: 'حساب کاربری / ایمیل های سازمانی',
    link: '/panel/account#emails'
  }, {
    icon: 'IconsCog',
    title: 'حساب کاربری / اعلان ها',
    link: '/panel/account#notifications'
  }, {
    icon: 'IconsCog',
    title: 'حساب کاربری / رمزعبور و امنیت',
    link: '/panel/account#security'
  }, {
    icon: 'IconsCog',
    title: 'حساب کاربری / کیف پول / اشتراک',
    link: '/panel/account#subscription'
  }
].filter(i => i.title.includes(search.value)))
let isSearchOpen = ref(false)
const closeSearch = () => isSearchOpen.value = false

const notificationCount = ref(0)

const runtimeConfig = useRuntimeConfig()
onMounted(() => {
  useUserApiFetch().get(runtimeConfig.public.API_PANEL_NAV_DETAILS).then(({ data }) => {
    notificationCount.value = data.notifications
  }).catch((error) => {
    useCompactAlertError('get-nav-details', getErrorMessage(error))
  })
})

let isProfileDropDownOpen = ref(false)

const userStore = useUserStore()

const changeNavigate = async (to, ...arg) => {
  isProfileDropDownOpen.value = false
  return await navigateTo(to, ...arg)
}

const logout = async () => {
  await userStore.logout()
  return navigateTo('/')
}
const toggleSideBar = () => useEvent('toggle-panel-sidebar')
</script>

<template>
  <div
    class="card md:sticky top-0 z-998 dark:text-gray-200 flex xs:flex-wrap xs:justify-center gap-2 py-3 px-5 items-center justify-end head bg-white shadow-lg shadow-gray-200/40 md:shadow-gray-300/40 dark:bg-[#19222c] dark:shadow-gray-900/30 dark:md:shadow-gray-600/30">
    <IconsList @click="toggleSideBar" class="h-7 ml-2 hidden md:block xs:ml-auto" />
    <div class="ml-auto relative xs:hidden" v-click-outside="closeSearch">
      <input v-model.trim="search" @focus="isSearchOpen = true" autocomplete="off" type="text"
        class="py-2 pl-3 pr-12 rounded-xl bg-gray-100 dark:bg-gray-700 w-72 xs:w-full" placeholder="جستجو در پنل ...">
      <IconsSearch class="h-5 pointer-events-none absolute top-1/2 -translate-y-1/2 right-3" />
      <div v-if="isSearchOpen && search.length"
        class="w-full grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-600 bg-gray-100 dark:bg-gray-700 overflow-hidden absolute top-full mt-1 rounded shadow-lg z-20">
        <NuxtLink v-if="searchResults.length" v-for="(item, index) in searchResults" :to="item.link" :key="index"
          @click="search = ''; isSearchOpen = false"
          class="flex gap-3 p-1.5 items-center hover:bg-gray-200 dark:hover:bg-gray-600 group">
          <div
            class="w-7 h-7 bg-gray-200 group-hover:bg-gray-300 dark:group-hover:bg-gray-700 dark:bg-gray-800 rounded-full grid place-content-center">
            <component :is="item.icon" class="h-3.5" />
          </div>
          <span class="truncate text-sm">{{ item.title }}</span>
        </NuxtLink>
        <div v-else class="p-7 text-center text-sm">هیچ نتیجه ای پیدا نشد!</div>
      </div>
    </div>
    <NuxtLink to="/panel/notifications" @click="notificationCount = 0" class="icon-link">
      <div class="relative">
        <IconsBell class="h-5" />
        <span v-if="notificationCount"
          class="bg-red-600 pt-1 px-1 rounded-full text-white absolute -top-1.5 -right-2 block leading-3 text-sm">{{
      notificationCount }}</span>
      </div>
    </NuxtLink>
    <NuxtLink to="/faqs" target="_blank" class="icon-link">
      <IconsQuestion class="h-5" />
    </NuxtLink>
    <div class="relative select-none" v-click-outside="(() => isProfileDropDownOpen = false)">
      <div
        :class="{ 'transition-all min-w-[230px] lg:mr-3 lg:min-w-0 flex gap-3 relative items-center cursor-pointer z-30 lg:z-10 px-3 lg:px-0 top-0': true, 'top-3 lg:top-0': isProfileDropDownOpen }"
        @click="isProfileDropDownOpen = !isProfileDropDownOpen">
        <img :src="userStore.info.avatar" class="w-8 h-8 rounded-full" alt="" />
        <div class="flex flex-col gap-0.5 lg:hidden">
          <span class="text-sm truncate" style="max-width:17ch">{{ userStore.info.displayName }}</span>
          <span class="text-xs text-gray-500 dark:text-gray-400 truncate" dir="ltr" style="max-width:20ch">{{
      userStore.info.email }}</span>
        </div>
        <IconsArrowDown :class="{ 'w-2.5 lg:hidden mr-auto': true, 'x-flip': isProfileDropDownOpen }" />
      </div>
      <div
        :class="['z-20 dark:bg-gray-700 lg:min-w-[230px] text-sm absolute left-0 top-1 lg:top-0 overflow-hidden rounded-lg w-full bg-white drop-shadow dark:shadow-black shadow-2xl', isProfileDropDownOpen ? 'max-h-80 pt-[55px] lg:pt-0' : 'max-h-[55px] opacity-0 lg:hidden']">
        <div class="gap-3 items-center px-3 py-2 hidden lg:flex cursor-pointer"
          @click="isProfileDropDownOpen = !isProfileDropDownOpen">
          <img :src="userStore.info.avatar" class="w-8 h-8 rounded-full" alt="" />
          <div class="flex flex-col gap-0.5">
            <span class="text-sm truncate" style="max-width:17ch">{{ userStore.info.displayName }}</span>
            <span class="text-xs text-gray-500 dark:text-gray-400 truncate" dir="ltr" style="max-width:20ch">{{
      userStore.info.email }}</span>
          </div>
          <IconsArrowDown class="w-2.5 mr-auto x-flip" />
        </div>
        <div class="card p-2 text-center border-y border-gray-100 dark:border-gray-600">موجودی: <strong class="mr-1">{{
      useNumberFormat(userStore.info.money) }}</strong> تومان</div>
        <div class="card p-2 grid grid-cols-2 gap-2">
          <button
            class="flex flex-col gap-1 text-xs py-1.5 px-1.5 rounded border border-blue-400 dark:border-blue-300 hover:bg-blue-600 text-blue-600 dark:text-blue-200 hover:text-white hover:!border-blue-600"
            @click="changeNavigate('/panel/account#subscription')">
            <IconsWallet class="h-4" />
            <span>افزایش موجودی</span>
          </button>
          <button
            class="flex flex-col gap-1 text-xs py-1.5 px-1.5 rounded border border-purple-400 dark:border-purple-300 hover:bg-purple-600 text-purple-600 dark:text-purple-200 hover:text-white hover:!border-purple-600"
            @click="changeNavigate('/panel/account#subscription')">
            <IconsPremium class="h-4" />
            <span>{{ userStore.info.type == 'free' ? 'خرید اشتراک' : 'تمدید اشتراک' }}</span>
          </button>
        </div>
        <div class="card grid grid-cols-[auto_1fr_1fr] border-t border-gray-100 dark:border-gray-600">
          <div @click="changeNavigate('/panel/account#security')"
            class="cursor-pointer p-2 pl-5 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/5">
            <IconsKey class="h-3.5 text-[#3390ec]" />
            <span>تغییر رمز عبور</span>
          </div>
          <div @click="changeNavigate('/panel/account')"
            class="cursor-pointer border-r border-gray-100 dark:border-gray-600 grid place-items-center hover:bg-gray-100 dark:hover:bg-white/5">
            <IconsUserOutline class="h-3.5 text-[#3390ec]" />
          </div>
          <div @click="logout()"
            class="cursor-pointer border-r border-gray-100 dark:border-gray-600 grid place-items-center hover:bg-gray-100 text-red-600 dark:text-red-400 dark:hover:bg-white/5">
            <IconsExit class="h-3.5 y-flip" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.icon-link {
  @apply h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 grid place-items-center
}

.icon-link.router-link-exact-active, .dropdown-link.router-link-exact-active {
  @apply bg-gray-100 dark:bg-white/10
}
</style>