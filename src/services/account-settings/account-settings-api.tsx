import { baseAPI } from "../base-api";

export const accountSettingsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    cancelMemeber: builder.mutation({
      query: () => ({
        url: "cancel-membership",
        method: "POST",
      }),
    }),
   
  }),
});

export const {
  useCancelMemeberMutation,
} = accountSettingsAPI;
