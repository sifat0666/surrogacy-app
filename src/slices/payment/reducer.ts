import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { paymentAPI } from "@/services/payment/payment-api";

interface PaymentState {
  payment: {
    monthlyAmount: number;
    quarterlyAmount: number;
    yearlyAmount: number;
  };
  secret: string;
  status: string;
}

const initialState: PaymentState = {
  payment: {
    monthlyAmount: 14,
    quarterlyAmount: 49,
    yearlyAmount: 888,
  },
  secret: "",
  status: "",
};

const slice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      paymentAPI.endpoints.createIntentPayment.matchFulfilled,
      (state, action: PayloadAction<any>) => {
        const { monthlyAmount, quarterlyAmount, yearlyAmount, secret, status } = action.payload;
        state.payment.monthlyAmount = monthlyAmount;
        state.payment.quarterlyAmount = quarterlyAmount;
        state.payment.yearlyAmount = yearlyAmount;
        state.secret = secret;
        state.status = status;
      }
    );
  },
});

export const paymentActions = slice.actions;
export const paymentReducer = slice.reducer;
