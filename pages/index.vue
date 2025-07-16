<script setup>
const isFreeScanOpen = ref(false)
const scanAddress = ref('')

let isFreeScanProcessing = ref(false)
const userStore = useUserStore()

const runtimeConfig = useRuntimeConfig()

const freeScanAction = async () => {
    if (isFreeScanProcessing.value) return false
    if (!isFreeScanOpen.value) return isFreeScanOpen.value = true
    let validating = await validate('آدرس', scanAddress.value, 'required|url')
    if (validating != null && validating.length > 0) {
        useCompactAlertError('free-scan-request', validating)
        return false
    }
    isFreeScanProcessing = true
    useCompactAlert('free-scan-request', 'درحال پردازش...', { icon: '...' })
    let error = ''
    const apiFetch = () => userStore.isLoggedIn? useUserApiFetch() : useApiFetch()
    await apiFetch().post(runtimeConfig.public.API_FREE_SCAN, { url: scanAddress.value })
        .then(async ({ data }) => {
            useHideAlert('free-scan-request')
            return await navigateTo(`/scan/${data.id}`)
        })
        .catch((e) => error = getErrorMessage(e))
    if (error.length) useCompactAlertError('free-scan-request', error)
    else useHideAlert('free-scan-request')
    isFreeScanProcessing = false
}

</script>

