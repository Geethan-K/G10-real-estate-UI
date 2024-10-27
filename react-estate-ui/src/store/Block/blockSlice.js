import { createSlice } from '@reduxjs/toolkit';

const blockSlice = createSlice({
  name: 'block',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchBlockedUsersRequest: (state) => {
      state.loading = true;
    },
    fetchBlockedUsersSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchBlockedUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
     // Actions for creating a post (POST)
     blockUserRequest: (state) => {
        state.loading = true;
      },
      blockUserSuccess: (state, action) => {
        state.loading = false;
        state.list.push(action.payload); // Add the new post to the list
      },
      blockUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    // other actions like addPostRequest, addPostSuccess, etc.
  },
});

export const {
    fetchBlockedUsersRequest,
    fetchBlockedUsersSuccess,
    fetchBlockedUsersFailure,
    blockUserRequest,
    blockUserSuccess,
    blockUserFailure
} = blockSlice.actions;

export default blockSlice.reducer;
