import axios from 'axios';

export const useUserApi = () => {
    const getUserStore = useUserStore()
    const runtimeConfig = useRuntimeConfig()
    return axios.create({
        baseURL: runtimeConfig.public.API_BASE_URL,
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Accept': 'application/json',
            'Authorization' : 'Bearer ' + getUserStore.info.token,
        }
    });
}