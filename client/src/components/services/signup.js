import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { userPool } from "../../libs/cognito/cognitoUserPool";

export function signup({ username, email, password ,phone_number,name}) {
  const attributeList = [];

  attributeList.push(
    new CognitoUserAttribute({
      Name: "email",
      Value: email,
    }),
    new CognitoUserAttribute({
      Name: "phone_number",
      Value: phone_number,
    }),
    new CognitoUserAttribute({
      Name: "name",
      Value: name,
    })
  );

  const promise = new Promise((resolve, reject) => {
    userPool.signUp(username, password, attributeList, null, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(data);
        resolve(data);
      }
    });
  });

  return promise;
}
