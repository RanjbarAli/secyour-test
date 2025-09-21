<template>
  <div class="card py-32 text-center flex flex-col items-center gap-5">
    <span class="bg-white/10 px-3 rounded-lg py-1 text-white">تیم پشتیبانی سکیور</span>
    <h3 class="font-bold text-3xl max-sm:text-2xl max-xs:text-xl">شبانه روز پاسخگوی شما هستیم!</h3>
    <p class="leading-relaxed max-w-200 text-slate-300">کارشناسان سکیور، در تمامی ساعات شبانه‌روز و در تمام روزهای هفته، آماده‌ی پاسخگویی به انتقادات، پیشنهادات و درخواست‌های ارزشمند شما هستند. افتخار ما، همراهی مستمر و ارائه‌ی خدماتی درخور اعتماد شماست.</p>
    <div class="flex items-center gap-16 max-lg:gap-7 max-xs:flex-col my-5 tracking-wider" dir="ltr">
      <a href="tel:09123457890" class="flex items-center gap-3 group">
        <div class="bg-white/10 rounded-full group-hover:bg-green-800 transition size-9 grid place-items-center">
          <IconsTelephone class="w-4" />
        </div>
        <span class="text-lg text-slate-100 group-hover:text-white">{{ useTelephone('09123456789') }}</span>
      </a>
      <a href="https://t.me/secyour_ir" target="_blank" class="flex items-center gap-3 group">
        <div class="bg-white/10 rounded-full group-hover:bg-sky-800 transition size-9 grid place-items-center">
          <IconsTelegram class="w-4" />
        </div>
        <span class="text-lg text-slate-100 group-hover:text-white">@secyour_ir</span>
      </a>
    </div>
    <NuxtLink to="/contact" class="btn btn-emerald">
      <IconsMessagePlus class="ml-1 h-4" />
      <span>ارسال پیام به پشتیبانی</span>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { IconsTelephone } from '#components';


</script>

<style scoped>
@reference "~/assets/css/main.css";
h3 {
  @apply bg-clip-text bg-gradient-to-b from-emerald-100 to-emerald-300 drop-shadow-sm;
  -webkit-text-fill-color: transparent;
}
</style>