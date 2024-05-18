import { baseAPI } from "../base-api";

export const findServicesAPI = baseAPI.injectEndpoints({
  endpoints: (builder: any) => ({
    home: builder.query({
      query: () => ({
        url: "home",
        method: "GET",
      }),
    }),
    getSurrogates: builder.query({
      query: () => ({
        url: "get-surrogates",
        method: "GET",
      }),
    }),
    getFavorites: builder.query({ // Added new query for getting favorites
      query: (userId: any) => ({
        url: `favorites/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useHomeQuery,
  useGetSurrogatesQuery,
  useGetFavoritesQuery // Export the newly added hook
} = findServicesAPI;