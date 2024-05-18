import { baseAPI } from "../base-api";
import { DETAILS } from "../tags";

export const blogsAPI = baseAPI.injectEndpoints({
  endpoints: (builder: any) => ({
    getBlogs: builder.query({
      query: ({ ...params }) => ({
        url: `blogs`,
        method: "GET",
        params
      }),
      providesTags: [DETAILS],
    }),
  }),
});

export const { useGetBlogsQuery } = blogsAPI;
