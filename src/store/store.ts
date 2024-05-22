import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import toastSlice from "./toast/toastSlice";
import cinemaSlice from "./cinema/cinemaSlice";
import addMovieModalSlice from "./addMovieModal/addMovieModalSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        toast: toastSlice,
        cinema: cinemaSlice,
        addMovieModal: addMovieModalSlice,
    },
});

export type IRootState = ReturnType<typeof store.getState>;
