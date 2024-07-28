import UserReducer from '@/redux/features/User'
import { authApi } from './api/auth'

export const reducer = {
    user: UserReducer,
    [authApi.reducerPath]: authApi.reducer
}

export const middleWares = [
    authApi.middleware
]