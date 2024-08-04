import { IUsers, IUsersData } from "@/redux/api/users/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const initialState: IUsersData = {
    data: [{
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        isActive: true,
        id: 0
    }],
    totalCount: 0
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        postUser: (state: IUsersData, action: PayloadAction<IUsers[]>) => {
            state.data = action.payload
            state.totalCount = action.payload.length
        },
        toggleUserStatus: (state, action: PayloadAction<number>) => {
            const user = state.data.find(user => user.id === action.payload)
            if (user) {
                user.isActive = !user.isActive
            }
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.data.filter(user => user.id !== action.payload)
        }
    }
})

export const { postUser, toggleUserStatus, deleteUser } = usersSlice.actions

const usersPersist = persistReducer({
    key: 'users',
    storage: storage,
    whitelist: [
        'data',
        'totalCount'
    ]

}, usersSlice.reducer)

export default usersPersist;