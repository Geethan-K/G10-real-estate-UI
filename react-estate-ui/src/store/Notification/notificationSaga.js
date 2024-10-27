import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchNotificationRequest, fetchNotificationSuccess, fetchNotificationFailure, postNotificationRequest, postNotificationFailure,postNotificationSuccess } from './notificationSlice';
import { getNotifications,postNotification } from '../../api/services/notificationService';

function* fetchNotifications() {
  try {
    const response = yield call(getNotifications);
    yield put(fetchNotificationSuccess(response.data));
  } catch (error) {
    yield put(fetchNotificationFailure(error.message));
  }
}

// Saga for creating a post (POST)
function* postNotifications(action) {
    try {
      const response = yield call(postNotification, action.payload); // action.payload contains the post data
      yield put(postNotificationSuccess(response.data)); // Add the new post to the state
    } catch (error) {
      yield put(postNotificationFailure(error.message));
    }
  }
export default function* notificationSaga() {
  yield takeLatest(fetchNotificationRequest.type, fetchNotifications);
  yield takeLatest(postNotificationRequest.type, postNotifications);
}
