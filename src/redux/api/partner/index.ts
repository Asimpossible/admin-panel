import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { APIBaseQuery } from "../axiosBase";
import { IPartner, ISendPartner } from "./types";

export const partnerApi = createApi({
    reducerPath: 'partner',
    baseQuery: APIBaseQuery as BaseQueryFn,
    endpoints: (builder) => ({
        getPartner: builder.query<IPartner, void>({
            query() {
                return {
                    url: 'partner',
                    method: 'GET'
                }
            }
        }),
        postPartner: builder.mutation<IPartner, ISendPartner>({
            query(data: ISendPartner) {
                return {
                    url: 'partner',
                    method: 'POST',
                    data
                }
            }
        })
    })
})

export const { useGetPartnerQuery, usePostPartnerMutation } = partnerApi