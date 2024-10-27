// authSagas.js
import { takeLatest, select, put } from 'redux-saga/effects';
import { SET_CURRENT_USER } from './authActions';

function* saveUserToLocalStorage() {
  const currentUser = yield select((state) => state.auth.currentUser);
  if (currentUser) {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }
}

export function* authSagas() {
  yield takeLatest(SET_CURRENT_USER, saveUserToLocalStorage);
}
