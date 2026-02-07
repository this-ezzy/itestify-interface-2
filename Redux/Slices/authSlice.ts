import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ActiveAuthModal, AuthState } from "../Interfaces/auth";


const initialState: AuthState = {
    showAuthModal: false,
    activeAuthMethod: "login"

};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setActiveAuthMethod: (state, action: PayloadAction<ActiveAuthModal>) => {
            state.activeAuthMethod = action.payload
        },
        toggleAuthModal: (state) => {
            state.showAuthModal = !state.showAuthModal
        }
    },
});

export const
    {
        setActiveAuthMethod,
        toggleAuthModal
    } = authSlice.actions;

export default authSlice.reducer;
