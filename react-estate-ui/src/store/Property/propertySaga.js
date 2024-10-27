import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchPropertiesRequest, fetchPropertiesFailure, fetchPropertiesSuccess,fetchUsersPropertiesRequest,fetchUsersPropertiesSuccess,fetchUsersPropertiesFailure, fetchPropertyDetailRequest, fetchPropertyDetailSuccess,fetchPropertyDetailFailure } from './propertySlice';
import { getPosts,getPostDetail,getUsersProperties } from '../../api/services/propertyService';

function* fetchProperties(action) {
  try {
    const response = yield call(getPosts,action.payload);
    yield put(fetchPropertiesSuccess(response.data));
  } catch (error) {
    yield put(fetchPropertiesFailure(error.message));
  }
}

function* fetchUsersProperties(action) {
  try {
    const response = yield call(getUsersProperties,action.payload);
    yield put(fetchUsersPropertiesSuccess(response.data));
  } catch (error) {
    yield put(fetchUsersPropertiesFailure(error.message));
  }
}

function* fetchPropertyDetail(action) {
  try {
    const response = yield call(getPostDetail,action.payload);
    yield put(fetchPropertyDetailSuccess(response.data));
  } catch (error) {
    yield put(fetchPropertyDetailFailure(error.message));
  }
}


// Saga for creating a post (POST)
// function* addNewProperty(action) {
//     try {
//       const response = yield call(blockUser, action.payload); // action.payload contains the post data
//       yield put(blockUserSuccess(response.data)); // Add the new post to the state
//     } catch (error) {
//       yield put(blockUserFailure(error.message));
//     }
//   }
export default function* propertySaga() {
  yield takeLatest(fetchPropertiesRequest.type, fetchProperties);
  yield takeLatest(fetchPropertyDetailRequest.type,fetchPropertyDetail );
  yield takeLatest(fetchUsersPropertiesRequest.type,fetchUsersProperties)
}
