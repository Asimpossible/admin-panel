import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { APIBaseQuery } from "../axiosBase";
import { ISendUser, IUsers, IUsersData } from "./types";
import { postUser } from "@/redux/features/User";

export const userApi = createApi({
    reducerPath: "userApi",
    tagTypes: [
        'User'
    ],
    baseQuery: APIBaseQuery as BaseQueryFn,
    endpoints: (builder) => ({
        getUsers: builder.query<IUsersData, void>({
            query() {
                return {
                    url: 'user',
                    method: 'GET'
                }
            },
            providesTags: ['User']
        }),
        postUsers: builder.mutation<IUsers[], ISendUser>({
            query(data: ISendUser) {
                return {
                    url: 'user/register',
                    method: 'POST',
                    data
                }
            },
            invalidatesTags: ['User'],
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(postUser(data))
                }
                catch (e) { console.log('post error', e) }
            },
        }),
        deleteUsers: builder.mutation<void, number>({
            query(id: number) {
                return {
                    url: 'user',
                    method: 'DELETE',
                    data: { id: [id] },
                    headers: {
                        'Content-Type': 'appplication/json'
                    }
                }
            }
        })
    })
})

export const { useGetUsersQuery, usePostUsersMutation, useDeleteUsersMutation } = userApi