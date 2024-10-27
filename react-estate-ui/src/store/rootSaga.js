import { all } from 'redux-saga/effects';
import likeSaga from './Like/likeSaga';
import shareSaga from './Share/shareSaga';
import commentSaga from './Comment/commentSaga';
import blockSaga from './Block/blockSaga';
import followSaga from './Follow/followSaga';
import notificationSaga from './Notification/notificationSaga';
import propertySaga from './Property/propertySaga';
import socketSaga from './Socket/socketSaga';
import chatSaga from './Chat/chatSaga';
import messageSaga from './Message/messageSaga';

export default function* rootSaga() {
  yield all([
    socketSaga(),
    propertySaga(),
    likeSaga(),
    shareSaga(),
    commentSaga(),
    blockSaga(),
    followSaga(),
    notificationSaga(),
    chatSaga(),
    messageSaga()
  ]);
}
