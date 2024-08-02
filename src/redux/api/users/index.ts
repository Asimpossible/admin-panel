import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { APIBaseQuery } from "../axiosBase";
import { ISendUser, IUsers, IUsersData } from "./types";
import { postUser } from "@/redux/features/User";

export const userApi = createApi({
    reducerPath: "userApi",
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
        postUsers: builder.mutation<IUsers, ISendUser>({
            query(data: ISendUser) {
                return {
                    url: 'user/register',
                    method: 'POST',
                    data
                }
            },
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(postUser(data))
                    console.log(data)
                }
                catch (e) { console.log('post error', e) }
            },
        })
    })
})

export const { useGetUsersQuery, usePostUsersMutation } = userApi