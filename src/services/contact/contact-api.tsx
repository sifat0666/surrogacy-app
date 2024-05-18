import { baseAPI } from "../base-api";

export const contactAPI = baseAPI.injectEndpoints({
  endpoints: (builder: any) => ({
    postContact: builder.mutation({
      query: (body: any) => ({
        url: "contact",
        method: "POST",
        body
      }),
    }),
   
  }),
});

export const {
  usePostContactMutation,
} = contactAPI;
