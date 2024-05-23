import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import toastSlice from "./toast/toastSlice";
import cinemaSlice from "./cinema/cinemaSlice";
import addMovieModalSlice from "./addMovieModal/addMovieModalSlice";
import addCinemaModalSlice from "./addCinemaModal/addCinemaModalSlice";
import addHallModalSlice from "./addHallModal/addHallModalSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        toast: toastSlice,
        cinema: cinemaSlice,
        addMovieModal: addMovieModalSlice,
        addCinemaModal: addCinemaModalSlice,
        addHallModal: addHallModalSlice,
    },
});

export type IRootState = ReturnType<typeof store.getState>;
