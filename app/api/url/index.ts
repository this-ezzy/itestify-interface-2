export const API_URL = {
    AUTH: {
        REGISTER: "/auth/signup",
        LOGIN: "/auth/signin",
        VERIFY_ACCOUNT: "/account/verify",
        FORGOT_PASSWORD: "/auth/forgot-password",
        RESET_PASSWORD: "/auth/reset-password",
        GOOGLE_LOGIN: "/v1/auth/google/login",
        REQUEST_OTP: "/account/request-otp",
        REFRESH_TOKEN: "",
        LOGOUT: ""
    },
    USER: {
        PROFILE: "/account/profile"
    },
    TESTIMONY: {
        GET_TESTIMONY_FEED: "/feed",
        GET_TESTIMONY_DETAILS: (id: string) => `/testimonies/${id}`,
        GET_TESTIMONY_BY_USER: "/testimonies",
        CREATE_TESTIMONY: "/testimonies",
        DELETE_TESTIMONY: (id: string) => `/testimonies/${id}`,
        LIKE_TESTIMONY: (id: string) => `/engagement/testimonies/${id}/like`,
        BOOKMARK_TESTIMONY: (id: string) => `/engagement/testimonies/${id}/bookmark`,
        GET_REPLIES: (id: string) => `/testimonies/${id}/replies`
    },
    FELLOWSHIP: {
        GET_FELLOWSHIPS: "/fellowships",
        JOIN_FELLOWSHIPS: "/fellowships/join",
        LEAVE_FELLOWSHIPS: "fellowships/leave"
    },
    TOPIC: {
        GET_ALL_TOPIS: "/topics"

    }
}