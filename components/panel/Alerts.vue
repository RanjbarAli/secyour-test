<script setup>
const userStore = useUserStore()
const route = useRoute()
</script>

<template>
  <div class="card mb-5">
    <div v-if="!userStore.info.isPhoneVerified && route.name != 'panel-account'" id="phone-number-verify" class="card dark:bg-gray-700 relative mb-4 text-sm gap-3 border-r-2 xs:border-r-0 xs:border-t-2 border-blue-500 bg-white shadow py-3 px-5 flex xs:flex-col xs:text-center items-center justify-between">
      <IconsMessageVerify class="h-4 text-blue-500" />
      <span class="mt-0.5 ml-auto xs:ml-0">لطفا شماره موبایل خود را تایید کنید</span>
      <NuxtLink to="/panel/account" class="py-1 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">تایید شماره</NuxtLink>
      <IconsClose class="h-3 mr-3 xs:absolute xs:top-2 xs:left-2 text-gray-400 hover:text-gray-600" onclick="document.getElementById('phone-number-verify')?.remove()" />
    </div>
  </div>
</template>

<style scoped>

</style>