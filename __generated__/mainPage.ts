/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: mainPage
// ====================================================

export interface mainPage_mainBanner {
  __typename: "Series";
  id: number;
  name: string;
  thumbnail: string;
  description: string;
}

export interface mainPage {
  mainBanner: mainPage_mainBanner[];
}
