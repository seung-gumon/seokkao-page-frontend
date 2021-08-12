/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_Login {
  __typename: "LoginOutput";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface login {
  Login: login_Login;
}

export interface loginVariables {
  loginInput: LoginInput;
}
