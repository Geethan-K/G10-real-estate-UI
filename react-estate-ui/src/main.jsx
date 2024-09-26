import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.scss"
import { SocketContextProvider } from './context/SocketContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { store } from './redux-store/shared-store'
import { Provider } from 'react-redux';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <AuthContextProvider>
      <SocketContextProvider>
       <App />
      </SocketContextProvider>
    </AuthContextProvider>
    </Provider>

  </React.StrictMode>,
)
