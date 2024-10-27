// authActions.js
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const UPDATE_CHATS_INFO = 'UPDATE_CHATS_INFO';

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const updateChatsInfo = (chatsInfo) => ({
  type: UPDATE_CHATS_INFO,
  payload: chatsInfo,
});