<template>
    <main class="container grid grid-cols-1 pt-14">
        <section class="grid grid-cols-2 gap-5 md:flex md:flex-col md:items-center md:gap-12 relative min-h-full md:min-h-0">
            <div class="flex flex-col justify-center md:text-center wow a-fadeInUp">

                <div class="drop-shadow-md">
                    <strong class="block text-3xl ml:text-2xl xs:text-xl mb-5">پیشرو در حوزه</strong>
                    <h2 class="block text-4xl font-extrabold ml:text-3xl mr-5 md:mr-0 xs:text-2xl">امنیت شبکه در سطح <span class="iran">ایران</span>!</h2>
                </div>

                <div class="max-w-[450px] text-main-gray-50 shadow leading-relaxed mt-8 bg-white/5 rounded-xl rounded-tr-none p-3 text-base">
                    <strong class="text-main-gray-50">امنیت سایت، بلکه مزیت نیست، یک اولویت است ...</strong>
                    <p>سکیور می تواند روند تست امنیت سایت و سرور شما را بسیار ساده کند و به راحتی ارزیابی امنیتی و اسکن آسیب پذیری را انجام دهید. این سرویس به شما کمک می کند تا مراحل جمع آوری اطلاعات ، اسکن وب سایت ، اسکن سرور را به صورت آنلاین انجام داده و گزارش آن را دریافت کنید. </p>
                </div>

                <div :class="['mt-10 flex md:justify-center xs:flex-col xs:items-center xs:gap-8', isFreeScanOpen ? 'gap-0' : 'gap-7 sm:gap-3']">

                    <div @click="navigateTo({ path: '/scan' })"
                        :class="[isFreeScanOpen ? 'max-w-0 xs:max-w-40' : 'max-w-40', 'cursor-pointer overflow-hidden whitespace-nowrap flex items-center w-36 gap-3 py-2 justify-center rounded-full bg-main-purple-700 hover:bg-main-purple-900 scan-btn']">
                        <svg class="inline h-5" viewBox="0 0 37 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18.1797 44.2076C18.2997 44.2723 18.4068 44.3291 18.5 44.3779C18.5932 44.3291 18.7003 44.2723 18.8203 44.2076C19.3116 43.9427 20.0177 43.5461 20.8668 43.0239C22.5673 41.9784 24.8307 40.4363 27.0895 38.4492C31.6391 34.4468 36 28.7924 36 21.875V4.32855L18.5 1.01774L1 4.32855V21.875C1 28.7924 5.36091 34.4468 9.91051 38.4492C12.1693 40.4363 14.4327 41.9784 16.1332 43.0239C16.9823 43.5461 17.6884 43.9427 18.1797 44.2076Z"
                                stroke="currentColor" stroke-width="3" />
                            <path d="M11 23.892V20.508H16.652V15H20V20.508H25.472V23.892H20V29.22H16.652V23.892H11Z"
                                fill="currentColor" />
                        </svg>
                        <div class="mt-0.5">اسکن عمیق</div>
                    </div>

                    <div class="flex duration-300" v-click-outside="() => { if (isFreeScanOpen) isFreeScanOpen = false; }">
                        <div @click="freeScanAction()"
                            class="cursor-pointer flex items-center px-4 py-2 rounded-full bg-main-orange-700 hover:bg-main-orange-900 scan-btn">
                            <IconsSearchBug v-show="isFreeScanOpen" class="h-5 y-flip" />
                            <svg v-show="!isFreeScanOpen" class="inline h-5" viewBox="0 0 37 46" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M18.1797 44.2076C18.2997 44.2723 18.4068 44.3291 18.5 44.3779C18.5932 44.3291 18.7003 44.2723 18.8203 44.2076C19.3116 43.9427 20.0177 43.5461 20.8668 43.0239C22.5673 41.9784 24.8307 40.4363 27.0895 38.4492C31.6391 34.4468 36 28.7924 36 21.875V4.32855L18.5 1.01774L1 4.32855V21.875C1 28.7924 5.36091 34.4468 9.91051 38.4492C12.1693 40.4363 14.4327 41.9784 16.1332 43.0239C16.9823 43.5461 17.6884 43.9427 18.1797 44.2076Z"
                                    stroke="currentColor" stroke-width="3" />
                            </svg>
                            <div :class="['mt-0.5 whitespace-nowrap overflow-hidden duration-200', isFreeScanOpen ? 'max-w-0' : 'max-w-40 mr-3']">اسکن رایگان</div>
                        </div>
                        <input type="url" dir="ltr"
                        v-model="scanAddress"
                            :class="['float-right bg-white rounded-full pt-1 text-left px-3 w-60 sm:w-52 text-gray-600', isFreeScanOpen ? 'delay-300 mr-3 max-w-[240px]' : 'max-w-0 !p-0 duration-0']"
                            placeholder="https://example.com">
                    </div>

                </div>
            </div>
            <div class="-ml-14 md:-order-1 md:ml-0 wow a-fadeInUp">
                <img src="/images/index/hbgindex.webp" class="float-left max-h-screen" alt="SecYour" rel="nofollow">
            </div>
        </section>

        <section
            class="grid grid-cols-4 ml:grid-cols-2 ml:grid-rows-2 xs:grid-cols-1 xs:grid-rows-none xs:gap-3 grid-rows-1 my-48">
            <div class="wow a-fadeInUp feature-item flex flex-col items-center px-5 py-7 gap-4 text-center rounded-3xl">
                <IconsSearchBug class="h-16 text-main-gray-100 opacity-80" />
                <h3 class="text-2xl font-bold">اسکن قدرتمند</h3>
                <p class="text-[#E0E0E0] leading-relaxed">اسکنر سکیور با توجه به بیس قدرتمند و دیتابیس عظیم و به روز آسیب
                    پذیری ها، شما رو از هیچ چیز غافل نمیکنه</p>
            </div>
            <div
                class="wow a-fadeInDown xs:a-fadeInUp feature-item flex flex-col items-center px-5 py-7 gap-4 text-center rounded-3xl">
                <IconsGearCheck class="h-16 text-main-gray-100 opacity-80" />
                <h3 class="text-2xl font-bold">تعمیر سایت</h3>
                <p class="text-[#E0E0E0] leading-relaxed">تیم سکیور متشکل از امنیت کاران زبده کشور هستند که میتوانند بحث
                    امنیت سایت و یا سازمان شما را عهده دار شوند</p>
            </div>
            <div class="wow a-fadeInUp feature-item flex flex-col items-center px-5 py-7 gap-4 text-center rounded-3xl">
                <IconsSecure class="h-16 text-main-gray-100 opacity-80" />
                <h3 class="text-2xl font-bold">نظارت و حفاظت</h3>
                <p class="text-[#E0E0E0] leading-relaxed">سیستم های سکیور به نحوی برنامه ریزی شده اند که می توانند سایت شما
                    را به صورت مداوم پایش کنند و آسیب پذیری های جدید را به شما اطلاع دهند</p>
            </div>
            <div
                class="wow a-fadeInDown xs:a-fadeInUp feature-item flex flex-col items-center px-5 py-7 gap-4 text-center rounded-3xl">
                <IconsDetect class="h-16 text-main-gray-100 opacity-80" />
                <h3 class="text-2xl font-bold">تشخیص سریع</h3>
                <p class="text-[#E0E0E0] leading-relaxed text-m">اسکنر سکیور تمام سایت شما را وجب به وجب بررسی کرده، و آسیب
                    پذیری فایل و یا لینک هایی که وجودش را فراموش کرده اید را نیز گزارش می دهد</p>
            </div>
        </section>

        <section class="relative support-section grid">
            <div
                class="card flex gap-20 lg:pl-0 lg:gap-14 ml:flex-wrap xs:flex-col xs:gap-10 ml:justify-center items-center">
                <div class="wow a-fadeInUp flex gap-6 items-center ml-auto ml:w-full ml:justify-center xs:flex-col xs:text-center">
                    <div class="relative support-icon">
                        <IconsHeadphone class="h-18" />
                    </div>
                    <div>
                        <strong class="block text-2xl mb-2">به کمک نیاز دارید؟</strong>
                        <span class="text-[#F0F0F0]">کارشناسان ما همیشه پاسخگوی شما هستند</span>
                    </div>
                </div>
                <a target="_blank" data-wow-delay="0.15s" href="https://t.me/secyour_ir"
                    class="wow a-fadeInUp xs:a-fadeInUp flex gap-3 items-center group cursor-pointer" dir="ltr">
                    <div class="h-10 w-10 bg-[#D9D9D930] rounded-full grid place-content-center group-hover:bg-sky-600">
                        <IconsTelegram class="w-5" />
                    </div>
                    <strong class="text-2xl mt-1">@secyour_ir</strong>
                </a>
                <a href="tel:09123457890" data-wow-delay="0.3s"
                    class="wow a-fadeInUp flex gap-3 items-center group cursor-pointer" dir="ltr">
                    <div class="h-10 w-10 bg-[#D9D9D930] rounded-full grid place-content-center group-hover:bg-green-600">
                        <IconsTelephone class="w-5" />
                    </div>
                    <strong class="text-2xl mt-1">09123457890</strong>
                </a>
            </div>
        </section>

        <section id="plans" class="relative py-8 my-32">
            <div class="text-center mb-14">
                <h4 class="relative wow a-fadeInDown font-bold text-3xl text-center inline-block">اشتراک های سکیور <div
                        class="absolute w-10 h-10 rounded-md rotate-45 bg-[#3c5464] opacity-20 animation-spin -top-3 -right-3 z-[-1]">
                    </div>
                </h4>
            </div>
            <div class="plans grid grid-cols-3 items-center gap-9 xl:gap-3 lg:gap-2 ml:grid-cols-2 ml:gap-3 ml:items-start ml:grid-rows-2 sm:grid-cols-1 sm:grid-rows-1 sm:gap-5 sm:content-center">
                <div
                    class="wow a-fadeIn ml:self-end sm:justify-self-center sm:py-7 plan bg-gradient-to-tr from-white/5 to-white/20 max-w-[420px] rounded-2xl relative p-5 md:p-4 pt-7">
                    <h5 class="card text-center text-3xl font-bold">پایه</h5>
                    <span class="card text-center mt-2">اسکن سایت برای آسیب پذیری های عمومی</span>
                    <ul class="card my-7 bg-white/5 text-left p-4 space-y-3 rounded-xl plan-list">
                        <li class="relative flex gap-2 flex-row-reverse">
                            <span>Medium business scope</span>
                            <div class="relative group">
                                <IconsInfo class="h-3 mb-1" />
                                <div class="tooltip group-hover:block">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                                    چاپ و با استفاده از طراحان گرافیک است.</div>
                            </div>
                        </li>
                        <li class="relative flex gap-2 flex-row-reverse">
                            <span>Scan behind logged in</span>
                            <div class="relative group">
                                <IconsInfo class="h-3 mb-1" />
                                <div class="tooltip group-hover:block">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                                    چاپ و با استفاده از طراحان گرافیک است.</div>
                            </div>
                        </li>
                        <li class="relative flex gap-2 flex-row-reverse">
                            <span>Scan internal networks</span>
                            <div class="relative group">
                                <IconsInfo class="h-3 mb-1" />
                                <div class="tooltip group-hover:block">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                                    چاپ و با استفاده از طراحان گرافیک است.</div>
                            </div>
                        </li>
                        <li class="relative flex gap-2 flex-row-reverse">
                            <span>Advanced reporting</span>
                            <div class="relative group">
                                <IconsInfo class="h-3 mb-1" />
                                <div class="tooltip group-hover:block">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                                    چاپ و با استفاده از طراحان گرافیک است.</div>
                            </div>
                        </li>
                        <li class="relative flex gap-2 flex-row-reverse">
                            <span>Continuous security monitoring</span>
                            <div class="relative group">
                                <IconsInfo class="h-3 mb-1" />
                                <div class="tooltip group-hover:block">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                                    چاپ و با استفاده از طراحان گرافیک است.</div>
                            </div>
                        </li>
                        <li class="relative flex gap-2 flex-row-reverse">
                            <span>Premium support</span>
                            <div class="relative group">
                                <IconsInfo class="h-3 mb-1" />
                                <div class="tooltip group-hover:block">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                                    چاپ و با استفاده از طراحان گرافیک است.</div>
                            </div>
                        </li>
                    </ul>
                    <button @click="navigateTo('/register')" class="block mx-auto bg-gradient-to-tr from-sky-800 to-sky-700 opacity-80 hover:opacity-100 text-white font-bold shadow pt-2 pb-1.5 px-10 text-lg rounded-full">ثبت نام رایگان</button>
                </div>
                <div data-wow-delay=".6s"
                    class="wow a-fadeIn ml:row-span-2 ml:self-center sm:justify-self-center sm:pb-7 plan bg-main-purple-900 shadow-purple-lg max-w-[420px] rounded-2xl relative p-5 md:p-4 pt-10 md:pt-0">
                    <span
                        class="ribbon absolute md:inline-block md:static md:float-left top-0 left-5 bg-main-purple-700 py-1 px-3 rounded-b-xl">محبوب
                        ترین</span>
                    <h5 class="card text-center text-3xl font-bold md:mt-5 sm:mt-7">حرفه ای</h5>
                    <span class="card text-center mt-2">مناسب شرکت ها و سایت های بزرگ</span>
                    <ul class="card my-7 bg-white/5 text-left p-4 space-y-3 rounded-xl plan-list">
                        <li class="relative flex gap-2 flex-row-reverse">
                            <span>API Access</span>
                            <div class="relative group">
                                <IconsInfo class="h-3 mb-1" />
                                <div class="tooltip group-hover:block">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                                    چاپ و با استفاده از طراحان گرافیک است.</div>
                            </div>
                        </li>
                        <li class="relative flex gap-2 flex-row-reverse">
                            <span>Medium business scope</span>
                            <div class="relative group">
                                <IconsInfo class="h-3 mb-1" />
                                <div class="tooltip group-hover:block">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                                    چاپ و با استفاده از طراحان گرافیک است.</div>
                            </div>
                        </li>
                        <li class="relative flex gap-2 flex-row-reverse">
                            <span>Scan behind logged in</span>
                            <div class="relative group">
                                <IconsInfo class="h-3 mb-1" />
                                <div class="tooltip group-hover:block">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                                    چاپ و با استفاده از طراحان گرافیک است.</div>
                            </div>
                        </li>
                        <li class="relative flex gap-2 flex-row-reverse">
                            <span>Scan internal networks</span>
                            <div class="relative group">
                                <IconsInfo class="h-3 mb-1" />
                                <div class="tooltip group-hover:block">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                                    چاپ و با استفاده از طراحان گرافیک است.</div>
                            </div>
                        </li>
                        <li class="relative flex gap-2 flex-row-reverse">
                            <span>Advanced reporting</span>
                            <div class="relative group">
                                <IconsInfo class="h-3 mb-1" />
                                <div class="tooltip group-hover:block">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                                    چاپ و با استفاده از طراحان گرافیک است.</div>
                            </div>
                        </li>
                        <li class="relative flex gap-2 flex-row-reverse">
                            <span>Continuous security monitoring</span>
                            <div class="relative group">
                                <IconsInfo class="h-3 mb-1" />
                                <div class="tooltip group-hover:block">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                                    چاپ و با استفاده از طراحان گرافیک است.</div>
                            </div>
                        </li>
                        <li class="relative flex gap-2 flex-row-reverse">
                            <span>Premium support</span>
                            <div class="relative group">
                                <IconsInfo class="h-3 mb-1" />
                                <div class="tooltip group-hover:block">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                                    چاپ و با استفاده از طراحان گرافیک است.</div>
                            </div>
                        </li>
                    </ul>
                    <div class="card flex flex-col gap-4 items-center justify-between">
                        <span class="text-2xl font-bold">1 میلیون تومان <small class="font-normal text-lg">/
                                ماهانه</small></span>
                        <button @click="navigateTo('/checkout')"
                            class="opacity-90 hover:opacity-100 tracking-wider font-bold bg-gradient-to-bl from-white/80 to-white/50 text-main-purple-700 pt-2 pb-1.5 px-14 text-lg rounded-full">خرید اشتراک</button>
                    </div>
                </div>
                <div data-wow-delay=".3s"
                    class="wow a-fadeIn ml:self-start sm:justify-self-center sm:py-7 plan shadow-xl bg-gradient-to-br from-white/20 to-white/5 max-w-[420px] rounded-2xl relative p-5 md:p-4 pt-7 text-center">
                    <h5 class="card text-3xl font-bold">سازمانی</h5>
                    <span class="card mt-2">نظارت و پشتیبانی ۲۴ ساعته</span>
                    <div class="card my-7 bg-white/5 p-4 rounded-xl leading-8">فرم رزرو جلسه را برای بررسی نیازمندی های
                        سازمان خود تکمیل کرده و برای ما ارسال بکنید. کارشناسان ما به زودی با شما تماس برقرار خواهند کرد ممکن
                        است کمی زمان ببرد از صبوری شما متشکریم</div>
                    <button @click="navigateTo('/contact')"
                        class="block mx-auto shadow bg-gradient-to-tr from-sky-800 to-sky-700 opacity-80 hover:opacity-100 text-white font-bold pt-2 pb-1.5 px-10 text-lg rounded-full">تنظیم جلسه</button>
                </div>
            </div>
        </section>

        <section class="flex flex-col gap-5">
            <h4 class="wow a-fadeInDown font-bold text-3xl text-center ">چرا سکیور؟</h4>
            <p data-wow-delay="0.2s"
                class="wow a-fadeInDown px-24 lg:px-10 sm:px-0 text-center text-gray-200 leading-relaxed">سکیور یک اسکنر
                قدرتمند است که شامل پایگاه داده ای بزرگ از آسیب پذیری های سایت است. علاوه بر میزان آسیب پذیری ها، دقت تشخیص
                آسیب پذیری بالایی دارد که این اتفاق، اشتباه مثبت اسکنر رو به حداقل می رساند در کنار همه این ها سکیور یک منبع
                بزرگ برای دانش امنیت وبسایت است که شما را در این حوزه بسیار کمک خواهد کرد.</p>
            <div class="card grid grid-cols-4 mt-5 lg:grid-cols-2 lg:gap-5 xs:grid-cols-1 gap-8 xl:gap-2">
                <div class="why-item card flex gap-4 justify-center pt-8 pb-4 lg:pb-5 rounded-xl">
                    <div class="relative flex flex-col items-center wow item-count">
                        <div class="font-bold text-center w-32 lg:w-28 flex items-center gap-2 justify-center" dir="ltr">
                            <strong class="wow text-5xl leading-10 lg:text-4xl" data-count-number="20.8">0</strong>
                            <small class="text-3xl leading-10 lg:text-xl">k+</small>
                        </div>
                        <span class="text-lg lg:text-base">تعداد مقالات امنیتی</span>
                    </div>
                    <IconsLike class="h-12 lg:h-10 lg:mt-3 mt-1 opacity-60 mix-blend-plus-lighter" />
                </div>
                <div class="why-item card flex gap-4 justify-center pt-8 pb-4 lg:pb-5 rounded-xl">
                    <div class="relative flex flex-col items-center wow item-count">
                        <div class="font-bold text-center w-32 lg:w-28 flex items-center gap-2 justify-center" dir="ltr">
                            <strong class="wow text-5xl leading-10 lg:text-4xl" data-count-number="5.1">0</strong>
                            <small class="text-3xl leading-10 lg:text-xl">k+</small>
                        </div>
                        <span class="text-lg lg:text-base">سایت اسکن شده</span>
                    </div>
                    <IconsChartPlus class="h-12 lg:h-10 lg:mt-3 mt-1 opacity-60 mix-blend-plus-lighter" />
                </div>
                <div class="why-item card flex gap-4 justify-center pt-8 pb-4 lg:pb-5 rounded-xl">
                    <div class="relative flex flex-col items-center wow item-count">
                        <div class="font-bold text-center w-32 lg:w-28 flex gap-2 justify-center" dir="ltr">
                            <strong class="wow text-5xl leading-10 lg:text-4xl" data-count-number="56">0</strong>
                            <small class="text-3xl leading-10 lg:text-xl">m+</small>
                        </div>
                        <span class="text-lg lg:text-base">آسیب های یافته شده</span>
                    </div>
                    <IconsScope class="h-12 lg:h-10 lg:mt-3 mt-1 opacity-60 mix-blend-plus-lighter" />
                </div>
                <div class="why-item card flex gap-4 justify-center pt-8 pb-4 lg:pb-5 rounded-xl">
                    <div class="relative flex flex-col items-center wow item-count">
                        <div class="font-bold text-center w-32 lg:w-28 flex gap-2 justify-center" dir="ltr">
                            <strong class="wow text-5xl leading-10 lg:text-4xl" data-count-number="91">0</strong>
                        </div>
                        <span class="text-lg lg:text-base">آسیب پذیری اساسی</span>
                    </div>
                    <IconsBug class="h-12 lg:h-10 lg:mt-3 mt-1 opacity-60 mix-blend-plus-lighter" />
                </div>
            </div>
        </section>
    </main>
