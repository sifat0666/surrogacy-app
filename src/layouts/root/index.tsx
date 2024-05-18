"use client";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";
import type { Settings } from "@/types/settings";
import { store } from "@/store";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme";
import { Toaster } from "react-hot-toast";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from "redux-persist";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';

interface LayoutProps {
  children: ReactNode;
  settings?: Settings;
}

const stripePromise = loadStripe('pk_live_51O8GwDEK1uKkOktf32tpog1pFPwy7QsxuvqPkxNI9glmZtogOuU6Mp3Y1HqvXzwmgAcShn97e2DuiukLOoRV2SkQ00vRbme24Y');

export function Layout(props: LayoutProps): JSX.Element {
  const { children } = props;

  const persistor = persistStore(store);

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Elements stripe={stripePromise}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {children}
                <Toaster />
              </LocalizationProvider>
            </Elements>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </NextAppDirEmotionCacheProvider>
  );
}
