<script setup>
const userStore = useUserStore()
const props = defineProps(['links', 'isOpen'])
const emit = defineEmits(['update:modelValue'])
const closeMenu = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <div class="sidebar-menu-wrapper">
    <ul>
      <li v-for="link in links" :key="link.to">
        <NuxtLink :to="link.to" @click="closeMenu">{{ link.title }}</NuxtLink>
      </li>
      <li>
        <NuxtLink :to="userStore.isLoggedIn? '/panel' : '/login'" @click="closeMenu">حساب کاربری</NuxtLink>
      </li>
      <li class="border border-white/10 rounded-full p-2 cursor-pointer" @click="closeMenu">
        <IconsX class="float-end h-6" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.sidebar-menu-wrapper {
    background-color: #1E1E1E;
    @apply transition duration-500 pointer-events-none opacity-0 fixed top-0 size-full z-999 md:hidden shadow-lg;

    ul {
      @apply flex flex-col gap-6 items-center justify-center h-full text-lg;

      li {
        @apply opacity-0;
      }
    }

    &.is-open {
      ul li {
        @apply opacity-100 transition duration-1000;
      }
    }

    &.is-open {
      @apply opacity-100 translate-x-0 pointer-events-auto;
      ul {
        li:nth-child(1) {
          @apply delay-75;
        }

        li:nth-child(2) {
          @apply delay-150;
        }

        li:nth-child(3) {
          @apply delay-225;
        }

        li:nth-child(4) {
          @apply delay-300;
        }

        li:nth-child(5) {
          @apply delay-375;
        }

        li:nth-child(6) {
          @apply delay-450;
      }
    }
  }
}

html[dir="rtl"] .sidebar-menu-wrapper {
  right: 0;
  
  &:not(.is-open) {
    @apply opacity-0 translate-x-full;
  }
}

</style>