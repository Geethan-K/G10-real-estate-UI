import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
    fetchAllPostsFailure,
    fetchAllPostsRequest,
    fetchAllPostsSuccess,
    fetchUserPostsFailure,
    fetchUserPostsRequest,
    fetchUserPostsSuccess,
    addNewPostRequest,
    addNewPostRequestSuccess,
    addNewPostRequestFailure
} from './postsSlice';
import { getAllPosts, getUsersPosts, addNewsFeedPost } from '../../api/services/postsService';

// function* fetchAllPosts(action) {
//   try {
//     const response = yield call(getAllPosts,action.payload);
//     yield put(fetchAllPostsSuccess(response.data));
//   } catch (error) {
//     yield put(fetchAllPostsFailure(error.message));
//   }
// }

function* fetchFeed(action) {
  try {
   // const { userId, page, limit } = action.payload;
   const state = yield select(state => state.newsFeed)
   const { nextCursor } = state; // get cursor from redux
   const response = yield call(getAllPosts , {
    cursor:nextCursor,
    limit:action.payload?.limit || 5
   })
     yield put(fetchAllPostsSuccess({
      posts: response.data.posts,
      hasMore: !!response.data.nextCursor,
      nextCursor: response.data.nextCursor,
    }));
  //  const response = yield call(getAllPosts, userId, page, limit);
    // yield put(fetchAllPostsSuccess({
    //   posts: response.data.posts || response.data,
    //   hasMore: response.data.hasMore ?? (response.data.length > 0),
    // }));
  } catch (error) {
    yield put(fetchAllPostsFailure(error.message));
  }
}


function* fetchUsersPosts(action) {
  try {
    const response = yield call(getUsersPosts,action.payload);
    yield put(fetchUserPostsSuccess(response.data));
  } catch (error) {
    yield put(fetchUserPostsFailure(error.message));
  }
}

// function* fetchPostDetail(action) {
//   try {
//     const response = yield call(addNewPost,action.payload);
//     yield put(fetchPropertyDetailSuccess(response.data));
//   } catch (error) {
//     yield put(fetchPropertyDetailFailure(error.message));
//   }
// }

function* addNewPost(action) {
    try {
      const response = yield call(addNewsFeedPost, action.payload); // action.payload contains the post data
      yield put(addNewPostRequestSuccess(response.data)); // Add the new post to the state
    } catch (error) {
      yield put(addNewPostRequestFailure(error.message));
    }
  }


export default function* postsSaga() {
  yield takeLatest(fetchAllPostsRequest.type, fetchFeed);
  yield takeLatest(fetchUserPostsRequest.type,fetchUsersPosts );
  yield takeLatest(addNewPostRequest.type,addNewPost)
}
