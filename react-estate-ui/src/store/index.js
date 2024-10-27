import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import propertyReducer from './Property/propertySlice';
import likeReducer from './Like/likeSlice';
import shareReducer from './Share/shareSlice';
import commentReducer from './Comment/commentSlice';
import followReducer from './Follow/followSlice';
import blockReducer from './Block/blockSlice';
import chatReducer from './Chat/chatSlice';
import messageReducer from './Message/messageSlice'
import notificationReducer from './Notification/notificationSlice';
import socketReducer from './Socket/socketSlice';
import rootSaga from './rootSaga';
import React from 'react';
import { authReducer } from './Auth/authSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
      auth: authReducer,
      socket: socketReducer,
      property:propertyReducer,
      like: likeReducer,
      share: shareReducer,
      comment: commentReducer,
      follow: followReducer,
      block: blockReducer,
      chat:chatReducer,
      message:messageReducer,
      notification: notificationReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      immutableCheck: false,
      serializableCheck: false
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
