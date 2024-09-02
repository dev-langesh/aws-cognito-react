const express = require("express");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const cors = require('cors')

require("dotenv").config();
const COGNITO_TOKEN_SIGINING_KEY = process.env.COGNITO_TOKEN_SIGINING_KEY;
const PORT = process.env.PORT || 9090;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const client = jwksClient({
  jwksUri: COGNITO_TOKEN_SIGINING_KEY || "",
});

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).send({ error: "Unauthorized: Missing token" });
  }

  function getKey(header, callback) {
    client.getSigningKey(header.kid, function (err, key) {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  }

  jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decodedToken) => {
    if (err) {
      return res.status(403).send({ error: "Forbidden: Invalid token" });
    }
    // Token is valid, extract user info from decodedToken if needed
    req.user = decodedToken; // Attach user info to request object
    console.log(decodedToken)
    next(); // Proceed to the next middleware or route handler
  });
}

// Example protected API route
app.get("/api/protected", authenticateToken, (req, res) => {
  // Authorized request, req.user contains user information from the token
  res.json({ message: "Protected API route accessed", user: req.user });
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
