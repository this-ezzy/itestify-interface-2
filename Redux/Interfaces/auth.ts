export type ActiveAuthModal = "login" | "register" | "forgotPassword" | "verifyEmail" | "completeProfile" | "joinCommunity";

export interface AuthState {
    showAuthModal: boolean;
    activeAuthMethod: ActiveAuthModal
}