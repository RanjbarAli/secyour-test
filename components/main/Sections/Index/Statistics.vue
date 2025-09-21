<template>
  <section class="card grid py-16 px-5 gap-10 max-lg:gap-5 max-ml:grid-cols-2 max-sm:grid-cols-1 grid-cols-4">
    <div class="box">
      <div class="content">
        <strong class="font-bold text-3xl max-lg:text-2xl">1.2 هزار</strong>
        <span>سایت اسکن شده</span>
      </div>
    </div>
    <div class="box">
      <div class="content">
        <strong class="font-bold text-3xl max-lg:text-2xl">26 عدد</strong>
        <span>مقاله امنیتی</span>
      </div>
    </div>
    <div class="box">
      <div class="content">
        <strong class="font-bold text-3xl max-lg:text-2xl">337,520</strong>
        <span>آسیب پذیری یافته شده</span>
      </div>
    </div>
    <div class="box">
      <div class="content">
        <strong class="font-bold text-3xl max-lg:text-2xl">5.68 میلیون</strong>
        <span>سطر کد اسکن شده</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/css/main.css";
.box {
  @apply relative overflow-hidden rounded-t-2xl;
  &::before {
    content: "";
    @apply pointer-events-none absolute right-0 size-full top-0 rounded-t-2xl border-2 border-white/40;
    clip-path: polygon(0 0, 100% 0, 100% 12px, 0 12px);
  }
  .content {
    @apply float-right w-full p-4 flex flex-col items-center justify-center gap-2;
    &::before {
      content: "";
      @apply w-0.5 right-0 top-2.75 bg-gradient-to-b from-white/40 via-white/0 via-75% to-transparent absolute h-full;
    }
    &::after {
      content: "";
      @apply w-0.5 left-0 top-2.75 bg-gradient-to-b from-white/40 via-white/0 via-75% to-transparent absolute h-full;
    }
    span {
      @apply text-slate-200;
    }
  }
}

</style>