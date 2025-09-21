import { defineStore } from "pinia";


export const useUserStore = defineStore('user', () => {

    const defaultUserObject = () => {
        return {
            id: 0,
            name: "",
            email: "",
            mobile: "",
            email_verified_at: null,
            mobile_verified_at: null,
            registered_at: "",
            amount: 0,
            token: ""
        }
    }

    const pending = ref(false)

    // Base Information
    const info = ref({...defaultUserObject()})

    const isLoggedIn = computed(() => info.value?.id > 0 && !!info.value?.token?.length)

    const set = (newValue) => {
        info.value = {...info.value, ...newValue}
    }

    const resetInfo = (removeCookie = true) => {
        set(defaultUserObject())
        if (removeCookie) {
            const userToken = useCookie('user-token')
            userToken.value = null
        }
    }

    // Logout request
    const logout = async () => {
        if (!isLoggedIn) return false
        pending.value = 'logout'
        await useUserApi().delete('auth/logout')
        resetInfo()
        pending.value = false
    }
    
    // Login to get data and token
    const sendCode = async (mobile) => {
        try {
            pending.value = 'send-code'
            await useApi().post("auth/send-code", { mobile })
            pending.value = false
            return { success: true, ...info.value }
        } catch (error) {
            pending.value = false
            return { success: false, message: useErrorMessage(error) }
        }
    }

    const login = async (mobile, otp) => {
        try {
            pending.value = 'login'
            const { data: response } = await useApi().post("auth/login", { mobile, otp })
            const { user, token } = response.data
            set({...user, token: token.token})
            const userToken = useCookie('user-token', {
                expires: new Date(token.expired_at)
            })
            userToken.value = token.token
            pending.value = false
            return { success: true, ...info.value }
        } catch (error) {
            pending.value = false
            const userToken = useCookie('user-token')
            userToken.value = null
            return { success: false, message: useErrorMessage(error) }
        }
    }

    // Get user from token
    const getUser = async (token, toast = true) => {
        pending.value = 'get'
        await useApi().get('profile', {
            headers: {
                'Authorization' : 'Bearer ' + token
            }
        }).then(({ data }) => {
            const { data : user } = data
            set({...user, token})
            const userToken = useCookie('user-token', {
                maxAge: 60 * 60 * 24 * 2,
                default: null
            })
            if (!userToken.value) userToken.value = token.token
        }).catch((error) => {
            const userTokenCookie = useCookie('user-token')
            userTokenCookie.value = null
            if(toast) useAlertError('get-user-from-token', useErrorMessage(error), { time: 4 })
        })
        pending.value = false
    }

    return { info, isLoggedIn, set, pending, getUser, login, logout, defaultUserObject, sendCode }
});