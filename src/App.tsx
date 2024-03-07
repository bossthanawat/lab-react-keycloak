
import './App.css'
import { useKeycloak } from '@react-keycloak/web'

function App() {

  const { keycloak, initialized } = useKeycloak()
  console.log("initialized", initialized)
  console.log("keycloak", keycloak)

  return (
    <>
      <div>
      </div>
      <h1>React + Keycloak</h1>
      <div>{`User is ${!keycloak.authenticated ? 'NOT ' : ''
        }authenticated`}</div>

      {!!keycloak.authenticated && (
        <button type="button" onClick={() => keycloak.logout()}>
          Logout
        </button>
      )}
    </>
  )
}

export default App
