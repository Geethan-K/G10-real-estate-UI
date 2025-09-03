import React, { useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.scss"
import { SocketContextProvider } from './context/SocketContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { Provider } from 'react-redux';
import store from './store';
import { AlertProvider } from './context/Alert/AlertContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  
  <Provider store={store}>
    <AlertProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </AlertProvider>
  </Provider>

  // </React.StrictMode>,
)
