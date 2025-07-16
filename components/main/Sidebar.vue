<script setup>

const userStore = useUserStore()

let isOpen = ref(false)

useListen('sidebar-menu', function () {
    isOpen.value = !isOpen.value
})

function closeSidebar(event) {
    if (isOpen.value && !document.getElementById('toggle-sidebar').contains(event.target)) isOpen.value = false
}
</script>

<template>
    <aside v-click-outside="closeSidebar"
        :class="['fixed w-full !transition-none h-screen top-0 bg-main-gray-900 right-0 z-999 overflow-hidden', isOpen ? 'hidden sm:block min-h-20 max-h-screen' : 'max-h-0 pointer-events-none']">
        <div class="relative card h-screen flex flex-col p-5">
            <IconsClose @click="closeSidebar" class="w-4 mb-auto mr-auto" />
            <ul class="card flex flex-col gap-5 mb-auto">
                <li>
                    <NuxtLink to="/" @click="isOpen = false">
                        <IconsHome class="w-5 ml-3" /> صفحه اصلی
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink :to="userStore.isLoggedIn ? '/panel' : '/login'" @click="isOpen = false">
                        <IconsUser class="w-5 ml-3" /> {{ userStore.isLoggedIn ? 'حساب کاربری' : 'ورود / ثبت نام' }}
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/about-us" @click="isOpen = false">
                        <IconsInfo class="w-5 ml-3" /> درباره ما
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/#plans" @click="isOpen = false">
                        <IconsPrices class="w-5 ml-3" /> پلن ها
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/references" @click="isOpen = false">
                        <IconsFaq class="w-5 ml-3" /> منابع
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/contact" @click="isOpen = false">
                        <IconsTelephone class="w-5 ml-3" /> ارتباط با ما
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/contact" @click="isOpen = false">
                        <IconsHeadphone class="w-5 ml-3 !text-[#C02A2A]" /> مشاوره اورژانسی
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </aside>
</template>

<style lang="postcss" scoped>
li svg {
    @apply text-main-gray-100
}
li:hover svg {
    @apply !text-white
}
</style>