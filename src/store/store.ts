import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import toastSlice from "./toast/toastSlice";
import cinemaSlice from "./cinema/cinemaSlice";
import addCinemaModalSlice from "./addCinemaModal/addCinemaModalSlice";
import addHallModalSlice from "./addHallModal/addHallModalSlice";
import addFoodAndBeverageModalSlice from "./addFoodBeverageModal/addFoodBeverageModalSlice";
import addEditMovieModalSlice from "./addEditMovieModal/addEditMovieModalSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        toast: toastSlice,
        cinema: cinemaSlice,
        addEditMovieModal: addEditMovieModalSlice,
        addCinemaModal: addCinemaModalSlice,
        addHallModal: addHallModalSlice,
        addFoodAndBeverageModal: addFoodAndBeverageModalSlice,
    },
});

export type IRootState = ReturnType<typeof store.getState>;
