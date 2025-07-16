import { defineStore } from "pinia";


export const useUserStore = defineStore('user', () => {

    const runtimeConfig = useRuntimeConfig()

    const defaultUserObject = () => {
        return {
            id: 0,
            token: '',
            email: '',
            phone: '',
            displayName: '',
            isPhoneVerified: false,
            isEmailVerified: false,
            type: 'free',
            avatar: '',
            money: 0,
            notifications: {
                email: {
                        loginReport: true,
                        scanResult: true,
                        ticketStatusChange: false,
                        walletChange: false
                    },
                    sms: {
                        ticketStatusChange: true,
                        walletChange: false
                    }
            }
        }
    }

    // Base Information
    const info = ref({...defaultUserObject()})

    // Logout request
    const logout = async () => {
        if (!info.value?.token) return false
        await useUserApiFetch().post(runtimeConfig.public.API_LOGOUT)
        info.value = {...defaultUserObject()}
        useLocalStorage.removeItem('user-token')
    }
    
    // Login to get data and token
    const login = async (email, password) => {
        let result = null
        await useApiFetch().post(runtimeConfig.public.API_LOGIN, {email, password}).then(({ data }) => {
            info.value = {...data}
            useLocalStorage.setItem('user-token', data.token)
            result = { status: 'ok' }
        }).catch((error) => {
            useLocalStorage.removeItem('user-token')
            result = { status: 'error', message: getErrorMessage(error) }
        })
        return result
    }


    // Get user from token
    const getUser = async (token, toast = true) => {
        await useApiFetch().get(runtimeConfig.public.API_USER, {
            headers: {
                'Authorization' : 'Bearer ' + token
            }
        }).then(({ data }) => {
            info.value = {token, ...data}
            useLocalStorage.setItem('user-token', token)
        }).catch((error) => {
            useLocalStorage.removeItem('user-token')
            if(toast) useAlertError('get-user-from-token', getErrorMessage(error), { time: 4 })
        })
    }

    const update = async (props, headers = {}) => {
        let result = null
        await useUserApiFetch().patch(runtimeConfig.public.API_UPDATE_USER, props, headers).then(() => {
            set(props)
            result = { status: 'ok' }
        }).catch((error) => {
            result = { status: 'error', message: getErrorMessage(error) }
        })
        return result
    }

    const changePassword = async (currentPassword, newPassword) => {
        let result = null
        await useUserApiFetch().post(runtimeConfig.public.API_CHANGE_PASSWORD, {
            current: currentPassword,
            new: newPassword
        }).then(() => {
            result = { status: 'ok' }
        }).catch((error) => {
            result = { status: 'error', message: getErrorMessage(error) }
        })
        return result
    }

    const set = (props = {}) => {
        info.value = {...info.value, ...props}
    }

    const refreshProperty = async (props) => {
        props = Array.isArray(props)? props : [props]
        await useUserApiFetch().get(runtimeConfig.public.API_USER + '/?only=' + encodeURIComponent(props)).then(({ data }) => {
            props.forEach(prop => info.value[prop] = data[prop] );
        }).catch((error) => {
            useAlertError(`refresh-property-user`, getErrorMessage(error), { time: 4 })
        })
    }


    const isLoggedIn = computed(() => !!info.value?.id && !!info.value?.email && !!info.value?.token)

    return { info, isLoggedIn, set, update, getUser, login, logout, changePassword, refreshProperty, defaultUserObject }
});