</template>

<style lang="postcss" scoped>
.plan > .light {
    @apply absolute rounded-2xl overflow-hidden w-full h-full top-0 right-0 pointer-events-none;
}
.plan > .light > .hole {
    content: "";
    position: absolute;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background: #fff;
    opacity: .4;
    transition: none;
    pointer-events: none;
    filter: blur(70px);
}

.iran {
    background: #fff linear-gradient(5deg, #3c9e53 0%, #fff 50%, #d14545 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.scan-btn.bg-main-orange-700 {
    box-shadow: 0 3px 10px rgb(169, 39, 10, 0.5)
}

.scan-btn.bg-main-purple-700 {
    box-shadow: 0 3px 14px rgb(51, 17, 136, 0.8)
}

.why-item {
    background-image: linear-gradient(to bottom left, rgb(39, 46, 63, .5) 0%, rgb(39, 46, 63, .4) 30%, rgb(39, 46, 63, .2) 50%, rgb(39, 46, 63, .4) 80%, rgb(39, 46, 63, .6) 100%);
    border: 2px solid #ffffff05
}

.item-count::before {
    content: "";
    width: 100%;
    height: 100px;
    background: linear-gradient(to bottom, rgb(97, 114, 158) 0%, rgba(97, 114, 158, 0) 100%);
    opacity: 0;
    z-index: -1;
    position: absolute;
    clip-path: polygon(50% 0, 100% 60px, 30% 60px, 30% 100%, 70% 100%, 70% 60px, 0 60px);
    transform: translateY(50px);
    transition: all 1s;
}

