import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchCommentsRequest, fetchCommentsFailure, fetchCommentsSuccess, postCommentRequest, postCommentSuccess,PostCommentFailure } from './commentSlice';
import { getComments,postComment } from '../../api/services/commentService';

function* fetchComments(action) {
  try {
    const response = yield call(getComments,action.payload);
    yield put(fetchCommentsSuccess(response.data));
  } catch (error) {
    yield put(fetchCommentsFailure(error.message));
  }
}

// Saga for creating a post (POST)
function* postComments(action) {
    try {
      const response = yield call(postComment, action.payload); // action.payload contains the post data
      yield put(postCommentSuccess(response.data)); // Add the new post to the state
    } catch (error) {
      yield put(PostCommentFailure(error.message));
    }
  }
export default function* commentSaga() {
  yield takeLatest(fetchCommentsRequest.type, fetchComments);
  yield takeLatest(postCommentRequest.type, postComments);
}
