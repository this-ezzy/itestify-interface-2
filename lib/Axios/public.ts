// src/lib/axios/public.ts
import { createAxiosInstance } from './base'

export const publicAxios = createAxiosInstance()

publicAxios.interceptors.response.use(
    (response) => response.data,   // ✅ only return data
    (error) => Promise.reject(error)
)