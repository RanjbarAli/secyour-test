<script setup>

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const ticketDetails = ref({})

const runtimeConfig = useRuntimeConfig()

onMounted(async ()=> {
    const { data } = await useApiFetch().post(runtimeConfig.public.API_GET_TICKET, { id: route.params.id })
    if (data.status != 'ok') return navigateTo('/panel/tickets')
    ticketDetails.value = data
    isLoading.value = false
})

definePageMeta({
  layout: 'panel',
  validate: async (to) => {
    return /\d{5,10}/.test(to.params.id)
  }
})


const allAttachments = computed(() => 'responses' in ticketDetails.value ? ticketDetails.value.responses.filter(i => i.attachment) : [])


const replayText = ref('')
const replyAttachment = ref(null)
const attachInput = ref(null)

let isLoading = ref(true)
let isSendProcessing = ref(false)
let isCloseProcessing = ref(false)


const attachmentChange = ({ target }) => {
  let url = target.value;
  let ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
  if (target?.files[0] && ['png', 'jpeg', 'jpg', 'gif', 'pdf', 'rar', 'zip'].includes(ext)) {
    replyAttachment.value = target.files[0]
  } else {
    useAlertError('reply-attachment-change', 'فایل باید عکس یا pdf یا zip/rar باشد.')
  }
}

const sendMessage = async () => {
    if (ticketDetails.value.statusCode == 0 || isSendProcessing.value || isCloseProcessing.value) return false
    if (replayText.value.length < 10) {
        useCompactAlertError('reply-ticket', 'پاسخ نباید کمتر از 10 کاراکتر باشد.', { time: 5 })
        return false
    }
    isSendProcessing.value = true
    await useUserApiFetch().post(runtimeConfig.public.API_REPLY_TICKET, {
        id: ticketDetails.value.id.substring(1),
        message: replayText.value,
        attachment: replyAttachment.value
    }, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }).then(({ data }) => {
        ticketDetails.value = data
        replayText.value = ''
        replyAttachment.value = null
        useCompactAlertSuccess('reply-ticket', 'پاسخ شما با موفقیت ارسال شد.', { time: 5 })
    }).catch((error) => {
        useCompactAlertError('reply-ticket', getErrorMessage(error), { time: 5 })
    })
    isSendProcessing.value = false
    return false
}

const closeTicket = async () => {
    if (ticketDetails.value.statusCode == 0 || isSendProcessing.value || isCloseProcessing.value) return false
    if (process.client && !window.confirm('آیا مطمئن هستید که می خواهید تیکت را ببندید؟')) return false
    isCloseProcessing.value = true
    await useUserApiFetch().patch(runtimeConfig.public.API_CLOSE_TICKET, {
        id: ticketDetails.value.id.substring(1)
    }).then(({ data }) => {
        ticketDetails.value.statusCode = 0
        replayText.value = ''
        replyAttachment.value = null
        useCompactAlertSuccess('close-ticket', 'تیکت کاملا بسته شد.', { time: 5 })
    }).catch((error) => {
        useCompactAlertError('close-ticket', getErrorMessage(error), { time: 5 })
    })
    isCloseProcessing.value = false
    return false
}

const getMimeType = (fileName) => fileName.split('.')[fileName.split('.').length - 1]

</script>

