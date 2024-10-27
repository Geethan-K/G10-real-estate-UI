import { createSlice } from '@reduxjs/toolkit';

const shareSlice = createSlice({
  name: 'share',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchSharedCountRequest: (state) => {
      state.loading = true;
    },
    fetchSharedCountSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchSharedCountFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    postShareRequest: (state) => {
      state.loading = true;
    },
    postShareSuccess: (state, action) => {
      state.loading = false;
      state.list.push(action.payload); // Add the new post to the list
    },
    postShareFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // other actions like addPostRequest, addPostSuccess, etc.
  },
});

export const {
    fetchSharedCountRequest,
    fetchSharedCountFailure,
    fetchSharedCountSuccess,
    postShareRequest,
    postShareSuccess,
    postShareFailure,
} = shareSlice.actions;

export default shareSlice.reducer;
