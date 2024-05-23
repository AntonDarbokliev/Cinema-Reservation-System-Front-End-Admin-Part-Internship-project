import { createSlice } from "@reduxjs/toolkit";

interface AddFoodAndBeverageModal {
    show: boolean;
}

const initialState: AddFoodAndBeverageModal = {
    show: false,
};

const addFoodAndBeverageModalSlice = createSlice({
    initialState,
    name: "addFoodAndBeverageModal",
    reducers: {
        showAddFoodAndBeverageModal: (state: AddFoodAndBeverageModal) => {
            state.show = true;
        },
        hideAddFoodAndBeverageModal: (state: AddFoodAndBeverageModal) => {
            state.show = false;
        },
    },
});

export const { hideAddFoodAndBeverageModal, showAddFoodAndBeverageModal } = addFoodAndBeverageModalSlice.actions;
export default addFoodAndBeverageModalSlice.reducer;
