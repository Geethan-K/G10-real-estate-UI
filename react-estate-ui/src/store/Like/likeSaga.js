import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchLikesRequest, fetchLikesFailure, fetchLikesSuccess, postLikeRequest, postLikeFailure,postLikeSuccess } from './likeSlice';
import { like,getLikesCount } from '../../api/services/likeService';

function* fetchLikes(action) {
  try {
    const response = yield call(getLikesCount,action.payload);
    yield put(fetchLikesSuccess(response.data));
  } catch (error) {
    yield put(fetchLikesFailure(error.message));
  }
}

// Saga for creating a post (POST)
function* postLike(action) {
    try {
      const response = yield call(like, action.payload); // action.payload contains the post data
      yield put(postLikeSuccess(response.data)); // Add the new post to the state
    } catch (error) {
      yield put(postLikeFailure(error.message));
    }
  }
export default function* likeSaga() {
  yield takeLatest(fetchLikesRequest.type, fetchLikes);
  yield takeLatest(postLikeRequest.type, postLike);
}
