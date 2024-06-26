import { createSlice } from "@reduxjs/toolkit";

interface AddEditMovieModal {
    show: boolean;
}

const initialState: AddEditMovieModal = {
    show: false,
};

const addEditMovieModalSlice = createSlice({
    initialState,
    name: "addEditMovieModal",
    reducers: {
        showAddEditMovieModal: (state: AddEditMovieModal) => {
            state.show = true;
        },
        hideAddEditMovieModal: (state: AddEditMovieModal) => {
            state.show = false;
        },
    },
});

export const { hideAddEditMovieModal, showAddEditMovieModal } = addEditMovieModalSlice.actions;
export default addEditMovieModalSlice.reducer;
