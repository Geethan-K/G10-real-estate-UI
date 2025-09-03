import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'newsfeed_posts',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchAllPostsRequest: (state) => {
      state.loading = true;
    },
    fetchAllPostsSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchAllPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchUserPostsRequest: (state) => {
      state.loading = true;
    },
    fetchUserPostsSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchUserPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // fetchUsersPropertiesRequest: (state) => {
    //   state.loading = true;
    // },
    // fetchUsersPropertiesSuccess: (state, action) => {
    //   state.loading = false;
    //   state.list = action.payload;
    // },
    // fetchUsersPropertiesFailure: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
   
     // Actions for creating a post (POST)
     addNewPostRequest: (state) => {
        state.loading = true;
      },
      addNewPostRequestSuccess: (state, action) => {
        state.loading = false;
        state.list.push(action.payload); // Add the new post to the list
      },
      addNewPostRequestFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    // other actions like addPostRequest, addPostSuccess, etc.
  },
});

export const {
    fetchAllPostsRequest,
    fetchAllPostsSuccess,
    fetchAllPostsFailure,
    fetchUserPostsRequest,
    fetchUserPostsSuccess,
    fetchUserPostsFailure,
    // fetchPropertyDetailRequest,
    // fetchPropertyDetailSuccess,
    // fetchPropertyDetailFailure,
    addNewPostRequest,
    addNewPostRequestSuccess,
    addNewPostRequestFailure,
} = postsSlice.actions;

export default postsSlice.reducer;
