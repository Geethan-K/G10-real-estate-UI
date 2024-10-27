import { createSlice } from '@reduxjs/toolkit';

const followSlice = createSlice({
  name: 'follow',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchFollowersRequest: (state) => {
      state.loading = true;
    },
    fetchFollowersSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchFollowersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchFollowingsRequest: (state) => {
        state.loading = true;
      },
      fetchFollowingsSuccess: (state, action) => {
        state.loading = false;
        state.list = action.payload;
      },
      fetchFollowingsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    fetchIsFollowingRequest: (state) => {
      state.loading = true;
    },
    fetchIsFollowingSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchIsFollowingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    postFollowUserRequest: (state) => {
      state.loading = true;
    },
    postFollowUserSuccess: (state, action) => {
      state.loading = false;
      state.list.push(action.payload); // Add the new post to the list
    },
    PostFollowUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    postUnFollowUserRequest: (state) => {
      state.loading = true;
    },
    postUnFollowUserSuccess: (state, action) => {
      state.loading = false;
      state.list.push(action.payload); // Add the new post to the list
    },
    PostUnFollowUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // other actions like addPostRequest, addPostSuccess, etc.
  },
});

export const {
    fetchFollowersRequest,
    fetchFollowersSuccess,
    fetchFollowersFailure,
    fetchFollowingsRequest,
    fetchFollowingsFailure,
    fetchFollowingsSuccess,
    fetchIsFollowingRequest,
    fetchIsFollowingSuccess,
    fetchIsFollowingFailure,
    postFollowUserRequest,
    PostFollowUserFailure,
    postFollowUserSuccess,
    postUnFollowUserRequest,
    postUnFollowUserSuccess,
    PostUnFollowUserFailure,
} = followSlice.actions;

export default followSlice.reducer;
