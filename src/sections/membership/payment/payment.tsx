"use client";

import React, { useState } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Box, Button, Dialog, DialogTitle, Grid, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from "../../../assets/icons/close-icon.svg";
import Image from "next/image";
import { FormProvider, RHFTextField } from "@/components/rhf";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { paymentFormData } from "./payment.data";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { usePaymentCaptureMutation } from "@/services/payment/payment-api";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect } from "react";


interface PaymentProps {
  isPaymentGateWay: boolean;
  clientSecret: string;
  plan: any;
  handlePaymentGateWay: (item: any) => void;
}

const stripePromise = loadStripe('pk_test_51O8GwDEK1uKkOktfdOItatbTHY6WHgcUPnW8oYIbQmsdM5oN7g4OETScvqge2Ty1ZyGfVRgVCgJlHma7s9H2D3N400VmrfAYX4'); // Replace 'your_stripe_public_key' with your actual public key

const Payment = (props: PaymentProps) => {
  const { plan, clientSecret, isPaymentGateWay, handlePaymentGateWay } = props;
  const [paymentMutation] = usePaymentCaptureMutation();
  const authUserToken = useSelector((state: RootState) => state.auth.accessToken);

  const methods = useForm<any>({
    resolver: yupResolver(
      Yup.object({
        cardNumber: Yup.string().required("Required Fields!"),
        name: Yup.string().required("Required Fields!"),
        month: Yup.string().required("Required Fields!"),
        year: Yup.string().required("Required Fields!"),
        cvvCode: Yup.string().required("Required Fields!"),
      })
    ),
    defaultValues: { cardNumber: "", name: "", month: "", year: "", cvvCode: "" },
  });

  const { handleSubmit, reset } = methods;
  const [error, setError] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();

  const cardElement = elements?.getElement(CardElement);
  useEffect(() => {
    const initializeStripe = async () => {
      if (!stripe || !elements) {
        return;
      }

      // Wait for elements to be ready
      await elements?.getElement(CardElement);

      const cardElement = elements?.getElement(CardElement);
      // Now you can use cardElement
    };

    initializeStripe();
  }, [stripe, elements]);

  return (
    <Elements stripe={stripePromise}>
      <Dialog open={isPaymentGateWay} onClose={handlePaymentGateWay} fullWidth maxWidth="lg">
        <DialogTitle textAlign="right" onClick={handlePaymentGateWay}>
          <Image src={CloseIcon} alt="" style={{ cursor: "pointer" }} />
        </DialogTitle>
        <Box sx={{ px: { xs: "24px", md: "64px" }, pb: "64px" }}>
          <Typography variant="h4" color="info.main" classes={{ root: "font-grotesk" }}>
            Payment Details
          </Typography>
          <Typography variant="body1" color="info.main" pt="3px">
            You can cancel your subscription anytime, in settings.
          </Typography>
          <Grid container spacing={5} sx={{ pt: "40px" }}>
            <Typography variant="subtitle1" color="info.main" pb="8px" fontWeight={500}>
              Card Details
            </Typography>
            <Box sx={{ width: "100%" }}>
              <PaymentElement

              />
              {/* <FormProvider
                style={{ width: "600px" }}
                onSubmit={onSubmit}>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#000000",
                        "::placeholder": {
                          color: "#000000",
                          backgroundColor: "#F4F4F4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
                <Button type="submit" variant="contained" sx={{ mt: "24px" }}>
                  Pay
                </Button>
              </FormProvider> */}
            </Box>

            {/* <Grid item xs={12} md={6}>
              <Box sx={styles.purchaseDetails}>
                <Typography variant="subtitle1">Purchase Details</Typography>
                <Stack spacing={2} direction="row" sx={styles.totalContent}>
                  <Typography variant="subtitle1" color="info.main">
                    Order Total
                  </Typography>
                  <Typography variant="subtitle1" color="info.main">
                    $19.00
                  </Typography>
                </Stack>
                <Stack spacing={2} direction="row" sx={styles.totalContent}>
                  <Typography variant="subtitle1" color="info.main">
                    Discounts
                  </Typography>
                  <Typography variant="subtitle1" color="info.main">
                    $0.00
                  </Typography>
                </Stack>
                <Stack spacing={2} direction="row" sx={{ ...styles.totalContent, pb: "24px" }}>
                  <TextField name="discoutCode" placeholder="Discout code" fullWidth sx={styles.textField} />
                  <Button type="submit" variant="outlined">
                    APPLY
                  </Button>
                </Stack>
                <Stack spacing={2} direction="row" sx={{ ...styles.totalContent, borderTop: "1px solid #F4F4F4" }}>
                  <Typography variant="subtitle1" color="info.main">
                    Total
                  </Typography>
                  <Typography variant="subtitle1" color="info.main">
                    $19.00
                  </Typography>
                </Stack>
              </Box>
            </Grid> */}
          </Grid>
        </Box>
      </Dialog>
    </Elements>
  );
};

export default Payment;

const styles = {
  purchaseDetails: {
    boxShadow: "0px 4px 12px 0px #0000001A",
    border: "1px solid #F4F4F4",
    p: "24px 16px",
    borderRadius: "6px",
    "& > h6": {
      color: "grey.600",
      fontSize: "18px",
      borderBottom: "1px solid #F4F4F4",
      pb: "24px",
    },
  },
  totalContent: {
    justifyContent: "space-between",
    alignItems: "center",
    pt: "24px",
  },
  textField: {
    "& .MuiInputBase-root": {
      height: "57px",
    },
  },
};