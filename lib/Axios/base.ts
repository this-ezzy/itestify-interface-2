// src/lib/axios/base.ts
import appEnv from '@/env.mjs'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export const API_BASE_URL =
    appEnv.NEXT_PUBLIC_APP_API_URL ?? 'http://localhost:3000/api'

const defaultConfig: AxiosRequestConfig = {
    baseURL: API_BASE_URL,
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
}

export type CreateAxiosConfig = AxiosRequestConfig & {
    skipInterceptors?: boolean
}

export const createAxiosInstance = (
    config?: CreateAxiosConfig
): AxiosInstance => {

    const instance = axios.create({
        ...defaultConfig,
        ...config,
        headers: {
            ...defaultConfig.headers,
            ...config?.headers,
        },
    })


    if (!config?.skipInterceptors) {
        instance.interceptors.response.use(
            (response) => response,
            (error) => {
                const normalizedError = {
                    status: error.response?.status,
                    message:
                        error.response?.data?.message ||
                        error.message ||
                        'Unexpected error',
                    data: error.response?.data,
                }

                return Promise.reject(normalizedError)
            }
        )
    }

    return instance
}
