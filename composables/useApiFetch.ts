import axios from 'axios';

export const useApiFetch = () => {
    const runtimeConfig = useRuntimeConfig()
    return axios.create({
        baseURL: runtimeConfig.public.API_BASE_URL,
        headers: {
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
        },
    });
}