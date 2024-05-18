import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/types/auth";
import { authAPI } from "@/services/auth-api";
import { setSessionStorage } from "@/utils/session-storage";
import { getSessionStorage } from "@/utils/session-storage";

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: "",
  user: {},
  role: ''
};

// Retrieve user state from session storage when initializing Redux store
const storedUser = getSessionStorage("user");
if (storedUser) {
  initialState.isAuthenticated = true; // Assuming if user is in session storage, user is authenticated
  initialState.user = storedUser;
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      state.isAuthenticated = false;
      state.user = {};
      state.accessToken = "";
      state.role = "";
      // Clear user state from session storage on logout
      setSessionStorage("user", null);
      setSessionStorage("accessToken", "");
      setSessionStorage("role", "");
      setSessionStorage("isAuthenticated", false);
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      // Store user state in session storage when setting user
      setSessionStorage("user", action.payload);
      setSessionStorage("isAuthenticated", true);
    },
    setUserAnyItem: (state, action: PayloadAction<any>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
      setSessionStorage("user", state.user);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authAPI.endpoints.login.matchFulfilled, (state, action) => {
      const data = action.payload;
      state.accessToken = data?.access_token;
      state.user = data?.user;
      state.role = data?.user?.user_type;
      state.isAuthenticated = true;
      setSessionStorage("accessToken", data?.access_token);
      setSessionStorage("user", data?.user);
      setSessionStorage("role", data?.user?.user_type);
      setSessionStorage("isAuthenticated", data?.isAuthenticated);
    });
  },
});

export const setUser = slice.actions;
export const authActions = slice.actions;
export const authReducer = slice.reducer;
