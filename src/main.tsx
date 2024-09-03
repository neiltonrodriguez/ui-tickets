import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/index.css'
import { AuthProvider } from './context/auth/AuthProvider'
import { RouterProvider } from 'react-router-dom'
import { Rotas } from './routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={Rotas} />
    </AuthProvider>
  </React.StrictMode>,
)
