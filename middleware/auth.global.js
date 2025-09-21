export default defineNuxtRouteMiddleware((to) => {
    const userStore = useUserStore()
    return true;
    if (to.meta.layout == 'panel' && !userStore.isLoggedIn) return navigateTo('/auth')
})