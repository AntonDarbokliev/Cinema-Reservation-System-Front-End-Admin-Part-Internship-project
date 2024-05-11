import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Toast {
    text: string;
    type: "danger" | "success";
    id: string;
}

export interface ToastState {
    toasts: Toast[];
}

const initialState: ToastState = {
    toasts: [],
};

const toastSlice = createSlice({
    initialState,
    name: "toast",
    reducers: {
        addToast: (state: ToastState, action: PayloadAction<Toast>) => {
            const stateCopy = state.toasts.slice();
            return { toasts: [...stateCopy, action.payload] };
            // State is immutable, though redux toolkit allows us to use mutatable syntax, it's a bit confusing
        },
        removeToast: (state: ToastState, action: PayloadAction<string>) => {
          return {toasts: state.toasts.filter(x => x.id !== action.payload)}
        }
    },
});

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
