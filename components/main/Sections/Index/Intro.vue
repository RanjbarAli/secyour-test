<script setup>
const iran = useTrans('iran')
const introHeadLast = useTrans('pages.index.intro.head-last').replace(iran, `<span class="iran-text">${iran}</span>`)
</script>

<template>
  <section class="intro-section">
    <div class="max-w-120 max-lg:max-w-1/2 max-md:max-w-none grow flex flex-col gap-8 max-md:items-center">
      <div
        class="drop-shadow-xl text-4.5xl max-lg:text-3xl max-xs:text-2xl flex max-md:items-center flex-col gap-5 items-start">
        <span class="font-bold text-[80%]">{{ useTrans('pages.index.intro.head-first') }}</span>
        <h2 class="font-extrabold lg:mr-5" v-html="introHeadLast"></h2>
      </div>
      <p class="w-full leading-relaxed text-white/85 text-base mb-2">{{ useTrans('pages.index.intro.description-body')
        }}</p>
      <div class="flex gap-5 max-xs:flex-col">
        <button class="btn btn-blue btn-large">الان شروع کن !</button>
        <button class="btn btn-white btn-large">
          <IconsRocket class="h-4" />
          <span>آشنایی با خدمات ما</span>
        </button>
      </div>
    </div>
    <ClientOnly>
      <MainSecurityScopeIcon class="max-w-100 w-full" />
    </ClientOnly>
  </section>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.intro-section {
  @apply flex items-center justify-between gap-10 px-5 max-lg:px-0 relative min-h-screen max-md:flex-col-reverse pt-3 max-md:pt-24 max-md:text-center;
}

@media screen and (max-height: 600px) {
  .intro-section {
    @apply py-24;
  }

}
</style>