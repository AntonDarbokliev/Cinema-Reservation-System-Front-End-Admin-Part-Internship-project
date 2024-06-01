import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Role } from "../../features/common/interfaces/Role";

export interface UserState {
    firstName: string;
    lastName: string;
    email: string;
    roles: Role[];
    iat: number;
    exp: number;
    id: string;
}

const initialState: UserState = {
    firstName: "",
    lastName: "",
    email: "",
    roles: [],
    iat: 0,
    exp: 0,
    id: "",
};

const userSlice = createSlice({
    initialState,
    name: "user",
    reducers: {
        setUser: (_, action: PayloadAction<UserState>) => {
            return action.payload;
        },
        clearUser: () => {
            return initialState;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
