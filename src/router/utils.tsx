/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { Navigate, RouteProps } from 'react-router-dom'

import { useKeycloak } from '@react-keycloak/web'


type PrivateRouteParams = {
  component: React.ComponentType<any>;
} & RouteProps

export function PrivateRoute({
  component: Component,
  ...rest
}: PrivateRouteParams) {
  const { keycloak } = useKeycloak()

  return keycloak.authenticated ? <Component {...rest} /> : <Navigate to="/login" replace />;

}