<script setup>
function gregorian_to_jalali() {
    let date = new Date(),
    gy = date.getFullYear(),
    gm = date.getMonth(),
    gd = date.getDay()
  var g_d_m, jy, jm, jd, gy2, days;
  g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  gy2 = (gm > 2) ? (gy + 1) : gy;
  days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
  jy = -1595 + (33 * ~~(days / 12053));
  days %= 12053;
  jy += 4 * ~~(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += ~~((days - 1) / 365);
  }
  return jy;
}
let getCurrentDate = gregorian_to_jalali()

const config = useRuntimeConfig()

</script>

<template>
  <footer class="card">
    <div class="container grid grid-cols-1 sm:justify-items-center">
      <div class="card flex justify-between gap-10 pb-10 text-gray-200 lg:grid lg:grid-cols-2 lg:gap-14 sm:grid-cols-1 sm:max-w-[300px]">
        <div class="flex flex-col gap-2">
          <h5 class="head-col">دسترسی سریع</h5>
          <NuxtLink class="link" to="/">صفحه اصلی</NuxtLink>
          <NuxtLink class="link" to="/about">درباره ما</NuxtLink>
          <NuxtLink class="link" to="/faqs">سوالات متداول</NuxtLink>
          <NuxtLink class="link" to="/#plans">پلن ها</NuxtLink>
          <NuxtLink class="link" to="/contact">تماس با ما</NuxtLink>
        </div>
        <div class="flex flex-col gap-2">
          <h5 class="head-col">کمک</h5>
          <NuxtLink class="link" to="/terms">قوانین و مقررات</NuxtLink>
          <NuxtLink class="link" to="/privacy">سیاست حفظ حریم خصوصی</NuxtLink>
          <NuxtLink class="link" to="/contact">مرکز پشتیبانی</NuxtLink>
        </div>
        <div class="flex flex-col gap-2">
          <h5 class="head-col">آخرین های وبلاگ</h5>
          <NuxtLink class="link truncate" to="/">لورم ایپسوم متن ساختگی با تولید سادگی</NuxtLink>
          <NuxtLink class="link truncate" to="/about">نامفهوم از صنعت چاپ و با استفاده</NuxtLink>
          <NuxtLink class="link truncate" to="/faqs">کتابهای زیادی در شصت و سه درصد گذشته</NuxtLink>
          <NuxtLink class="link truncate" to="/#plans">شناخت فراوان جامعه و متخصصان</NuxtLink>
          <NuxtLink class="link truncate" to="/contact">در این صورت می توان امید داشت که تمام</NuxtLink>
        </div>
        <div class="flex flex-col gap-2">
          <h5 class="head-col">ارتباط با ما</h5>
          <div class="flex justify-between mb-1">
            <a href="https://instagram.com/SecYour_com" rel="noopener" target="_blank" class="w-10 h-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/90 hover:text-[#c32a43]">
              <IconsInstagramSolid class="w-5" />
            </a>
            <a href="https://t.me/SecYour_com" rel="noopener" target="_blank" class="w-10 h-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/90 hover:text-[#0088cc]">
              <IconsTelegram class="w-5" />
            </a>
            <a href="https://youtube.com/Secyour_com" rel="noopener" target="_blank" class="w-10 h-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/90 hover:text-[#ff0000]">
              <IconsYoutube class="w-5" />
            </a>
            <a href="https://www.linkedin.com/Secyour_com" rel="noopener" target="_blank" class="w-10 h-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/90 hover:text-[#0a66c2]">
              <IconsLinkedin class="w-5" />
            </a>
          </div>
          <a href="tel:+989123456789" dir="ltr" rel="noopener" class="flex items-center gap-2 h-9 px-4 rounded-full bg-white/10 hover:bg-white/20">
              <IconsTelephone class="w-3" />
              <span class="leading-3 mt-1.5">0912 345 6789</span>
          </a>
          <a :href="`mailto:support@${config.public.SITE_URL}`" dir="ltr" rel="noopener" class="flex items-center gap-2 h-9 px-4 rounded-full bg-white/10 hover:bg-white/20">
              <IconsMail class="w-3" />
              <span class="leading-3 mt-1">{{ `support@${config.public.SITE_URL}` }}</span>
          </a>
        </div>
      </div>
      <div class="sm:w-full p-5 text-center border-t border-t-white/10 text-gray-100">
        <span dir="ltr" class="ml-2 xs:block" v-text="`© ${getCurrentDate}`"></span> تمامی حقوق سایت محفوظ می باشد
      </div>
    </div>
  </footer>
</template>

<style lang="postcss" scoped>
footer {
  background: linear-gradient(to top, rgba(0,0,0,.4) 0%, rgba(0,0,0,0) 100%);
}
.head-col {
  @apply font-bold mb-3 text-lg text-white
}
.link {
  @apply pr-3 hover:text-white border-r border-white/20 hover:border-white
}
</style>