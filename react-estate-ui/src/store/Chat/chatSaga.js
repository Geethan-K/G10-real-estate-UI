import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchChatsRequest,fetchChatsFailure,fetchChatsSuccess, fetchUniqueChatRequest,fetchUniqueChatSuccess, fetchUniqueChatFailure, fetchReceiverStatusSuccess, fetchReceiverStatusFailure, fetchReceiverStatusRequest} from './chatSlice';
import { getChats ,getChat,getReceiverStatus} from '../../api/services/chatService';

function* fetchChats() {
  try {
    const response = yield call(getChats);
    yield put(fetchChatsSuccess(response.data));
  } catch (error) {
    yield put(fetchChatsFailure(error.message));
  }
}
function* fetchUniqueChat(action) {
    try {
      const response = yield call(getChat,action.payload);
      yield put(fetchUniqueChatSuccess(response.data));
    } catch (error) {
      yield put(fetchUniqueChatFailure(error.message));
    }
  }
  function* fetchReceiverStatus(action) {
    try {
      const response = yield call(getReceiverStatus,action.payload);
      yield put(fetchReceiverStatusSuccess(response.data));
    } catch (error) {
      yield put(fetchReceiverStatusFailure(error.message));
    }
  }
export default function* chatSaga() {
  yield takeLatest(fetchChatsRequest.type, fetchChats);
  yield takeLatest(fetchUniqueChatRequest.type, fetchUniqueChat);
  yield takeLatest(fetchReceiverStatusRequest.type, fetchReceiverStatus);
}
