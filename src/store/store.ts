import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import toastSlice from "./toast/toastSlice";
import cinemaSlice from "./cinema/cinemaSlice";
import addCinemaModalSlice from "./addCinemaModal/addCinemaModalSlice";
import addHallModalSlice from "./addHallModal/addHallModalSlice";
import addFoodAndBeverageModalSlice from "./addFoodBeverageModal/addFoodBeverageModalSlice";
import addEditMovieModalSlice from "./addEditMovieModal/addEditMovieModalSlice";
import socketMiddleware from "./webSocket/socketMiddleware";
import socketSlice from "./webSocket/socketSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        toast: toastSlice,
        cinema: cinemaSlice,
        addEditMovieModal: addEditMovieModalSlice,
        addCinemaModal: addCinemaModalSlice,
        addHallModal: addHallModalSlice,
        addFoodAndBeverageModal: addFoodAndBeverageModalSlice,
        socket: socketSlice,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat([socketMiddleware]);
    },
});

export type IRootState = ReturnType<typeof store.getState>;
