import UserReducer from '@/redux/features/User'
import { authApi } from './api/auth'
import { partnerApi } from './api/partner'

export const reducer = {
    user: UserReducer,
    [authApi.reducerPath]: authApi.reducer,
    [partnerApi.reducerPath]: partnerApi.reducer
}

export const middleWares = [
    authApi.middleware,
    partnerApi.middleware
]