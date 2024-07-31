import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { APIBaseQuery } from "../axiosBase";
import { ISendData } from "./types";
import { ILogin, IUser } from "@/redux/features/Login/types";
import { setToken, setUser } from "@/redux/features/Login";

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: APIBaseQuery as BaseQueryFn,
    endpoints: (builder) => ({
        loginUser: builder.mutation<Pick<ILogin, 'token' | 'refreshToken' | 'expiresAt'>, ISendData>({
            query(data: ISendData) {
                return {
                    url: 'auth/admin/token',
                    method: 'POST',
                    data
                }
            },
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setToken(data))
                    dispatch(authApi.endpoints.getMe.initiate(null))
                }
                catch (e) {
                    console.log('error is: ', e)
                }
            }
        }),
        getMe: builder.query<IUser, null>({
            query() {
                return {
                    url: 'auth/profile',
                    method: 'GET'
                }
            },
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setUser(data))
                }
                catch (e) {
                    console.log('error is: ', e)
                }
            }
        })
    })
})
export const { useLoginUserMutation } = authApi;