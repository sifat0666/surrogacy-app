import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDetails {
  [key: string]: any;
}

interface UserState {
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
  details: {
    [key: string]: UserDetails;
  };
}

const initialState: UserState = {
  email: "",
  password: "",
  password_confirmation: "",
  role: "",
  details: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserField: (state: UserState, action: PayloadAction<Partial<UserState>>) => {
      const { email, password, password_confirmation, role, details } = action.payload;

      if (email !== undefined) state.email = email;
      if (password !== undefined) state.password = password;
      if (password_confirmation !== undefined) state.password_confirmation = password_confirmation;
      if (role !== undefined) state.role = role;

      if (details !== undefined) {
        for (const key in details) {
          if (key in state.details) {
            state.details[key] = { ...state.details[key], ...details[key] };
          } else {
            state.details[key] = details[key];
          }
        }
      }

      return state;
    },
  },
});

export const { setUserField } = userSlice.actions;
export const userReducer = userSlice.reducer;
