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
        updateUser: builder.mutation<IUsers, { id: number; email: string; phone: string; firstName: string; lastName: string }>({
            query: (data) => ({
                url: `/user`, // Adjust the endpoint if needed
                method: 'PUT', // Use 'PUT' for full update
                data: {
                    id: data.id,
                    email: data.email,
                    phone: data.phone,
                    firstName: data.firstName,
                    lastName: data.lastName,
                },
            }),
            invalidatesTags: ['User'],
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
            },
            invalidatesTags: ['User']
        })
    })
})

export const { useGetUsersQuery, usePostUsersMutation, useUpdateUserMutation, useDeleteUsersMutation } = userApi