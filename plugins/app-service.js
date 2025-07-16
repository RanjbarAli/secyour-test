export default defineNuxtPlugin(async (nuxtApp) => {
    const userStore = useUserStore()
    if (!userStore.isLoggedIn) {
        let token = useLocalStorage.getItem('user-token')
        if (!!token && token != 'null') {
            await userStore.getUser(token, false)
        }
    }
})
