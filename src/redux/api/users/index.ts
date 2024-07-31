import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { APIBaseQuery } from "../axiosBase";
import { ISendUser, IUsersData } from "./types";

export const userApi = createApi({
    reducerPath: "user api",
    baseQuery: APIBaseQuery as BaseQueryFn,
    endpoints: (builder) => ({
        getUsers: builder.query<IUsersData, void>({
            query() {
                return {
                    url: 'user',
                    method: 'GET'
                }
            }
        }),
        postUsers: builder.mutation<void, ISendUser>({
            query() {
                return {
                    url: 'user',
                    method: 'POST'
                }
            }
        })
    })
})

export const { useGetUsersQuery, usePostUsersMutation } = userApi