<template>
  <div class="bg-white/10 min-h-52 rounded-2xl w-full relative border border-white/10 group">
    <div class="card relative h-full overflow-hidden rounded-2xl">
        <div class="slide slide-1 active">
            <img src="/images/slides/slide-1.png" class="h-72 opacity-75 absolute bottom-0 left-0 select-none" />
            <div class="text">
                <strong>تضمین امنیت <br />و بـهـبـود ســایـت<br/>توسط کارشناسان ما!</strong>
                <button @click="navigateTo('/contact')" class="pt-1.5 pb-1 px-4 rounded-xl bg-white/10 hover:bg-white/20 block mt-5 text-base">ارتباط با ما</button>
            </div>
        </div>
    </div>
    <div class="btn right-0 md:right-3 translate-x-1/2">
        <IconsArrowRight class="h-5" />
    </div>
    <div class="btn left-0 md:left-3 -translate-x-1/2">
        <IconsArrowLeft class="h-5" />
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="postcss">
.btn { @apply z-10 group-hover:opacity-100 opacity-0 absolute top-1/2 -translate-y-1/2 rounded-full bg-main-gray-500 hover:bg-main-gray-700 shadow w-10 h-10 grid place-items-center; }
.slide { @apply float-right w-full relative h-full hidden opacity-0; }
.slide.active { @apply block opacity-100; }

/* Begin Slider 1 */
.slide-1 {
    @apply bg-main-purple-900
}
.slide-1::before {
    content: "";
    @apply w-52 h-52 rounded-3xl bg-gradient-to-tr from-sky-600 to-sky-700/40 opacity-10 -rotate-12 -bottom-8
    -right-8 absolute;
}
.slide-1 .text {
    @apply absolute top-0 -translate-y-full translate-x-full right-0;
}
@keyframes fadeAndMoveInTR {
    to {
        @apply absolute top-1/2 -translate-y-1/2 translate-x-0 right-16;
    }
}
.slide-1.active .text {
    animation: fadeAndMoveInTR .75s forwards
}
.slide-1 strong {
    @apply text-2xl leading-relaxed drop-shadow
}
/* End Slider 1 */
</style>