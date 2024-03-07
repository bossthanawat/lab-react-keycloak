import { Navigate, useLocation } from 'react-router-dom'

import { useKeycloak } from '@react-keycloak/web'
import axios from 'axios'

export const responseTime = 5; // this in (s). the token expiryDate = realExpirationDate-responseTime

const LoginPage = () => {

  const location = useLocation()
  const currentLocationState = location.state || {
    from: { pathname: '/' },
  }

  const { keycloak } = useKeycloak()

  const login = () => {
    keycloak.login();
  };

  const loginByPassword = async () => {
    try {
      const { data } = await axios.post('http://localhost:8080/realms/myrealm/protocol/openid-connect/token', {
        grant_type: 'password',
        client_id: 'lab',
        // username: 'myuser',
        // password: 'P@ssw0rd!1'
        username: 'test',
        password: 'P@ssw0rd!1'
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log(data)
      const expirationDate = new Date(
        new Date().getTime() + (data.expires_in - responseTime) * 1000
      ); //*1000 to convert to ms because get Time is in ms
      const refreshTokenExpiryDate = new Date(
        new Date().getTime() + data.refresh_expires_in * 1000
      );
      saveDataToStorage(
        data.access_token,
        expirationDate,
        data.refresh_token,
        refreshTokenExpiryDate
      );
    } catch (e) {
      console.error(e)
    }
  };


  if (keycloak?.authenticated)
    return <Navigate to={currentLocationState?.from as string} />

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <button type="button" onClick={() => login()}>
        Login KC
      </button>
      <div>
        <button type="button" onClick={() => loginByPassword()}>
          Login Password
        </button>
      </div>
    </div>
  )
}

export default LoginPage


interface UserData {
  token: string;
  expiryDate: string;
  refreshToken: string;
  refreshTokenExpiryDate: string;
}

export const saveDataToStorage = (
  token: string,
  expirationDate: Date,
  refreshToken: string,
  refreshTokenExpiryDate: Date
): void => {
  const userData: UserData = {
    token: token,
    expiryDate: expirationDate.toISOString(),
    refreshToken: refreshToken,
    refreshTokenExpiryDate: refreshTokenExpiryDate.toISOString(),
  };
  localStorage.setItem("userData", JSON.stringify(userData));
  window.dispatchEvent(new Event('storage'));
};