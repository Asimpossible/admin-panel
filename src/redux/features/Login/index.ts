import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILogin, IUser } from "./types";
import { revertAll } from "@/shared/constants/models";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const initialState: ILogin = {
    user: {
        id: 0,
        email: '',
        firstName: '',
        lastName: '',
        username: ''
    },
    token: '',
    refreshToken: '',
    expiresAt: ''
}

export const userSlice = createSlice({
    name: 'loginUser',
    initialState,
    reducers: {
        setToken: (state: ILogin, action: PayloadAction<Pick<ILogin, 'expiresAt' | 'refreshToken' | 'token'>>) => {
            const { refreshToken, expiresAt, token } = action.payload
            return {
                ...state,
                token,
                expiresAt,
                refreshToken
            }

        },
        setUser: (state: ILogin, action: PayloadAction<IUser>) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => builder.addCase(revertAll, () => initialState)

})

export const { setToken, setUser } = userSlice.actions

const userPersist = persistReducer({
    storage: storage,
    key: 'Deyerlisen',
    whitelist: [
        'user',
        'token',
        'refreshToken',
        'expiresAt'
    ]
}, userSlice.reducer)

export default userPersist