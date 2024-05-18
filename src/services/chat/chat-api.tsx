import { baseAPI } from "../base-api";
import { CHATS } from "../tags";

export const chatAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        postChat: builder.mutation({
            query: ({ id }) => ({
                url: `create-chat/${id}`,
                method: "POST",
            }),
            invalidatesTags: [CHATS]
        }),
        loadChat: builder.query({
            query: () => ({
                url: `load-chats`,
                method: "GET",
            }),
            providesTags: [CHATS]
        }),
        loadChatById: builder.mutation({
            query: ({ id }) => ({
                url: `load-chat/${id}`,
                method: "POST",
            }),
            invalidatesTags: [CHATS]
        }),
        sendMessage: builder.mutation({
            query: ({ ...query }) => ({
                url: `send-message`,
                method: "POST",
                body: query
            }),
            invalidatesTags: [CHATS]
        }),
    }),
});

export const {
    usePostChatMutation,
    useLoadChatQuery,
    useLoadChatByIdMutation,
    useSendMessageMutation
} = chatAPI;
