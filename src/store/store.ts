import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import toastSlice from "./toast/toastSlice";
import cinemaSlice from "./cinema/cinemaSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        toast: toastSlice,
        cinema: cinemaSlice,
    },
});

export type IRootState = ReturnType<typeof store.getState>;
