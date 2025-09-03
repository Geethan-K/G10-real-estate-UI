import { call, put, takeLatest } from 'redux-saga/effects';
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

function* fetchAllPosts(action) {
  try {
    const response = yield call(getAllPosts,action.payload);
    yield put(fetchAllPostsSuccess(response.data));
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


export default function* propertySaga() {
  yield takeLatest(fetchAllPostsRequest.type, fetchAllPosts);
  yield takeLatest(fetchUserPostsRequest.type,fetchUsersPosts );
  yield takeLatest(addNewPostRequest.type,addNewPost)
}
