<script setup>
const userStore = useUserStore()
const props = defineProps(['links', 'isOpen'])
const emit = defineEmits(['update:modelValue'])
const closeMenu = () => {
  emit('update:modelValue', false)
}


const openedDropDown = ref(null)
const toggleDropDown = (ind) => openedDropDown.value = ind == openedDropDown.value ? null : ind
const closeDropDown = () => {
    if (openedDropDown.value) openedDropDown.value = null
}
</script>

<template>
  <div class="sidebar-menu-wrapper">
    <ul>

      <li class="menu-link card" v-for="(link, ind) in links" :key="ind" v-click-outside="closeDropDown">
        
        <div v-if="link?.children?.length" class="card" @click.stop="toggleDropDown(ind)">
          <div class="toggle-dropdown">
            <component v-if="link?.icon" :is="link.icon" class="h-3.5" />
            <span>{{ link.title }}</span>
            <IconsArrowDown :class="['w-2 mt-1 opacity-50 transition-transform', { 'rotate-180': openedDropDown == ind }]" />
          </div>
          <div class="dropdown" v-if="openedDropDown == ind">
              <NuxtLink v-for="(sub, indx) in link.children" :key="indx" :to="sub.link" class="">{{ sub.title }}</NuxtLink>
          </div>
        </div>
        <NuxtLink :to="link.to" v-else>
            <component v-if="link?.icon" :is="link.icon" class="h-3.5" />
            <span>{{ link.title }}</span>
        </NuxtLink>

      </li>
      <li v-if="userStore.isLoggedIn" class="menu-link card" @click="logout">خروج از حساب</li>
      <li class="border border-white/10 rounded-full p-3 mt-auto cursor-pointer" @click="closeMenu">
        <IconsX class="float-end size-4" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.sidebar-menu-wrapper {
    background-color: #1E1E1E;
    @apply transition duration-500 pointer-events-none opacity-0 flex justify-center items-center fixed top-0 size-full z-999 md:hidden shadow-lg text-center;

    ul {
      @apply w-full flex flex-col gap-5 items-center text-lg shrink-0 h-full relative  overflow-auto py-5;

      li {
        @apply opacity-0;
      }
    }

    &.is-open {
      @apply opacity-100 translate-x-0 pointer-events-auto;
      ul {
        li {
          @apply opacity-100 transition duration-1000 cursor-pointer;
          &.menu-link {
            & > a, .toggle-dropdown {
              @apply w-full float-right flex items-center justify-center gap-2;
            }
            .dropdown {
              @apply float-right w-full flex flex-col items-center gap-3 mt-2 text-base bg-primary-dark p-3;
            }
          }
        }
        li:nth-child(1) {
          @apply delay-75 mt-auto;
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
</style>