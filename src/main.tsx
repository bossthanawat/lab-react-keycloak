import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './keycloak'
import { AppRouter } from './router/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ReactKeycloakProvider authClient={keycloak} initOptions={{
    // onLoad: 'login-required',
    // onLoad: 'check-sso',
  }}>
    {/* <App/> */}
    <AppRouter />
  </ReactKeycloakProvider>
  // </React.StrictMode>,
)
