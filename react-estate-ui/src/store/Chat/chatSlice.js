import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchChatsRequest: (state) => {
      state.loading = true;
    },
    fetchChatsSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchChatsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchUniqueChatRequest: (state) => {
        alert('fetch Req')
      state.loading = true;
    },
    fetchUniqueChatSuccess: (state, action) => {
        alert('req succ')
      state.loading = false;
      state.list = action.payload;
    },
    fetchUniqueChatFailure: (state, action) => {
        alert('req fail')
      state.loading = false;
      state.error = action.payload;
    },
    fetchReceiverStatusRequest: (state) => {
     state.loading = true;
    },
    fetchReceiverStatusSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchReceiverStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // other actions like addPostRequest, addPostSuccess, etc.
  },
});

export const {
   fetchChatsRequest,
   fetchChatsSuccess,
   fetchChatsFailure,
   fetchUniqueChatRequest,
   fetchUniqueChatFailure,
   fetchUniqueChatSuccess,
   fetchReceiverStatusRequest,
   fetchReceiverStatusSuccess,
   fetchReceiverStatusFailure
} = chatSlice.actions;

export default chatSlice.reducer;
