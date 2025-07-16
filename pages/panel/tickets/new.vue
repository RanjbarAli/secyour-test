<script setup>

definePageMeta({
    layout: 'panel'
})

const runtimeConfig = useRuntimeConfig()

let isProcessing = ref(false)
const isLoading = ref(true)
const successfulID = ref(null)

const ticketSubjects = ref([])
const selectedSubject = ref(null)

const cachedIssuesList = ref({})

const issuesList = ref([])

watch(selectedSubject, async (newVal) => {
    issuesList.value = []
    if (!newVal) return false
    if (cachedIssuesList.value[newVal]?.length) {
        issuesList.value = cachedIssuesList.value[newVal]
        return false
    }
    await useUserApiFetch().get(runtimeConfig.public.API_FAQS_RELATED, {
        params: {
            subject: newVal
        }
    }).then(({ data }) => {
        issuesList.value = data
        cachedIssuesList.value[newVal] = data
    }).catch((error) => {
        useCompactAlertError('get-related-faqs', getErrorMessage(error))
    })
    return false
})




const getTicketSubjects = async () => {
    await useUserApiFetch().get(runtimeConfig.public.API_TICKET_SUBJECTS_LIST)
    .then(({ data }) => {
        ticketSubjects.value = data
    }).catch((error) => {
        useCompactAlertError('get-ticket-subjects', getErrorMessage(error))
    })
    isLoading.value = false
    return false
}

onMounted(()=> getTicketSubjects())


const ticketTitle = ref('')
const ticketMessage = ref('')
const ticketAttachment = ref(null)
const attachInput = ref(null)

const attachmentChange = ({ target }) => {
  let url = target.value;
  let ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
  if (target?.files[0] && ['png', 'jpeg', 'jpg', 'gif', 'pdf', 'rar', 'zip'].includes(ext)) {
    ticketAttachment.value = target.files[0]
  } else {
    useAlertError('attachment-change', 'فایل باید عکس یا pdf یا zip/rar باشد.')
  }
}

const sendMessage = async () => {
    if (isProcessing.value) return false
    if (ticketMessage.value.length < 10) {
        useCompactAlertError('send-ticket', 'پاسخ نباید کمتر از 10 کاراکتر باشد.', { time: 5 })
        return false
    }
    isProcessing.value = true
    await useUserApiFetch().put(runtimeConfig.public.API_NEW_TICKET, {
        subject: selectedSubject,
        message: ticketMessage.value,
        attachment: ticketAttachment.value
    }, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }).then(({ data }) => {
        successfulID.value = data.id
        ticketMessage.value = '' 
        selectedSubject.value = null
        ticketAttachment.value = null
    }).catch((error) => {
        useCompactAlertError('send-ticket', getErrorMessage(error), { time: 5 })
    })
    isProcessing.value = false
    return false
}

</script>

