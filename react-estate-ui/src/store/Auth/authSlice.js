// authReducer.js
import { SET_CURRENT_USER, UPDATE_CHATS_INFO } from './authActions';

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
  chatsInfo: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UPDATE_CHATS_INFO:
      return {
        ...state,
        chatsInfo: action.payload,
      };
    default:
      return state;
  }
};
