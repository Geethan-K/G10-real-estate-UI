import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchSharedCountRequest,fetchSharedCountFailure,fetchSharedCountSuccess,postShareRequest,postShareFailure,postShareSuccess } from './shareSlice';
import { sharePost,getSharedCount } from '../../api/services/shareService';

function* fetchSharedCount(action) {
  try {
    const response = yield call(getSharedCount,action.payload);
    yield put(fetchSharedCountSuccess(response.data));
  } catch (error) {
    yield put(fetchSharedCountFailure(error.message));
  }
}

// Saga for creating a post (POST)
function* postShare(action) {
    try {
      const response = yield call(sharePost, action.payload); // action.payload contains the post data
      yield put(postShareSuccess(response.data)); // Add the new post to the state
    } catch (error) {
      yield put(postShareFailure(error.message));
    }
  }
export default function* shareSaga() {
  yield takeLatest(fetchSharedCountRequest.type, fetchSharedCount);
  yield takeLatest(postShareRequest.type, postShare);
}
