import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.scss"
import { AuthContextProvider } from "./Context/AuthContext.jsx"
import { SocketContextProvider } from './Context/socketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>

      <App />
      </SocketContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
