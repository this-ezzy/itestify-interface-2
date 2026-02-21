// src/lib/axios/public.ts
import { getAuth } from '@/app/api/hooks/auth'
import { createAxiosInstance } from './base'

export const publicAxios = createAxiosInstance()

publicAxios.interceptors.response.use(
    (response) => response.data,   // ✅ only return data
    (error) => Promise.reject(error)
)

publicAxios.interceptors.request.use(
    async (config) => {
        const auth = await getAuth()

        if (auth) {
            config.headers.Authorization = `Bearer ${auth.token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)
