import { call, put, takeLatest } from 'redux-saga/effects';
import {addNewMessageRequest,addNewMessageFailure,addNewMessageSuccess,searchKeywordRequest,searchKeywordFailure,searchKeywordSuccess } from './messageSlice';
import { sendMessage,searchMessage} from '../../api/services/messageService';

function* addNewMessage(action) {
        try {
          const response = yield call(sendMessage, action.payload); // action.payload contains the post data
          yield put(addNewMessageSuccess(response.data)); // Add the new post to the state
        } catch (error) {
          yield put(addNewMessageFailure(error.message));
        }
      }
      function* searchKeyword(action) {
        try {
          const response = yield call(searchMessage, action.payload); // action.payload contains the post data
          yield put(searchKeywordSuccess(response.data)); // Add the new post to the state
        } catch (error) {
          yield put(searchKeywordFailure(error.message));
        }
      }
export default function* messageSaga() {
  yield takeLatest(addNewMessageRequest.type, addNewMessage);
  yield takeLatest(searchKeywordRequest.type, searchKeyword);

}
