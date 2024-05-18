import { ChangePasswordCredentials, LoginCredentials, EmailCheck } from "@/types/auth";
import { baseAPI } from "./base-api";

export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: LoginCredentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    checkEmail: builder.mutation({
      query: (email: EmailCheck) => ({
        url: "check-email-exists",
        method: "POST",
        body: email,
      }),
    }),
    registerAgency: builder.mutation({
      query: (data: any) => ({
        url: "register/agency",
        method: "POST",
        body: data,
      }),
    }),
    registerSurrogacy: builder.mutation({
      query: (data: any) => ({
        url: "register/surrogate",
        method: "POST",
        body: data,
      }),
    }),
    registerIndendedParents: builder.mutation({
      query: (data: any) => ({
        url: "register/intended-parent",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (credentials: ChangePasswordCredentials) => ({
        url: "change-password",
        method: "PUT",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
    delete: builder.mutation({
      query: () => ({
        url: "delete-account",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterAgencyMutation,
  useChangePasswordMutation,
  useRegisterSurrogacyMutation,
  useRegisterIndendedParentsMutation,
  useLogoutMutation,
  useDeleteMutation,
  useCheckEmailMutation,
} = authAPI;
