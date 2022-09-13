import { createSlice } from '@reduxjs/toolkit';

export const mailboxSlice = createSlice({
  name: 'pages/mailbox',
  initialState: {
    conversations: null,
    selectedConversation: null,
    searchingForUser: false,
  },
  reducers: {
    setConversations(state, action) {
      state.conversations = action.payload;
    },
    setMailboxMessages(state, action) {
      const mailboxId = action.payload.mailboxId;
      state.conversations.find((item) => item.id === mailboxId).messages =
        action.payload.messages;

      if (state.selectedConversation.id === mailboxId) {
        state.selectedConversation.messages = action.payload.messages;
      }
    },
    setSelectedConversation(state, action) {
      const mailboxId = action.payload;
      state.selectedConversation = state.conversations.find(
        (item) => item.id === mailboxId
      );
    },
    setSearchingForUser(state, action) {
      state.searchingForUser = action.payload;
    },
    deleteConversation(state, action) {
      const mailboxId = action.payload;

      state.conversations = state.conversations.filter(
        (conversation) => conversation.id !== mailboxId
      );

      if (state.selectedConversation.id === mailboxId) {
        state.selectedConversation = null;
      }
    },
    addNewMailbox(state, action) {
      state.conversations = [action.payload, ...state.conversations];
    },
  },
});

export const {
  setConversations,
  setSelectedConversation,
  setSearchingForUser,
  addNewMailbox,
  setMailboxMessages,
  deleteConversation,
} = mailboxSlice.actions;

export default mailboxSlice.reducer;
