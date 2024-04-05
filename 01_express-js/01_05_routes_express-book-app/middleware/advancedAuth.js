import { auth } from "express-oauth2-jwt-bearer";
// INFO: to request a test token (to add to Postman), go to "aut0 account > app... > APIs >
// api-name > Test"
// use `curl --request POST \....` command to ask for a token
// copy the token to Postman add "Bearer" before the token string: "Bearer {token string}"

// add this separate middleware, unlike in auth0 example code
// where middleware code and server code is in the same file
// NOTE: this makes it more flexible (better with separate routes)

const advAuthMiddleware = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
});

export default advAuthMiddleware;
