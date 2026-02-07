import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../Interfaces/app";


const initialState: AppState = {
    isAppMenuOpen: false,
    googleAuthLoading: false,
    showAuthModal: false,
    showNavTestimonyButton: false,
    showAboutModal: false
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleAppMenu: (state) => {
            state.isAppMenuOpen = !state.isAppMenuOpen
        },
        updateGoogleAuthLoading: (state, action: PayloadAction<boolean>) => {
            state.googleAuthLoading = action.payload
        },
        toggleShowAuthModal: (state, action: PayloadAction<boolean>) => {
            state.showAuthModal = action.payload
        },
        toggleShowAboutModal: (state, action: PayloadAction<boolean>) => {
            state.showAboutModal = action.payload
        },
        updateShowNavTestimonyButton: (state, action: PayloadAction<boolean>) => {
            state.showNavTestimonyButton = action.payload
        },
    },
});

export const
    { toggleAppMenu,
        updateGoogleAuthLoading,
        toggleShowAuthModal,
        updateShowNavTestimonyButton,
        toggleShowAboutModal
    } = appSlice.actions;

export default appSlice.reducer;
