import { useState } from 'react'
import './App.css'
import Chat from './components/chat/Chat.jsx'
import SharedStore from 'host/SharedStore';
import { Provider } from 'react-redux';
function App() {
 
  return (
    <Provider store={SharedStore}>
     <Chat />
    </Provider>
  )
}

export default App
