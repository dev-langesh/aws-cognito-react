import { CognitoUser } from "amazon-cognito-identity-js";
import { userPool } from "../../libs/cognito/cognitoUserPool";

export function resendConfirmationCode(username) {
  var userData = {
    Username: username,
    Pool: userPool,
  };

  const user = new CognitoUser(userData);

  user.resendConfirmationCode((err, res) => {
    if (err) console.log(err);
    else {
      console.log(res);
      alert("Code resent");
    }
  });
}