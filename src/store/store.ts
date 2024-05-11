import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import toastSlice from "./toast/toastSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        toast: toastSlice,
    },
});

export type IRootState = ReturnType<typeof store.getState>;