<template>
  <div class="card">
    <div v-if="isLoading" class="card grid place-items-center p-10">
        <IconsSpin class="h-10 opacity-80" />
    </div>
    <div v-else class="card">
        <div class="card bg-white dark:bg-gray-700 shadow-sm border-b border-gray-300 dark:border-gray-500">
            <div class="card md:text-center p-5 xs:p-3 border-b border-gray-100 dark:border-gray-600 flex justify-between items-center gap-5 lg:flex-col-reverse">
                <div class="flex items-center gap-4 md:flex-col">
                    <span class="text-white h-12 w-12 grid place-items-center rounded-md bg-sky-500 shadow shadow-sky-500/30">
                        <IconsTicket class="h-6" />
                    </span>
                    <div>
                        <div class="block md:flex md:flex-col md:gap-3 md:items-center">
                            <h3 class="float-right max-w-[52ch] 2xl:max-w-96 xl:max-w-auto xl:whitespace-break-spaces truncate font-bold text-lg mt-0.5">{{ ticketDetails.title }}</h3>
                            <span v-if="[0,1].includes(ticketDetails.statusCode)" :class="['xl:mb-2 md:mr-0 mt-0.5 float-right mr-3 whitespace-nowrap text-xs py-1 px-2 rounded-full', ticketDetails.statusCode == 1 ? 'bg-yellow-200 dark:bg-yellow-700/40  text-yellow-800 dark:text-yellow-300' : 'bg-gray-200 dark:bg-gray-800  text-gray-800 dark:text-gray-300']">{{ {0: 'بسته شده', 1: 'در انتظار پاسخ'}[ticketDetails.statusCode] }}</span>  
                        </div>
                        <div class="card md:justify-center text-xs mt-1.5 text-gray-500 dark:text-gray-300 flex items-center xs:flex-wrap gap-1">
                            <span>توسط</span>
                            <img :src="userStore.info.avatar" alt="" class="h-4 rounded-full inline-block mr-1" />
                            <span class="text-sky-500 dark:text-sky-300 ml-1">{{ userStore.info.displayName }}</span>
                            <span class="xs:hidden">|</span>
                            <span class="xs:card xs:mt-2">{{ ticketDetails.createdDate }}</span>
                        </div>
                    </div>
                </div>
                <span class="mt-1">#{{ route.params.id }}</span>
            </div>
            <div class="card pt-4 select-none flex px-5 xs:-3 md:justify-center">
                <ul class="flex gap-8 xs:gap-5 tab">
                    <li :class="{ 'active' : route.hash != '#attachments' }" @click="router.replace({ hash: '#' })">اطلاعات</li>
                    <li :class="{ 'active' : route.hash == '#attachments' }" @click="router.replace({ hash: '#attachments' })">فایل های ضمیمه <span class="shadow-sm border border-gray-200 rounded-full text-xs px-1.5 pt-0.5 mr-1">{{ allAttachments.length }}</span></li>
                </ul>
            </div>
        </div>
        <div v-if="route.hash == '#attachments'" class="card mt-8 grid grid-cols-4 gap-5 2xl:grid-cols-3 xl:grid-cols-2 sm:grid-cols-1">
            <a v-for="(attach, key) in allAttachments" download :href="attach.attachment" class="bg-white hover:bg-gray-50 group border border-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 flex flex-col gap-3 items-center p-5" :key="key">
                <img :src="`/images/icons/${getMimeType(attach.attachment).toLowerCase()}.png`" class="h-16 mb-2" alt="" />
                <strong class="max-w-full truncate group-hover:text-sky-600 dark:group-hover:text-sky-300">{{ attach.attachment.split('/')[attach.attachment.split('/').length - 1] }}</strong>
                <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
                    <img :src="attach.author.avatar" alt="" class="h-5 rounded-full" />
                    <span>{{ attach.author.displayName }}</span>
                </div>
                <span class="text-xs text-gray-400">{{ attach.createdDate }}</span>
            </a>
        </div>
        <div v-else class="card">
            <div v-if="ticketDetails.statusCode != 0" class="card mt-8 bg-white dark:bg-gray-700 shadow-sm p-5 xs:p-3">
                <textarea v-model="replayText" class="card rounded bg-gray-50 min-h-52 border border-gray-200 dark:bg-gray-600 dark:border-gray-500 p-3 resize-none" placeholder="پاسخ به تیکت..."></textarea>
                <div class="card mt-5 flex items-end gap-4 md:flex-wrap md:justify-between">
                    <div class="flex items-center gap-2.5 ml-auto md:card md:justify-center">
                        <div :class="['relative sm:w-full flex items-center gap-2.5 border hover:border-blue-500 dark:hover:border-blue-400 px-3 py-1.5 rounded-lg', replyAttachment? 'border-blue-300' : 'border-gray-200 dark:border-gray-500']">
                            <IconsUpload class="h-5 text-blue-500 dark:text-blue-400" />
                            <div class="flex flex-col gap-px">
                                <span class="text-sm">فایل ضمیمه</span>
                                <span class="text-xs max-w-32 ml:max-w-24 sm:max-w-full truncate text-gray-500 dark:text-gray-300">{{ replyAttachment? replyAttachment.name : 'برای انتخاب کلیک کنید' }}</span>
                            </div>
                            <input type="file" ref="attachInput" @change="attachmentChange" accept="application/pdf, image/*, .rarو .zip" class="p-0 m-0 cursor-pointer absolute inset-0 opacity-0 w-full h-full" />
                        </div>
                        <IconsTrash v-if="replyAttachment" @click="replyAttachment = null; attachInput.value = null" class="h-4 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500" />
                    </div>
                    <button @click="closeTicket()" :disabled="isSendProcessing || isCloseProcessing" class="xs:card xs:order-1 pt-2 pb-2.5 px-3.5 bg-gray-500/10 dark:bg-gray-300/10 hover:bg-gray-500/20 dark:hover:bg-gray-200/20 disabled:hover:bg-gray-500/10 dark:disabled:hover:bg-gray-200/20 text-gray-600 dark:text-gray-300 rounded-lg"><IconsSpin v-if="isCloseProcessing" class="h-4" /> {{ isCloseProcessing? '' : 'بستن تیکت'}}</button>
                    <button @click="sendMessage()" :disabled="isSendProcessing || isCloseProcessing" class="xs:justify-center xs:card pt-2 pb-2.5 px-3.5 flex gap-2.5 items-center bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 disabled:hover:bg-blue-500 dark:disabled:hover:bg-blue-600 text-white rounded-lg"><component :is="isSendProcessing? 'IconsSpin' : 'IconsMessagePlus'" :class="{'h-4': true, 'mt-1': isSendProcessing}" /> {{ isSendProcessing? '' : 'ارسال پاسخ'}}</button>
                </div>
            </div>
            <div class="card mt-10 flex flex-col gap-6">

                <template v-if="ticketDetails.responses.length" v-for="(response, index) in ticketDetails.responses" :key="index">
                    <div v-if="response.author.id == userStore.info.id" class="min-w-[60%] max-w-[90%] md:w-full md:max-w-full bg-[#F3FAFF] dark:bg-gray-700 border border-b-2 shadow-lg shadow-[#BFE4FF50] dark:shadow-gray-700/50 border-[#BFE4FF] dark:border-gray-600 rounded-2xl rounded-br-none ml-auto">
                        <div class="card p-5 xs:p-3">
                            <p class="leading-loose text-[15px] whitespace-pre-line" v-text="response.message"></p>
                            <a v-if="response.attachment" :href="response.attachment" download class="bg-white dark:bg-gray-600 float-right mt-4 relative flex items-center gap-2.5 border hover:border-blue-500 dark:border-gray-500 dark:hover:border-blue-400 px-3 py-1.5 rounded-lg">
                                <IconsDownload class="h-5 text-blue-500 dark:text-blue-400" />
                                <div class="flex flex-col gap-px">
                                    <span class="text-sm">فایل ضمیمه</span>
                                    <span class="text-xs max-w-32 truncate text-gray-500 dark:text-gray-300">{{ response.attachment.split('/')[response.attachment.split('/').length - 1] }}</span>
                                </div>
                            </a>
                        </div>
                        <div class="card px-5 py-2 border-t border-[#BFE4FF90] dark:border-gray-600 flex justify-between items-end">
                            <div class="flex gap-2 items-center text-sm">
                                <img :src="response.author.avatar" alt="" class="h-8 rounded-full" />
                                <div>
                                <strong class="block">{{ response.author.displayName }}</strong>
                                <span class="block text-xs text-gray-500 dark:text-gray-300 font-normal mt-px">{{ response.author.role }}</span>
                                </div>
                            </div>
                            <span class="text-gray-500 dark:text-gray-300 text-xs"><IconsTime class="h-2.5 ml-1" /> {{ response.createdDate }}</span>
                        </div>
                    </div>

                    <div v-else class="min-w-[60%] max-w-[90%] md:w-full md:max-w-full bg-white dark:bg-gray-600 border border-b-2 shadow-lg shadow-gray-200/50 dark:shadow-gray-600/50 border-gray-200 dark:border-gray-500 rounded-2xl rounded-bl-none mr-auto">
                        <div class="card p-5 xs:p-3">
                        <p class="leading-loose text-[15px] whitespace-pre-line" v-text="response.message"></p>
                        <a v-if="response.attachment" :href="response.attachment" download class="bg-white dark:bg-gray-700 float-right mt-4 relative flex items-center gap-2.5 border hover:border-blue-500 dark:border-gray-500 dark:hover:border-blue-400 px-3 py-1.5 rounded-lg">
                            <IconsDownload class="h-5 text-blue-500 dark:text-blue-400" />
                            <div class="flex flex-col gap-px">
                                <span class="text-sm">فایل ضمیمه</span>
                                <span class="text-xs max-w-32 truncate text-gray-500 dark:text-gray-300">{{ response.attachment.split('/')[response.attachment.split('/').length - 1] }}</span>
                            </div>
                        </a>
                        </div>
                        <div class="card px-5 py-2 border-t border-gray-200 dark:border-gray-500 flex justify-between items-end">
                        <div class="flex gap-2 items-center text-sm">
                            <img src="/images/demo/avatar.jpg" alt="" class="h-8 rounded-full" />
                            <div>
                            <strong class="block">{{ response.author.displayName }}</strong>
                            <span class="block text-xs text-gray-400 dark:text-gray-200 font-normal mt-px">{{ response.author.role }}</span>
                            </div>
                        </div>
                        <span class="text-gray-400 dark:text-gray-200 text-xs"><IconsTime class="h-2.5 ml-1" /> {{ response.createdDate }}</span>
                        </div>
                    </div>

                </template>
            </div>
        </div>
    </div>
    
  </div>
</template>

<style scoped lang="postcss">
.tab li {
    @apply text-gray-500 border-b-2 border-transparent p-1 pb-1.5 cursor-pointer dark:text-gray-300
}
.tab li:hover {
    @apply text-gray-600 dark:text-gray-200
}
.tab li.active {
    @apply border-blue-500 text-gray-600 dark:text-gray-100
}
</style>
