import { createSlice } from "@reduxjs/toolkit";

interface AddCinemaModal {
    show: boolean;
}

const initialState: AddCinemaModal = {
    show: false,
};

const addCinemaModalSlice = createSlice({
    initialState,
    name: "addCinemaModal",
    reducers: {
        showAddCinemaModal: (state: AddCinemaModal) => {
            state.show = true;
        },
        hideAddCinemaModal: (state: AddCinemaModal) => {
            state.show = false;
        },
    },
});

export const { hideAddCinemaModal, showAddCinemaModal } = addCinemaModalSlice.actions;
export default addCinemaModalSlice.reducer;
