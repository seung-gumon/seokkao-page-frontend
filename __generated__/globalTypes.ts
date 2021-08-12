/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Cartoonist = "Cartoonist",
  Novelist = "Novelist",
  User = "User",
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
  name: string;
  phoneNumber: string;
  coin: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
