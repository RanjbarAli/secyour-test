export default defineNuxtPlugin(async () => {
    try {
        const route = useRoute()
        const userStore = useUserStore()
        let token = useCookie('user-token', { default: null })
        token.value = "16|7GqX0M05Md7ikAR7cQCw9cQ7R79aANjfclw5ZiQx83f66e83"
        if (userStore.pending === false || !userStore.isLoggedIn || token.value) {
            const getUserPromise = userStore.getUser(token.value, false)
            if (route.meta.layout == 'panel') await getUserPromise;
        }
    } catch (error) {
        console.error('Error in app service provider:', error)
    }
})