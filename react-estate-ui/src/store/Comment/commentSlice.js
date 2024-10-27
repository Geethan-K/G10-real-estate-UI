import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchCommentsRequest: (state) => {
      state.loading = true;
    },
    fetchCommentsSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchCommentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    postCommentRequest: (state) => {
        state.loading = true;
    },
    postCommentSuccess: (state, action) => {
        state.loading = false;
        state.list.push(action.payload); // Add the new post to the list
      },
    PostCommentFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
  },
});

export const {
    fetchCommentsRequest,
    fetchCommentsSuccess,
    fetchCommentsFailure,
    postCommentRequest,
    postCommentSuccess,
    PostCommentFailure
} = commentSlice.actions;

export default commentSlice.reducer;
