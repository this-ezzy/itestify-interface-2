import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import appReducer from "./Slices/appSlice";
import authReducer from "./Slices/authSlice";
import testimonyReducer from "./Slices/testimonySlice";

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        testimony: testimonyReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
