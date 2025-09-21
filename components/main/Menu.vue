<script setup>
const userStore = useUserStore()
const route = useRoute()

const isScrolled = ref(false);
const isMenuOpen = ref(false)
if (process.client) {
    isScrolled.value = window.scrollY > 5;
    onMounted(() => {
        window.addEventListener('scroll', () => {
            isScrolled.value = window.scrollY > 5;
        });
    });
    onUnmounted(() => {
        window.removeEventListener('scroll', () => {
            isScrolled.value = window.scrollY > 5;
        });
    });
}
const menuLinks = [
    { title: useTrans('home'), to: '/' },
    { title: useTrans('about'), to: '/about' },
    { title: useTrans('terms'), to: '/terms' },
    { title: useTrans('contact'), to: '/contact' }
]
</script>

<template>
    <nav :class="['card menu-wrapper', isScrolled ? 'scrolled' : 'not-scrolled']">
        <div class="container">
            <NuxtLink to="/" class="flex items-center gap-2 drop-shadow-md">
                <img src="/images/logo.png" alt="logo">
                <span class="text-2xl font-bold uppercase leading-7 text-white mt-1">{{ useTrans('site-name') }}</span>
            </NuxtLink>
            <ul class="action-list gap-8 max-lg:gap-5 max-md:-order-1">
                <li class="menu-link md:hidden">
                    <IconsList class="h-6 float-start" @click.prevent="isMenuOpen = !isMenuOpen" />
                </li>
                <li class="menu-link max-md:hidden" v-for="link in menuLinks">
                    <NuxtLink :to="link.to">{{ link.title }}</NuxtLink>
                </li>
            </ul>
            <div class="action-list gap-3 justify-end">
                <NuxtLink v-if="route.name != 'auth'" :to="userStore.isLoggedIn? '/panel' : '/auth'" class="btn btn-blue max-md:!hidden">
                    <span class="text-sm">{{ useTrans('account') }}</span>
                    <IconsArrowLeft class="h-2.5" />
                </NuxtLink>
                <NuxtLink :to="userStore.isLoggedIn? '/panel' : '/auth'" class="md:hidden">
                    <IconsUser class="float-start h-6" />
                </NuxtLink>
            </div>
        </div>
    </nav>
    <ClientOnly>
        <Teleport to="body">
            <SidebarMenu :links="[...menuLinks, { title: useTrans('account'), to: '/panel' }]" v-model="isMenuOpen" :class="{'is-open': isMenuOpen}" />
        </Teleport>
    </ClientOnly>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.menu-wrapper {
    @apply fixed top-0 right-0 z-998 max-md:backdrop-blur-md max-md:bg-white/5 max-md:shadow-lg will-change-auto transform-gpu;
    &.scrolled {
        @apply backdrop-blur-lg bg-white/10 shadow-lg shadow-slate-700/10;
        .container {
            @apply py-3;
        }
    }
    .container {
        @apply py-7 max-md:py-3 grid grid-cols-(--1fr-auto-1fr) gap-3 transition-all duration-150;
    }
    .router-link-exact-active {
        @apply text-blue-200;
    }
    .action-list {
        @apply flex items-center;
    }
    .menu-link a:hover {
        @apply text-blue-100;
    }
}

</style>