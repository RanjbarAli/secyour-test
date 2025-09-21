<template>
  <div class="card mt-7 max-md:mt-32 max-md:text-center">
    <h3 class="font-bold text-3xl">چرا سکیور؟</h3>
    <div class="card grid grid-cols-4 gap-10 max-lg:gap-7 max-ml:grid-cols-2 max-md:grid-cols-1 mt-12">
      <div class="feature">
        <IconsIntroScanner />
        <h4 class="head-text">اسکنر فوق العاده قدرتمند</h4>
        <p class="description">اسکنر سکیور با توجه به بیس قدرتمند و دیتابیس عظیم و به روز آسیب پذیری ها، شما را از هیچ چیز غافل نمی کند</p>
      </div>
      <div class="feature">
        <IconsIntroRepair />
        <h4 class="head-text">تعمیر سایت توسط حرفه ای ها</h4>
        <p class="description">تیم سکیور متشکل از امنیت کاران زبده کشور هستند که می توانند بحث امنیت سایت و یا سازمان شما را عهده دار شوند</p>
      </div>
      <div class="feature">
        <IconsIntroProtection />
        <h4 class="head-text">نظارت و حفاظت</h4>
        <p class="description">سیستم های سکیور به نحوی برنامه ریزی شده اند که می توانند سایت شما را به صورت مداوم پایش کنند و آسیب پذیری های جدید را به شما اطلاع دهند</p>
      </div>
      <div class="feature">
        <IconsIntroDetection />
        <h4 class="head-text">تشخیص سریع آسیب پذیری ها</h4>
        <p class="description">اسکنر سکیور تمام سایت شما را وجب به وجب بررسی کرده، و آسیب پذیری فایل و یا لینک هایی که وجودش را فراموش کرده اید را نیز گزارش می دهد</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
@reference "~/assets/css/main.css";

.feature {
  @apply flex flex-col gap-2 max-md:items-center;
  svg {
    @apply max-md:self-center;
  }
  .head-text {
    @apply font-bold text-lg;
  }
  .description {
    @apply leading-relaxed text-slate-400;
  }
}
</style>