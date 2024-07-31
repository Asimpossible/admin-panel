import UserReducer from '@/redux/features/Login'
import { authApi } from './api/auth'
import { partnerApi } from './api/partner'
import { userApi } from './api/users'

export const reducer = {
    user: UserReducer,
    [authApi.reducerPath]: authApi.reducer,
    [partnerApi.reducerPath]: partnerApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
}

export const middleWares = [
    authApi.middleware,
    partnerApi.middleware,
    userApi.middleware
]