.animated.item-count::before {
    opacity: .15;
    transform: translateY(-20px);
}

.feature-item:nth-child(odd) {
    --dir: to bottom
}

.feature-item:nth-child(even) {
    --dir: to top
}

@media screen and (max-width: 560px) {
    .feature-item:nth-child(even) {
        --dir: to bottom
    }
}

.feature-item {
    background-image: linear-gradient(var(--dir), rgb(39, 46, 63, .5) 0%, rgb(39, 46, 63, 0) 100%);
}

.support-section::before,
.support-icon::before,
.plans::before {
    content: "";
    position: absolute;
    background: #3c5464;
    opacity: .8;
    z-index: -1;
}

.support-section::before {
    bottom: -450px;
    left: 0;
    width: 200px;
    height: 200px;
    filter: blur(100px);
}

.plans::before {
    bottom: -125px;
    right: 75px;
    width: 400px;
    height: 400px;
    filter: blur(200px);
    opacity: .2;
}

.support-icon::before {
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    filter: blur(40px);
}

@media screen and (min-width: 780px) {
    .support-icon::before {
        animation: blurred-bg-support 1s infinite;
    }
    @keyframes blurred-bg-support {
        50% { filter: blur(50px); }
    }
}

.tooltip {
    @apply drop-shadow-xl hidden left-1/2 -translate-x-1/2 text-right text-sm leading-relaxed absolute -translate-y-full -top-3 w-52 bg-black py-2 px-3 rounded-xl
}

.tooltip::before {
    content: "";
    @apply left-1/2 -translate-x-1/2 absolute -bottom-2 border-x-8 border-x-transparent border-t-8 border-t-black
}

.plan-list li::before {
    content: '✓';
    margin-right: 3px;
}
</style>