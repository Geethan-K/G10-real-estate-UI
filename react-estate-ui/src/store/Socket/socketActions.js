export const INIT_SOCKET = 'INIT_SOCKET';
export const SET_SOCKET = 'SET_SOCKET';
export const EMIT_NEW_USER = 'EMIT_NEW_USER';

export const initSocket = () => ({
    type: INIT_SOCKET,
  });
  
  export const setSocket = (socket) => ({
    type: SET_SOCKET,
    payload: socket,
  });
  
  export const emitNewUser = (userId) => ({
    type: EMIT_NEW_USER,
    payload: userId,
  });