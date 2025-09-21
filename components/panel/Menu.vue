<script setup>
const userStore = useUserStore()
const route = useRoute()

const isScrolled = ref(false);
const isMenuOpen = ref(false)
const openedDropDown = ref(null)
const isSettingOpen = ref(false)
const closeSetting = () => isSettingOpen.value = false
let hoverBg = ref(null)
const openDropDown = (ind) => openedDropDown.value = ind == openedDropDown.value ? null : ind
const closeDropDown = () => {
    if (openedDropDown.value) openedDropDown.value = null
}
const menuLinks = [
    { title: useTrans('dashboard'), to: '/panel', icon: resolveComponent('IconsHome'), children: [] },
    {
        title: useTrans('scan'), icon: resolveComponent('IconsSearchBug'), children: [
            { title: useTrans('site-scan'), to: '/panel/scans/new-site' },
            { title: useTrans('source-scan'), to: '/panel/scans/new-source' },
            { title: useTrans('monitored-sites'), to: '/panel/scans/monitored' },
            { title: useTrans('scans-list'), to: '/panel/scans' },
        ]
    },
    {
        title: useTrans('support'), icon: resolveComponent('IconsHeadphone'), children: [
            { title: useTrans('new-ticket'), to: '/panel/tickets/new-ticket' },
            { title: useTrans('tickets'), to: '/panel/tickets' },
        ]
    },
    {
        title: useTrans('account'), icon: resolveComponent('IconsUser'), children: [
            { title: useTrans('verify-account'), to: '/panel/account/verify' },
            { title: useTrans('increase-balance'), to: '/panel/account/wallet' },
            { title: useTrans('change-password'), to: '/panel/account/password' },
        ]
    }
]


if (process.client) {
    onMounted(() => {
    const onScroll = () => {
      isScrolled.value = window.scrollY > 5;
    };
    onScroll();
    window.addEventListener('scroll', onScroll);

    const hoverHandlers = [];
    const setHoverBg = (item) => {
      hoverBg.value.style.width = `${item.clientWidth}px`;
      hoverBg.value.style.left = `${item.offsetLeft}px`;
    };

    document.querySelectorAll('.menu-link.exact-link').forEach(item => {
      const handler = () => setHoverBg(item);
      item.addEventListener('mouseenter', handler);
      hoverHandlers.push(() => item.removeEventListener('mouseenter', handler));
    });

    const leaveHandler = () => {
      if (openedDropDown.value) {
        const items = document.querySelectorAll('.menu-link.exact-link');
        setHoverBg(items[openedDropDown.value]);
      }
    };
    const actionList = document.querySelector('.action-list');
    actionList?.addEventListener('mouseleave', leaveHandler);

    onUnmounted(() => {
      window.removeEventListener('scroll', onScroll);
      hoverHandlers.forEach(fn => fn());
      actionList?.removeEventListener('mouseleave', leaveHandler);
    });
  });
}
</script>

<template>
    <nav :class="['card menu-wrapper', isScrolled ? 'scrolled' : 'not-scrolled']">
        <div class="container">
            <NuxtLink to="/" class="md:glass rounded-full p-2 flex items-center gap-3">
                <img src="/images/logo.png" alt="logo" class="size-7">
                <h1 class="md:hidden text-lg font-bold">{{ useTrans('site-name') }}</h1>
            </NuxtLink>
            <ul class="action-list max-md:-order-1 glass rounded-3xl relative group ml-auto">
                <div :class="['h-11 glass absolute -z-1 rounded-3xl box-content transition-all md:group-hover:opacity-100', openedDropDown ? 'md:opacity-100' : 'opacity-0']"
                    ref="hoverBg"></div>
                <li class="menu-link md:hidden size-11 flex items-center justify-center"
                    @click.prevent="isMenuOpen = !isMenuOpen">
                    <IconsList class="size-6" />
                </li>
                <li class="menu-link exact-link max-md:hidden" v-for="(link, ind) in menuLinks">
                    <div v-if="link.children.length" class="relative" @click.stop="openDropDown(ind)"
                        v-click-outside="closeDropDown">
                        <component :is="link.icon" class="h-3.5" />
                        <span>{{ link.title }}</span>
                        <IconsArrowDown
                            :class="['w-2 mt-1 opacity-50 transition-transform', { 'rotate-180': openedDropDown == ind }]" />
                        <Transition class="transition-all duration-300" enter-from-class="opacity-0 translate-y-5"
                            enter-to-class="opacity-100 translate-y-0" leave-from-class="opacity-100 translate-y-0"
                            leave-to-class="opacity-0 translate-y-5">
                            <div class="absolute top-full right-0 mt-2 glass rounded-2xl overflow-hidden divide-y text-primary-heavy-light divide-white/5"
                                v-if="openedDropDown == ind">
                                <NuxtLink v-for="sub in link.children" :to="sub.link"
                                    class="hover:glass transition-all card px-2.5 hover:text-white py-1.5 whitespace-nowrap">
                                    {{ sub.title }}</NuxtLink>
                            </div>
                        </Transition>
                    </div>
                    <NuxtLink :to="link.to" v-else>
                        <component :is="link.icon" class="h-3.5" />
                        <span>{{ link.title }}</span>
                    </NuxtLink>
                </li>
            </ul>
            <NuxtLink to="/panel/account/wallet" class="glass rounded-full py-2 px-4 hover:bg-white/5 h-11 max-lg:hidden">10,000,000
                <small>تومان</small></NuxtLink>
            <NuxtLink to="/panel/notifications"
                class="glass rounded-full size-11 max-md:mr-auto hover:bg-white/5 flex items-center justify-center">
                <IconsBell class="size-5" />
            </NuxtLink>
            <div :class="['glass rounded-full max-md:hidden cursor-pointer size-11 hover:bg-white/5 flex items-center justify-center relative', {'bg-white/5': isSettingOpen}]" @click="isSettingOpen = !isSettingOpen">
                <IconsExit class="size-5 rotate-y-180" />
            </div>
            
        </div>
    </nav>
    <ClientOnly>
        <Teleport to="body">
            <SidebarMenu :links="menuLinks" v-model="isMenuOpen" :class="{ 'is-open': isMenuOpen }" />
        </Teleport>
    </ClientOnly>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.menu-wrapper {
    @apply fixed top-0 right-0 z-998 max-md:backdrop-blur-md max-md:bg-white/5 max-md:shadow-lg will-change-auto transform-gpu;

    &.scrolled {
        @apply backdrop-blur-lg bg-white/5 shadow-lg shadow-slate-700/10;

        .container {
            @apply py-2;
        }
    }

    .container {
        @apply py-7 max-md:py-2 flex items-center gap-3 transition-all duration-150;
    }

    .router-link-exact-active {
        @apply text-blue-200;
    }

    .action-list {
        @apply flex items-center;
    }

    .menu-link>div, .menu-link>a {
        @apply flex items-center h-11 px-5 gap-2 align-middle cursor-pointer;

    }
}
</style>