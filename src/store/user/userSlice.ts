import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserState {
    firstName: string;
    lastName: string;
    email: string;
    roles: number[];
    iat: number;
    exp: number;
}

const initialState: UserState = {
    firstName: "",
    lastName: "",
    email: "",
    roles: [],
    iat: 0,
    exp: 0,
};

const userSlice = createSlice({
    initialState,
    name: "user",
    reducers: {
        setUser: (_, action: PayloadAction<UserState>) => {
            return action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
