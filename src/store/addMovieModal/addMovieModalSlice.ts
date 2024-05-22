import { createSlice } from "@reduxjs/toolkit";

interface AddMovieModal {
    show: boolean;
}

const initialState: AddMovieModal = {
    show: false,
};

const addMovieModal = createSlice({
    initialState,
    name: "addMovieModal",
    reducers: {
        showAddMovieModal: (state: AddMovieModal) => {
            state.show = true;
        },
        hideAddMovieModal: (state: AddMovieModal) => {
            state.show = false;
        },
    },
});

export const { hideAddMovieModal, showAddMovieModal } = addMovieModal.actions;
export default addMovieModal.reducer;
