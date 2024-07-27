import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "./types";

const initialState: IUser = {
    id: 0,
    email: '',
    expiresAt: '',
    firstName: '',
    lastName: '',
    refreshToken: '',
    token: '',
    username: ''

}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state: IUser, action: PayloadAction<Pick<IUser, 'expiresAt' | 'refreshToken' | 'token'>>) => {
            const { refreshToken, expiresAt, token } = action.payload
            return {
                ...state,
                token,
                expiresAt,
                refreshToken
            }

        }
    }

})

export const { setToken } = userSlice.actions
export default userSlice.reducer