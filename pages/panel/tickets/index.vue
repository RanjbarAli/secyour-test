<script setup>
definePageMeta({
  layout: 'panel'
})

const page = ref(1)
const count = ref(1)

const tickets = ref([])

let isLoading = ref(true)

const runtimeConfig = useRuntimeConfig()

const getTickets = async () => {
    isLoading.value = true
    await useUserApiFetch().get(runtimeConfig.public.API_TICKETS_LIST, {
        params: {
            page: page.value
        }
    }).then(({ data }) => {
        count.value = data.pagesCount
        tickets.value = data.tickets
    }).catch((error) => {
        count.value = 0
        tickets.value = []
        useCompactAlertError('get-ticket', getErrorMessage(error))
    })
    isLoading.value = false
    return false
}

onMounted(()=> getTickets())
watch(page, async () => await getTickets())
</script>

<template>
  <div class="card" id="tickets">
    <div class="card flex justify-between items-center xs:flex-col gap-5">
      <h1 class="page-title">تیکت ها</h1>
      <button @click="navigateTo('/panel/tickets/new')" class="mb-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg pt-1.5 shadow-lg shadow-blue-500/40 hover:shadow-blue-600/40 pb-1 px-3 text-base flex items-center gap-2"><IconsMessagePlus class="h-3.5" />تیکت جدید</button>
    </div>
    <div class="card mt-8">
      <div :class="['card divide-y divide-gray-200 dark:divide-gray-800', isLoading? 'shadow-sm' : 'bg-white dark:bg-gray-700 shadow']">
        <div v-if="isLoading" v-for="(item, index) of 8" :style="{ 'opacity': `${100 - ((index+1) * 15)}%` }" class="text-sm grid grid-cols-[5rem_auto_10rem_10rem] lg:grid-cols-[auto_8rem_8rem] xs:grid-cols-1 gap-3 bg-white dark:bg-gray-700 p-2">
          <div class="lg:hidden xs:grid relative grid place-items-center overflow-hidden">
            <div class="w-16 h-6 rounded-full isLoading"></div>
          </div>
          <div class="flex flex-col xs:items-center gap-1 items-start">
            <div class="group-hover:text-sky-700 dark:group-hover:text-sky-300"><div class="w-52 xl:!w-44 max-w-full xs:!w-36 h-6 rounded-full isLoading"></div></div>
          </div>
          <div class="flex items-center justify-center">
            <div class="w-32 h-6 rounded-full isLoading"></div>
          </div>
          <div class="flex justify-center flex-col gap-1">
            <div class="w-28 h-6 rounded-full isLoading"></div>
          </div>
        </div>
        <NuxtLink v-else v-for="ticket in tickets" :to="`/panel/tickets/${ticket.id.substring(1)}`" class="group relative hover:z-[2] hover:shadow hover:shadow-blue-200/40 dark:hover:shadow-blue-300/40 hover:bg-blue-200/10 dark:hover:bg-blue-300/10 text-sm grid grid-cols-[5rem_auto_10rem_10rem] lg:grid-cols-[auto_8rem_8rem] xs:grid-cols-1 xs:text-center gap-3 bg-white dark:bg-gray-700 p-2">
          <div class="lg:hidden xs:grid xs:mt-1 relative grid place-items-center overflow-hidden">
            <span class="xs:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl rotate-12 mt-2 select-none pointer-events-none text-gray-500/10 font-bold">#</span>
            <span class="relative z-[1] text-sky-600 dark:text-sky-300">{{ ticket.id }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span :class="{'text-gray-600  dark:text-gray-200 group-hover:text-sky-700 dark:group-hover:text-sky-300 sm:font-bold': true, 'font-bold': ticket.readDate}">{{ ticket.title }}</span>
            <span class="text-xs text-gray-400 dark:text-gray-300">{{ ticket.subject }}</span>
          </div>
          <div class="flex items-center justify-center">
            <div :class="['pt-0.5 pb-1 px-3 lg:p-0 lg:!bg-transparent rounded-full', ticket.statusCode == 2? 'bg-green-200 dark:bg-green-700/40  text-green-800 dark:text-green-300' : ticket.statusCode == 1 ? 'bg-yellow-200 dark:bg-yellow-700/40  text-yellow-800 dark:text-yellow-300' : 'bg-gray-200 dark:bg-gray-800  text-gray-800 dark:text-gray-300']">{{ {0: 'بسته شده', 1: 'در انتظار پاسخ', 2: 'پاسخ داده شده'}[ticket.statusCode] }}</div>  
          </div>
          <div class="flex justify-center flex-col gap-1">
            <div><IconsTime class="h-2.5 text-gray-500 ml-1" />{{ ticket.updatedDate }}</div>
            <span class="text-xs text-gray-400">{{ ticket.createdDate }}</span>
          </div>
        </NuxtLink>
      </div>
      <div v-if="!isLoading && !tickets.length" class="card text-center p-7 bg-gray-300/10 border border-gray-300 rounded-lg">
        <IconsTicket class="h-24 text-gray-400" />
        <span class="block mt-7 text-lg">هیچ تیکتی ایجاد نشده است!</span>
      </div>
      <div v-if="tickets.length && !isLoading" class="card flex items-center justify-center mt-10">
        <PanelPagination v-model="page" :count="count" />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.isLoading {
  @apply lg:w-16 xs:w-10
}
</style>
