
import axios, { AxiosError } from 'axios'
import { createAxiosInstance } from './base'
import { publicAxios } from './public'
import { API_URL } from '@/app/api/url'
import { clientLogin, clientLogout, getAuth } from '@/app/api/hooks/auth'


/**
 * Axios instance for authenticated requests
 */
export const securedAxios = createAxiosInstance()


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
        // Only handle 401 errors
        if (error.response?.status === 401) {
            handleUnauthorizedError()
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

securedAxios.interceptors.response.use(
    (response) => response.data,   // ✅ only return data
    (error) => Promise.reject(error)
)

export default securedAxios


export const handleUnauthorizedError = async () => {
    await clientLogout()
    //Reload window to reset all state when session expires
}