<template>
    <div class="card">
        <div class="card flex justify-between items-center xs:flex-col gap-5">
            <h1 class="page-title">تیکت جدید <span v-if="selectedSubject">در بخش `{{ ticketSubjects.find(i => i.value ==
                    selectedSubject).title }}`</span></h1>
            <button v-if="selectedSubject" @click="selectedSubject = null"
                class="mb-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg pt-1.5 shadow-lg shadow-blue-500/40 hover:shadow-blue-600/40 pb-1 px-3 text-base flex items-center gap-2">
                <IconsArrowRight class="h-3.5" /> برگشت
            </button>
            <button v-else @click="navigateTo('/panel/tickets')"
                class="mb-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg pt-1.5 shadow-lg shadow-blue-500/40 hover:shadow-blue-600/40 pb-1 px-3 text-base flex items-center gap-2">
                <IconsTicket class="h-3.5" /> تیکت ها
            </button>
        </div>
        <div class="card mt-8 text-sm">
            <div v-if="successfulID" class="card rounded-xl shadow-lg shadow-gray-200 dark:shadow-gray-800 text-center p-7 pb-4 bg-white dark:bg-gray-700">
                <h4 class="font-bold text-xl">تیکت شما با <span class="text-green-600 dark:text-green-300">موفقیت</span> ارسال شد</h4>
                <p class="text-base mt-3 max-w-[450px] mx-auto leading-loose">پیام شما ارسال شد و به زودی کارشناسان ما به پیامتان پاسخ خواهند داد.<br />از طریق پنل کاربری خود میتوانید وضعیت پیام را بررسی کنید.</p>
                <NuxtLink class="text-base inline-block mt-2 text-sky-600 hover:text-sky-700 dark:text-sky-300 dark:hover:text-sky-200" :to="`/panel/tickets/${successfulID}`">#{{ successfulID }}</NuxtLink>
            </div>
            <div v-else-if="selectedSubject == null"
                class="grid grid-cols-3 gap-5 2xl:gap-3 xl:grid-cols-2 sm:grid-cols-1 sm:gap-5 card subjects">
                <div v-if="isLoading" v-for="i in 6"
                    class="bg-white dark:bg-gray-700 opacity-70 shadow-md border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div class="flex flex-col gap-1 items-start">
                        <strong><span class="isLoading w-24 h-3 rounded-full"></span></strong>
                        <div><span class="isLoading w-52 h-3 rounded-full"></span></div>
                    </div>
                </div>
                <div v-else v-for="subject in ticketSubjects" @click="selectedSubject = subject.value"
                    class="subject overflow-hidden relative bg-white dark:bg-gray-700 group cursor-pointer shadow-md border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <IconsMessagePlus
                        class="h-10 text-main-purple-700 dark:text-purple-400/40 absolute -left-2 top-1/2 -translate-y-1/2 opacity-20 dark:opacity-70 dark:contrast-75 group-hover:left-3 group-hover:opacity-10 dark:group-hover:opacity-80" />
                    <div class="flex flex-col gap-1">
                        <strong class="text-base group-hover:text-gray-800 dark:group-hover:text-white">{{ subject.title }}</strong>
                        <span class="text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">{{ subject.description }}</span>
                    </div>
                </div>
            </div>
            <div v-else class="card grid grid-cols-[auto_20rem] 2xl:grid-cols-1 gap-7 items-start">
                <div class="bg-white dark:bg-gray-700 shadow p-5 flex flex-col gap-5 rounded-lg">
                    <PanelFormControl2 label="عنوان تیکت" icon="IconsEditPen" v-model="ticketTitle" />
                    <PanelFormControlTextarea2 placeholder="توضیحات شما..." v-model="ticketMessage" />
                    <div class="flex justify-between items-end xs:flex-col gap-5">
                        <div class="flex items-center gap-2.5 xs:w-full">
                            <div :class="['relative sm:w-full flex items-center gap-2.5 border hover:border-blue-500 dark:hover:border-blue-400 px-3 py-1.5 rounded-lg', ticketAttachment ? 'border-blue-300' : 'border-gray-200 dark:border-gray-500']">
                                <IconsUpload class="h-5 text-blue-500 dark:text-blue-400" />
                                <div class="flex flex-col gap-px">
                                    <span class="text-sm">فایل ضمیمه</span>
                                    <span class="text-xs max-w-32 ml:max-w-24 sm:max-w-full truncate text-gray-500 dark:text-gray-300">{{ ticketAttachment ? ticketAttachment.name : 'برای انتخاب کلیک کنید' }}</span>
                                </div>
                                <input type="file" @change="attachmentChange"
                                    ref="attachInput"
                                    accept="application/pdf, image/*, .rarو .zip"
                                    class="p-0 m-0 cursor-pointer absolute inset-0 opacity-0 w-full h-full" />
                            </div>
                            <IconsTrash v-if="ticketAttachment" @click="ticketAttachment = null; attachInput.value = null"
                                class="h-4 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500" />
                        </div>
                        <button @click="sendMessage()" :disabled="isProcessing"
                            class="xs:justify-center xs:card pt-2 pb-2.5 px-3.5 flex gap-2.5 items-center bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 disabled:hover:bg-blue-500 dark:disabled:hover:bg-blue-600 text-white rounded-lg">
                            <component :is="isProcessing? 'IconsSpin' : 'IconsMessagePlus'"
                                :class="{ 'h-4': true, 'mt-1': isProcessing }" /> {{ isProcessing ? '' : 'ارسال تیکت'}}
                        </button>
                    </div>
                </div>
                <div class="text-sm bg-white dark:bg-gray-700 shadow pb-3 rounded-lg overflow-hidden">
                    <h4 class="font-bold text-xl text-gray-700 dark:text-white m-5 mb-3">سوالات پر تکرار ...</h4>
                    <ul v-if="issuesList.length" class="flex flex-col">
                        <li v-for="issue in issuesList" @click="navigateTo(`/faqs#${issue.id}`)" class="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 cursor-pointer w-full py-1.5 px-3 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-1.5 border-t border-gray-50 dark:border-gray-600"><IconsQuestion class="h-3.5 text-blue-500 dark:text-blue-300 opacity-80" /> <span class="mt-0.5">{{ issue.title }}</span></li>
                    </ul>
                    <div v-else class="p-10 text-center border-t border-gray-50 dark:border-gray-600">
                        <IconsSpin class="h-10 opacity-80" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.subjects:has(.subject:hover) .subject:not(:hover) {
    opacity: .6;
}

</style>
