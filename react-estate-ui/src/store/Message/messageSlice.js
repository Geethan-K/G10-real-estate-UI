import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Actions for creating a post (POST)
     addNewMessageRequest: (state) => {
        state.loading = true;
      },
      addNewMessageSuccess: (state, action) => {
        state.loading = false;
        state.list.push(action.payload); // Add the new post to the list
      },
      addNewMessageFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      searchKeywordRequest:(state) => {
        state.loading = true;
      },
      searchKeywordSuccess: (state,action) => {
        state.loading = false;
        state.list.push(action.payload);
      },
      searchKeywordFailure: (state,action) => {
        state.loading = false;
        state.error = action.payload
      }
  },
 },
);

export const {
   addNewMessageRequest,
   addNewMessageFailure,
   addNewMessageSuccess,
   searchKeywordRequest,
   searchKeywordFailure,
   searchKeywordSuccess
} = messageSlice.actions;

export default messageSlice.reducer;
