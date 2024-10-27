import { createSlice } from '@reduxjs/toolkit';

const likeSlice = createSlice({
  name: 'like',
  initialState: {
    list: [],
    message:null,
    response:null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchLikesRequest: (state) => {
      state.loading = true;
    },
    fetchLikesSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchLikesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    postLikeRequest: (state) => {
      state.loading = true;
    },
    postLikeSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message
      state.response = action.payload.response
    //  state.list=action.payload; // Add the new post to the list
    },
    postLikeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchLikesRequest,
  fetchLikesSuccess,
  fetchLikesFailure,
  postLikeRequest,
  postLikeSuccess,
  postLikeFailure
} = likeSlice.actions;

export default likeSlice.reducer;
