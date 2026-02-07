import { createSlice } from "@reduxjs/toolkit";

import { TestimonyState } from "../Interfaces/testimony";


const initialState: TestimonyState = {
    showTestimonyModal: false
};

const testimonySlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleTestimonyModal: (state) => {
            state.showTestimonyModal = !state.showTestimonyModal
        },
    },
});

export const
    {
        toggleTestimonyModal,

    } = testimonySlice.actions;

export default testimonySlice.reducer;
