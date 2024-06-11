import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Cinema } from "../../features/CinemasList/interfaces/cinemaInterface";
import { Movie } from "../../features/MoviesList/interfaces/Movie";
import { UnpopulatedProjection } from "../../features/MovieDetails/interfaces/unpopulatedProjection";

const initialState: Cinema = {
    _id: "",
    address: "",
    halls: [],
    menu: [],
    name: "",
    numberOfHalls: "0",
    projections: [],
    movies: [],
};

const cinemaSlice = createSlice({
    initialState,
    name: "cinema",
    reducers: {
        addCinema: (_: Cinema, action: PayloadAction<Cinema>) => {
            return action.payload;
        },
        addMovieToCinema: (state: Cinema, action: PayloadAction<Movie>) => {
            state.movies.push(action.payload);
        },
        addProjectionToCinema: (state: Cinema, action: PayloadAction<UnpopulatedProjection>) => {
            state.projections.push(action.payload);
        },
    },
});

export const { addCinema, addMovieToCinema, addProjectionToCinema } = cinemaSlice.actions;
export default cinemaSlice.reducer;
