import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { AuthContextProvider } from "host/AuthContext";
import { SocketContextProvider } from "host/SocketContext";
import './App.css'
import Chat from './components/ChatBox/ChatBox';
import { Provider } from 'react-redux';
import { store as hostStore } from 'host/SharedStore';

function App() {
 
  return (
    <Provider store={hostStore}>
     <AuthContextProvider>
      <SocketContextProvider>
       <Chat />
      </SocketContextProvider>
    </AuthContextProvider>
    </Provider>
  )
}

export default App
