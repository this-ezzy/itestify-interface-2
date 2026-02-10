export interface AuthResponse {
    user: AuthUser;
    token: string;
    refreshToken: string
}

export interface AuthUser {
    id: number;
    created_at: string;        // ISO datetime
    updated_at: string;        // ISO datetime
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    bio: string;
    avatar: string | null;
    email_verified_at: string | null;
}


export interface AuthRegisterReq {
    email: string
    password: string
}
export interface AuthLoginReq {
    identifier: string
    password: string
}

export interface AuthVerifyReq {
    code: string
}