/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from "axios";
import "../App.css";
import { useKeycloak } from "@react-keycloak/web";

function App() {
  const { keycloak, initialized } = useKeycloak();
  console.log("initialized", initialized);
  console.log("keycloak", keycloak);

  const refreshToken = async () => {
    const userData = localStorage.getItem("userData");
    const transformedData = JSON.parse(userData as string);
    const { refreshToken } = transformedData;
    const { data } = await axios.post(
      "http://localhost:8080/realms/myrealm/protocol/openid-connect/token",
      {
        grant_type: "refresh_token",
        client_id: "lab",
        refresh_token: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(data);
  };

  return (
    <>
      <div></div>
      <h1>React + Keycloak</h1>
      <div>{`User is ${
        !keycloak.authenticated ? "NOT " : ""
      }authenticated`}</div>
      <div style={{ display: "flex", flexDirection:"column", gap: 16}}>
        <button type="button" onClick={() => console.log(keycloak.token)}>
          get token
        </button>
        <button type="button" onClick={() => refreshToken()}>
          get new token(By refreshToken)
        </button>
        <button
          type="button"
          onClick={() =>
            keycloak.login({
              action: "UPDATE_PASSWORD",
            })
          }
        >
          UPDATE_PASSWORD
        </button>
        <button
          type="button"
          onClick={() =>
            keycloak.login({
              action: "CONFIGURE_TOTP",
            })
          }
        >
          UPDATE_2FA
        </button>
        {!!keycloak.authenticated && (
          <button type="button" onClick={() => keycloak.logout()}>
            Logout
          </button>
        )}
      </div>
    </>
  );
}

export default App;
