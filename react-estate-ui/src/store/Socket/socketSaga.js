
import { call, put, takeLatest, select } from 'redux-saga/effects';
import io from 'socket.io-client';
import { INIT_SOCKET, setSocket, EMIT_NEW_USER } from './socketActions';

function* initSocketSaga() {
  try {
    const socket = yield call(io, 'http://localhost:4000');
    yield put(setSocket(socket));
    
    // Cleanup when the saga ends
    return () => {
      socket.disconnect();
    };
  } catch (error) {
    console.error('Socket initialization failed:', error);
  }
}

function* emitNewUserSaga(action) {
  const socket = yield select((state) => state.socket.socket);
  if (socket) {
    socket.emit('newUser', action.payload);
  }
}

export default function* socketSaga() {
  yield takeLatest(INIT_SOCKET, initSocketSaga);
  yield takeLatest(EMIT_NEW_USER, emitNewUserSaga);
}
