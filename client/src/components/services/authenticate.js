import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { userPool } from "../../libs/cognito/cognitoUserPool";

export const authenticate = (email, password) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (session) => {
        console.log("Login successful");
        // Extract and store tokens from the session if needed
        const tokens = {
          idToken: session.getIdToken().getJwtToken(),
          accessToken: session.getAccessToken().getJwtToken(),
          refreshToken: session.getRefreshToken().getToken(),
        };

        window.localStorage.setItem("tokens", JSON.stringify(tokens));

        resolve(tokens);
      },
      onFailure: (err) => {
        console.error("Login failed:", err);
        reject(err);
      },

      newPasswordRequired: (data) => {
        console.log("New password required");

        const password = prompt("Please enter a new password", "");

        user.completeNewPasswordChallenge(password, {}, {
          onFailure: (err) => {
            console.error("New password challenge failed:", err);
            reject(err);
          },
          onSuccess: (session) => {
            console.log("New password challenge succeeded");
            resolve(session);
          },
        });
      },
    });
  });
};

export const logout = () => {
  const user = userPool.getCurrentUser();
  user.signOut();

  window.location.href = "/";
};
