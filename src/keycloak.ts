import Keycloak from 'keycloak-js'

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
  clientId: "lab",
  realm: "myrealm",
  url: "http://localhost:8080",
})

export default keycloak