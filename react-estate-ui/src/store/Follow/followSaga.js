import { call, put, takeLatest } from 'redux-saga/effects';
import { PostFollowUserFailure, PostUnFollowUserFailure, fetchFollowersFailure, fetchFollowersRequest, fetchFollowersSuccess, fetchFollowingsFailure, fetchFollowingsRequest,fetchFollowingsSuccess,fetchIsFollowingRequest, postFollowUserRequest, postFollowUserSuccess, postUnFollowUserRequest, postUnFollowUserSuccess } from './followSlice';
import { getFollowers,getFollowings,isFollowing,followUser,unfollowUser } from '../../api/services/followService';

function* fetchFollowers(action) {
  try {
    const response = yield call(getFollowers,action.payload);
    yield put(fetchfollow(response.data));
  } catch (error) {
    yield put(fetchCommentsFailure(error.message));
  }
}
function* fetchFollowings(action) {
    try {
      const response = yield call(getFollowings,action.payload);
      yield put(fetchFollowersSuccess(response.data));
    } catch (error) {
      yield put(fetchFollowersFailure(error.message));
    }
  }

  function* fetchIsFollowing(action) {
    try {
      const response = yield call(isFollowing,action.payload);
      yield put(fetchFollowingsSuccess(response.data));
    } catch (error) {
      yield put(fetchFollowingsFailure(error.message));
    }
  }

// Saga for creating a post (POST)
function* postFollowUser(action) {
    try {
      const response = yield call(followUser, action.payload); // action.payload contains the post data
      yield put(postFollowUserSuccess(response.data)); // Add the new post to the state
    } catch (error) {
      yield put(PostFollowUserFailure(error.message));
    }
  }
  function* postUnFollowUser(action) {
    try {
      const response = yield call(unfollowUser, action.payload); // action.payload contains the post data
      yield put(postUnFollowUserSuccess(response.data)); // Add the new post to the state
    } catch (error) {
      yield put(PostUnFollowUserFailure(error.message));
    }
  }
export default function* followSaga() {
  yield takeLatest(fetchFollowersRequest.type, fetchFollowers);
  yield takeLatest(fetchFollowingsRequest.type, fetchFollowings);
  yield takeLatest(fetchIsFollowingRequest.type, fetchIsFollowing);

  yield takeLatest(postFollowUserRequest.type, postFollowUser);
  yield takeLatest(postUnFollowUserRequest.type, postUnFollowUser);
}
