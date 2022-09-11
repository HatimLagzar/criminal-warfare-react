import {createSlice} from '@reduxjs/toolkit';

export const mailboxSlice = createSlice({
  name: 'pages/mailbox',
  initialState: {
    conversations: null,
    selectedConversation: null,
    searchingForUser: false
  },
  reducers: {
    setConversations(state, action) {
      state.conversations = action.payload;
    },
    setSelectedConversation(state, action) {
      state.selectedConversation = action.payload;
    },
    setSearchingForUser(state, action) {
      state.searchingForUser = action.payload;
    },
    addNewMailbox(state, action) {
      state.conversations = [
        action.payload,
        ...state.conversations
      ]
    }
  },
});

export const {setConversations, setSelectedConversation, setSearchingForUser, addNewMailbox} = mailboxSlice.actions;

export default mailboxSlice.reducer;
