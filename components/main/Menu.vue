<script setup>

const userStore = useUserStore()

const route = useRoute()
</script>

<template>
    <nav class="card relative z-998 sm:py-3 sm:bg-main-gray-900 sm:mb-[32px] sm:sticky sm:top-0 sm:right-0 py-7">
        <div class="container grid items-center gap-1 grid-cols-1-auto-1 lg:grid-cols-auto-auto lg:gap-y-5 sm:grid-cols-1-auto-1">
            <ul class="flex gap-8 drop-shadow-sm xl:gap-6">
                <li @click="useEvent('sidebar-menu')" id="toggle-sidebar" class="hidden sm:block">
                    <IconsList class="w-7 text-white" />
                </li>
                <li class="menu-link">
                    <NuxtLink to="/">صفحه اول</NuxtLink>
                </li>
                <li class="menu-link">
                    <NuxtLink to="/about-us">درباره ما</NuxtLink>
                </li>
                <li class="menu-link always-show">
                    <NuxtLink to="/#plans">پلن ها</NuxtLink>
                </li>
                <li class="menu-link">
                    <NuxtLink to="/references">منابع</NuxtLink>
                </li>
                <li class="menu-link">
                    <NuxtLink to="/contact">ارتباط با ما</NuxtLink>
                </li>
            </ul>
            <NuxtLink to="/" id="logo" class="lg:col-span-full lg:-order-1 sm:order-none sm:col-span-1">
                <InlineLogo class="block mx-auto drop-shadow-sm" />
            </NuxtLink>
            <div class="flex gap-3 items-center justify-end">
                <NuxtLink to="/contact" class="btn-bg sm:!bg-none sm:p-0 rounded-xl py-2 px-2 items-center flex gap-2">
                    <IconsHeadphone class="w-4 sm:w-6 m-px sm:m-0" />
                </NuxtLink>
                <NuxtLink v-if="!userStore.isLoggedIn && route.name != 'login'" to="/login"
                    class="sm:hidden btn-bg rounded-xl py-1.5 px-4 items-center flex gap-2">
                    <span class="text-sm mt-0.5">ورود</span>
                </NuxtLink>
                <NuxtLink v-if="!userStore.isLoggedIn && route.name != 'register'" to="/register"
                    class="sm:hidden bg-gradient-to-r to-sky-800/30 from-sky-800 hover:bg-sky-800/50 rounded-xl py-1.5 px-3 items-center flex gap-2">
                    <span class="text-sm mt-0.5">ایجاد حساب</span>
                    <IconsArrowLeft class="h-2" />
                </NuxtLink>
                <NuxtLink v-if="userStore.isLoggedIn" to="/panel"
                    class="sm:hidden btn-bg rounded-xl py-1.25 px-3 items-center flex gap-2">
                    <span class="text-sm mt-0.5">حساب کاربری</span>
                    <IconsArrowLeft class="h-2" />
                </NuxtLink>
            </div>
        </div>
    </nav>
</template>

<style lang="postcss" scoped>
.menu-link {
    @apply sm:hidden hover:text-main-gray-100
}
.menu-link:not(.always-show):has(.router-link-exact-active) {
    @apply hidden
}
.btn-bg {
    @apply bg-gradient-to-r to-white/5 from-white/10 hover:bg-white/10
}
</style>