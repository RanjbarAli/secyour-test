<template>
  <div class="layout auth-layout card min-h-screen relative flex items-center flex-col justify-center gap-8 p-3">
    <div class="layout-blurs"></div>
    <NuxtPage />
    <ul class="nav-links flex gap-5 flex-wrap text-slate-dark justify-center text-sm">
      <li>
        <NuxtLink to="/">صفحه اصلی</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/terms">قوانین و مقررات</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/contact">ارتباط با ما</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@reference "~/assets/css/main.css";
.nav-links a:hover {
  @apply text-slate-200;
}
</style>