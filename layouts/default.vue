<script setup>
const now = new Date();
const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric' });
const persianYear = formatter.format(now)
</script>

<template>
    <div class="layout card min-h-screen relative">
        <div class="layout-blurs">
            <div class="group-1"></div>
            <div class="container relative h-full"></div>
        </div>
        <MainMenu />
        <div class="card">
            <NuxtPage />
        </div>
        <footer class="card mt-10">
            <div class="container grid grid-cols-1 max-sm:justify-items-center">
                <div
                    class="card flex justify-between gap-10 pb-10 text-gray-200 max-lg:grid max-lg:grid-cols-2 max-lg:gap-14 max-sm:grid-cols-1 max-sm:max-w-[300px]">
                    <div class="flex flex-col gap-2">
                        <h5 class="head-col">دسترسی سریع</h5>
                        <NuxtLink class="link" to="/">صفحه اصلی</NuxtLink>
                        <NuxtLink class="link" to="/about">درباره ما</NuxtLink>
                        <NuxtLink class="link" to="/faqs">سوالات متداول</NuxtLink>
                        <NuxtLink class="link" to="/#plans">پلن ها</NuxtLink>
                        <NuxtLink class="link" to="/contact">تماس با ما</NuxtLink>
                    </div>
                    <div class="flex flex-col gap-2">
                        <h5 class="head-col">تعهدات و پشتیبانی</h5>
                        <NuxtLink class="link" to="/terms">قوانین و مقررات</NuxtLink>
                        <NuxtLink class="link" to="/privacy-policy">سیاست حفظ حریم خصوصی</NuxtLink>
                        <NuxtLink class="link" to="/contact">مرکز پشتیبانی</NuxtLink>
                    </div>
                    <div class="flex flex-col gap-2">
                        <h5 class="head-col">آخرین های وبلاگ</h5>
                        <span>هیچ مطالبی منتشر نشده است.</span>
                    </div>
                    <div class="flex flex-col gap-2">
                        <h5 class="head-col">ارتباط با ما</h5>
                        <div class="flex justify-between mb-1">
                            <a href="https://instagram.com/SecYour_ir" rel="noopener" target="_blank"
                                class="w-10 h-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/90 hover:text-[#c32a43]">
                                <IconsInstagram class="w-5" />
                            </a>
                            <a href="https://t.me/SecYour_ir" rel="noopener" target="_blank"
                                class="w-10 h-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/90 hover:text-[#0088cc]">
                                <IconsTelegram class="w-5" />
                            </a>
                            <a href="https://youtube.com/Secyour_com" rel="noopener" target="_blank"
                                class="w-10 h-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/90 hover:text-[#ff0000]">
                                <IconsYoutube class="w-5" />
                            </a>
                            <a href="https://www.linkedin.com/Secyour_com" rel="noopener" target="_blank"
                                class="w-10 h-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/90 hover:text-[#0a66c2]">
                                <IconsLinkedin class="w-5" />
                            </a>
                        </div>
                        <a href="tel:09123456789" dir="ltr" rel="noopener"
                            class="flex items-center gap-2 h-9 px-4 rounded-full bg-white/10 hover:bg-white/20">
                            <IconsTelephone class="w-4" />
                            <span class="leading-3">{{ useTelephone('09123456789') }}</span>
                        </a>
                        <a href="mailto:support@secyour.ir" dir="ltr" rel="noopener"
                            class="flex items-center gap-2 h-9 px-4 rounded-full bg-white/10 hover:bg-white/20">
                            <IconsMail class="w-4" />
                            <span class="leading-3">support@secyour.ir</span>
                        </a>
                    </div>
                </div>
                <div class="max-sm:w-full p-5 text-center border-t border-t-white/10 text-gray-100">
                    <span dir="ltr" class="ml-2 max-xs:block" v-text="`© ${persianYear}`"></span> تمامی حقوق سایت
                    محفوظ می باشد
                </div>
            </div>
        </footer>
    </div>
</template>