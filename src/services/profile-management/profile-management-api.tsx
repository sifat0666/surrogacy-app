import { baseAPI } from "../base-api";

export const profileManagementAPI = baseAPI.injectEndpoints({
  endpoints: (builder: any) => ({
    agencyAbout: builder.mutation({
      query: (data: any) => ({
        url: "update-profile-about",
        method: "PUT",
        body: data,
      }),
    }),
    updateProfileSurrogateSurrogacy: builder.mutation({
      query: (data: any) => ({
        url: "update-profile-surrogacy",
        method: "PUT",
        body: data
      }),
    }),
    updateProfileContact: builder.mutation({
      query: (data: any) => ({
        url: "update-profile-contact",
        method: "PUT",
        body: data
      }),
    }),
  }),
});

export const {
  useAgencyAboutMutation,
  useUpdateProfileSurrogateSurrogacyMutation,
  useUpdateProfileContactMutation
} = profileManagementAPI;
