import { CognitoUser } from "amazon-cognito-identity-js";
import { userPool } from "../../libs/cognito/cognitoUserPool";

export function confirmUser(username, code) {
  var userData = {
    Username: username,
    Pool: userPool,
  };

  const user = new CognitoUser(userData);

  user.confirmRegistration(code, true, (err, res) => {
    if (err) console.log(err);
    else {
      console.log(res);
      alert("confirmed");
    }
  });
}
