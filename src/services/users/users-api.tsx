import { baseAPI } from "../base-api";
import { DETAILS } from "../tags";

export const usersAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    details: builder.query({
      query: ({ id }: any) => ({
        url: `user-details/${id}`,
        method: "GET",
      }),
      providesTags: [DETAILS],
    }),
  }),
});

export const { useDetailsQuery } = usersAPI;
