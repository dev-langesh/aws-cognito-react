import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "ap-south-1_FOSUiVzjv",
  ClientId: "3el4de515c8bm191u70tls74kn",
};

export const userPool =  new CognitoUserPool(poolData);
