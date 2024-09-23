// shared-store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createContext } from 'react';

// Define a slice (reducer + actions)
const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    socket:[],
    chats:[],
    showLastMsgs:[]
  },
  reducers: {
    // addMessage: (state, action) => {
    //   state.messages.push(action.payload);
    // },
    addSocket:(state,action)=>{
        state.socket = action.payload.socket
    },
    addChats:(state,action)=>{
        state.chats=action.payload.chats
    },

    addLastMsgs:(state,action) =>{ 
        state.showLastMsgs=action.payload.showLastMsgs
    }
  },
});

const userSlice = createSlice({
    name:'user',
    initialState:{
        currentUser: []
    },
    reducers:{
        addUser:(state,action)=>{
            state.currentUser=action.payload.currentUser
        }
    }
})

// Export the actions
export const { addChats, addSocket,addLastMsgs} = chatSlice.actions;


// Create the store
export const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
    user:userSlice.reducer
  },
});

// Create a Context to share the store
export const ReduxStoreContext = createContext();
