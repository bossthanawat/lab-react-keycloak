
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { useKeycloak } from '@react-keycloak/web'

import HomePage from '../pages/Home'
import LoginPage from '../pages/Login'

import { PrivateRoute } from './utils'

export const AppRouter = () => {
  const { initialized } = useKeycloak()
  if (!initialized) {
    return <div>Loading...</div>
  }

  const router = createBrowserRouter([
    { path: "/", element: <PrivateRoute component={HomePage} /> },
    { path: "/login", element: <LoginPage /> },
  ]);

  return (
    <RouterProvider router={router} />
  )
}