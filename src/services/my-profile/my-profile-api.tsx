import { baseAPI } from "../base-api";
import { PROFILE } from "../tags";

export const myProfileAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    agencyRegister: builder.mutation({
      query: ( data: any ) => ({
        url: "agency/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [PROFILE],
    }),
    getAgencyUser: builder.query({
      query: () => ({
        url: "agency/users",
        method: "GET",
      }),
      providesTags: [PROFILE],
    }),
    updateAgencyUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `agency/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [PROFILE],
    }),
    deleteAgencyUser: builder.mutation({
      query: ({ id }) => ({
        url: `agency/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [PROFILE],
    }),
  }),
});

export const { useAgencyRegisterMutation, useGetAgencyUserQuery, useUpdateAgencyUserMutation, useDeleteAgencyUserMutation } = myProfileAPI;
