import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchBlockedUsersRequest, fetchBlockedUsersSuccess, fetchBlockedUsersFailure, blockUserRequest,blockUserSuccess, blockUserFailure } from './blockSlice';
import { blockUser,getBlockedUsers } from '../../api/services/blockService';

function* fetchBlockedUsers() {
  try {
    const response = yield call(getBlockedUsers);
    yield put(fetchBlockedUsersSuccess(response.data));
  } catch (error) {
    yield put(fetchBlockedUsersFailure(error.message));
  }
}

// Saga for creating a post (POST)
function* blockUserReq(action) {
    try {
      const response = yield call(blockUser, action.payload); // action.payload contains the post data
      yield put(blockUserSuccess(response.data)); // Add the new post to the state
    } catch (error) {
      yield put(blockUserFailure(error.message));
    }
  }
export default function* blockSaga() {
  yield takeLatest(fetchBlockedUsersRequest.type, fetchBlockedUsers);
  yield takeLatest(blockUserRequest.type, blockUserReq);
}
