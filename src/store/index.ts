import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";
import type { ThunkAction } from "redux-thunk";
import type { AnyAction } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { enableDevTools } from "../../config";
import { baseAPI } from "@/services/base-api";
import { authReducer } from "@/slices/auth";
import { userReducer } from "@/slices/user";
import { chatReducer } from "@/slices/chat";
import { paymentReducer } from "@/slices/payment";
import favoritesReducer from "../slices/favorites/reducer";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth", "user", "chat", "payment"],
};

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  chat: chatReducer,
  payment: paymentReducer,
  [baseAPI.reducerPath]: baseAPI.reducer,
  favorites: favoritesReducer
});

const rootReducer = (state: any, action: any): any => {
  // Clear all data in redux store to initial.
  if (action.type === "auth/logout") {
    state = undefined;
   
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: enableDevTools as boolean,
  middleware: (defaultMiddleware) => defaultMiddleware().concat(baseAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const useDispatch = (): any => useReduxDispatch<AppDispatch>();
