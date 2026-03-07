import { storage } from "@/utils/storage"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AuthLoginReq, AuthRegisterReq, AuthResponse, AuthVerifyReq, GoogleLoginResp } from "./types"
import { client, queryGetter, queryKeyGetter, querySetter } from "@/app/queryClient"
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../../url";
import { publicAxios } from "@/lib/Axios/public";
import { QUERY_KEYS } from "../../queryKeys";
import securedAxios from "@/lib/Axios/secured";
import { toast } from "sonner";

type SessionState = { auth?: Partial<AuthResponse> }

const getSessionKey = queryKeyGetter<"session", SessionState>("session")


const setSessionData = querySetter<"session", SessionState>(getSessionKey)

export const getSessionData = queryGetter<"session", SessionState>(getSessionKey)

export const useCreateAccount = () => {
    return useMutation({
        mutationKey: [QUERY_KEYS.AUTH.REGISTER],
        mutationFn: async (params: AuthRegisterReq) => {
            const resp = await publicAxios.post<AuthResponse>(API_URL.AUTH.REGISTER, params)
            return resp.data
        },
        onSuccess: (resp) => {
            clientLogin({
                token: resp.token
            })
            setSessionData("auth", {
                token: resp.token
            })
        }
    })
}

export const useLogin = () => {
    return useMutation({
        mutationKey: [QUERY_KEYS.AUTH.LOGIN],
        mutationFn: async (params: AuthLoginReq) => {
            const resp = await publicAxios.post<AuthResponse>(API_URL.AUTH.LOGIN, params)
            return resp.data
        },
        onSuccess: (resp) => {
            clientLogin({
                token: resp.token
            })
            setSessionData("auth", {
                token: resp.token
            })
        }
    })
}

export const useRequestOtp = () => {
    return useMutation({
        mutationKey: [QUERY_KEYS.AUTH.REQUEST_OTP],
        mutationFn: async () => {
            const resp = securedAxios.get(API_URL.AUTH.REQUEST_OTP)
            return resp
        },
        retry: false
    })
}

export const useVerifyEmail = () => {
    return useMutation({
        mutationKey: [QUERY_KEYS.AUTH.VERIFY_EMAIL],
        mutationFn: async (params: AuthVerifyReq) => {
            const resp = await securedAxios.post(API_URL.AUTH.VERIFY_ACCOUNT, params)
            return resp
        },
    })
}

const getSession = async () => {
    return await getAuth()
}

export const useAuth = () => {
    return useQuery({ queryKey: getSessionKey("auth"), queryFn: getSession, retry: 2 })
}

export default useAuth

export const getAuth = async () => {
    const data = getSessionData("auth")
    if (data?.token) return data
    return await storage.get("auth") ?? null
}

export const clientLogin = async (auth: Partial<AuthResponse>) => {

    const { token } = auth
    if (!token) return
    const decoded = jwtDecode(token);
    const expiry = decoded.exp
    const partialAuth: Partial<AuthResponse> = { token }
    await storage.set("auth", partialAuth, { expires: expiry })
    setSessionData("auth", partialAuth)
    client.get().invalidateQueries()
}

export const clientLogout = async () => {
    storage.remove("auth")
    setSessionData("auth", undefined)
    client.get().removeQueries()
}

export const logout = async (data: { refreshToken: string }) => {
    const result = await publicAxios({ url: API_URL.AUTH.LOGOUT, method: "POST", data })
    return result
}


export const useGoogleLogin = () => {
    return useMutation({
        mutationKey: [QUERY_KEYS.AUTH.GOOGLE_LOGIN],
        mutationFn: async () => {
            const result = await publicAxios<GoogleLoginResp>({ url: API_URL.AUTH.GOOGLE_LOGIN, method: "GET" })
            return result.data
        },
        onSuccess: (resp) => {
            const redirectUrl = resp.redirect_to
            window.location.href = redirectUrl
        },
        onError: () => {
            toast.error("Google login failed, try again later.")
        }
    })
}

export const useGoogleCallback = () => {
    return useMutation({
        mutationKey: [QUERY_KEYS.AUTH.GOOGLE_CALLBACK],
        mutationFn: async (params: { code: string }) => {
            const result = await publicAxios({ url: API_URL.AUTH.GOOGLE_CALLBACK, method: "POST", params })
            return result
        }
    })
}