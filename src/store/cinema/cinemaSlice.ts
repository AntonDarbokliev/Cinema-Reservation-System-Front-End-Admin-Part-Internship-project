import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Cinema } from "../../features/CinemasList/interfaces/cinemaInterface";

const initialState: Cinema = {
    _id: "",
    address: "",
    hallPlans: [],
    menu: [],
    name: "",
    numberOfHalls: "0",
    projections: [],
};

const cinemaSlice = createSlice({
    initialState,
    name: "cinema",
    reducers: {
        addCinema: (_: Cinema, action: PayloadAction<Cinema>) => {
            return action.payload;
        },
    },
});

export const { addCinema } = cinemaSlice.actions;
export default cinemaSlice.reducer;
