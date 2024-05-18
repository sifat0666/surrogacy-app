import { baseAPI } from "../base-api";

export const paymentAPI = baseAPI.injectEndpoints({
    endpoints: (builder: any) => ({
        createIntentPayment: builder.mutation({

            query: (data: any) => ({
                url: "create-payment-intent",
                method: "POST",
                body: data

            }),
        }),
        paymentCapture: builder.mutation({
            query: (data: any) => ({
                url: `capture-payment-intent`,
                method: "POST",
                body: data
            })
        })
    }),
});

export const {
    useCreateIntentPaymentMutation,
    usePaymentCaptureMutation
} = paymentAPI;
