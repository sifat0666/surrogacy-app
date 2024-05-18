import { createSlice } from "@reduxjs/toolkit";
import { chatAPI } from "@/services/chat/chat-api";

const initialState = {
  chats: [],
  message: "",
  status: '',
};

const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(chatAPI.endpoints.postChat.matchFulfilled, (state: any, action: any) => {
      state.chats = action.payload.chats;
      state.message = action.payload.message;
      state.status = action.payload.status;
    });
  },
});

export const chatActions = slice.actions;
export const chatReducer = slice.reducer;
