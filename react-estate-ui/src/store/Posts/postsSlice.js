import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'newsfeed_posts',
  initialState: {
    list: [],
    posts:[],
    page:1,
    nextCursor:null,
    hasMore:true,
    loading: false,
    error: null,
  },
  reducers: {
    fetchAllPostsRequest: (state) => {
      state.loading = true;
    },
    fetchAllPostsSuccess: (state, action) => {
      state.loading = false;
      const newPosts = action.payload.posts.filter(
        post => !state.posts.some(p => p.id === post.id)
      );
      state.posts = [...state.posts, ...newPosts];
      // state.posts.push(...action.payload.posts);
       state.nextCursor = action.payload.nextCursor;
       state.hasMore = !!action.payload.nextCursor;
      // state.posts = [...state.posts, ...newPosts];
      // state.page = state.page + 1;
     // state.hasMore = action.payload.hasMore;
    },
    fetchAllPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetFeed: (state) => {
      state.posts = [];
      state.nextCursor = null;
      state.hasMore = true;
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
    resetFeed,
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
