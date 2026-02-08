
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { createAxiosInstance } from './base'
import { publicAxios } from './public'
import appEnv from '@/env.mjs'
import { API_URL } from '@/app/api/url'
import { clientLogin, getAuth } from '@/app/api/hooks/auth'

let isRefreshing = false
let refreshPromise: Promise<string | null> | null = null

/**
 * Axios instance for authenticated requests
 */
export const securedAxios = createAxiosInstance()

const retryAxios = axios.create({
    baseURL: appEnv.NEXT_PUBLIC_APP_API_URL,
})

/**
 * Refresh access token (single-flight)
 */
export const refreshToken = async (): Promise<string | null> => {
    try {
        const auth = await getAuth()

        if (!auth?.refreshToken) throw new Error("No refresh token")

        const response = await publicAxios.post(API_URL.AUTH.REFRESH_TOKEN, {
            refreshToken: auth.refreshToken,
        })

        const { token, refreshToken } = response.data.data

        if (!token || !refreshToken) throw new Error("Invalid tokens from refresh")
        // Update stored tokens
        clientLogin({
            token,
            refreshToken,
        })

        return token

    } catch (err) {
        // Log but do not logout here — let the caller handle it
        throw err
    }
}


securedAxios.interceptors.request.use(
    async (config) => {
        const auth = await getAuth()

        if (!auth) {
            return Promise.reject(
                new axios.Cancel('No auth token available')
            )
        }

        config.headers.Authorization = `Bearer ${auth.token}`
        return config
    },
    (error) => Promise.reject(error)
)


/**
 * Retry once after refreshing token on 401
 */


securedAxios.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retried?: boolean }

        // Only handle 401 errors
        if (error.response?.status === 401 && !originalRequest._retried) {
            originalRequest._retried = true

            try {


                // If no refresh is happening, start it
                if (!isRefreshing) {
                    isRefreshing = true
                    refreshPromise = refreshToken()
                }

                // Wait for the refresh result (even if another request triggered it)
                const newAccessToken = await refreshPromise
                isRefreshing = false
                refreshPromise = null

                // If refresh failed, force logout
                if (!newAccessToken) throw new Error("Unable to refresh token")

                // Retry the original request with the new access token
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
                return retryAxios(originalRequest)

            } catch (refreshError) {
                // Refresh failed → the user is no longer authenticated
                await handleUnauthorizedError()
                return Promise.reject(refreshError)
            }
        }

        // handle api down error, when the server is unreachable
        if (error.response?.status === 503 || error.response?.status === 504) {
            await handleUnauthorizedError()
            return Promise.reject(new Error("Service Unavailable: The server is currently unreachable. Please try again later."))
        }

        // All other errors are passed through
        return Promise.reject(error)
    }
)

export default securedAxios


export const handleUnauthorizedError = async () => {

    //Reload window to reset all state when session expires
}
