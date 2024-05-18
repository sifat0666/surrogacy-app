import { baseAPI } from "../base-api";
import { FAVORITES } from "../tags";

export const favoritesAPI = baseAPI.injectEndpoints({
  endpoints: (builder: any) => ({
    favoritesDetails: builder.query({
      query: () => ({
        url: "favorites",
        method: "GET",
      }),
      providesTags: [FAVORITES],
    }),
    fetchFavorites: builder.query({
      query: (userId: any) => ({
        url: `favorites/${userId}`,
        method: "GET",
      }),
      providesTags: [FAVORITES],
    }),
    favoritesToggleAddRemove: builder.mutation({
      query: (id: number) => ({
        url: `toggle-favorite/${id}`,
        method: "POST",
      }),
      invalidatesTags: [FAVORITES],
    }),
    myFavorites: builder.query({
      query: () => ({
        url: "my-favorites",
        method: "GET",
      }),
      providesTags: [FAVORITES],
    }),

  }),
});

export const { useFavoritesDetailsQuery, useFetchFavoritesQuery, useFavoritesToggleAddRemoveMutation, useMyFavoritesQuery } = favoritesAPI;
