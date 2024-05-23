import { createSlice } from "@reduxjs/toolkit";

interface AddHallModal {
    show: boolean;
}

const initialState: AddHallModal = {
    show: false,
};

const addHallModalSlice = createSlice({
    initialState,
    name: "addHallModal",
    reducers: {
        showAddHallModal: (state: AddHallModal) => {
            state.show = true;
        },
        hideAddHallModal: (state: AddHallModal) => {
            state.show = false;
        },
    },
});

export const { hideAddHallModal, showAddHallModal } = addHallModalSlice.actions;
export default addHallModalSlice.reducer;
