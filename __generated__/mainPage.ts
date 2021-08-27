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
  view: number;
  like: number;
}

export interface mainPage_orderByPopular_cartoon_writer {
  __typename: "User";
  name: string;
}

export interface mainPage_orderByPopular_cartoon {
  __typename: "Series";
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  view: number;
  like: number;
  writer: mainPage_orderByPopular_cartoon_writer;
}

export interface mainPage_orderByPopular_novel_writer {
  __typename: "User";
  name: string;
}

export interface mainPage_orderByPopular_novel {
  __typename: "Series";
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  view: number;
  like: number;
  writer: mainPage_orderByPopular_novel_writer;
}

export interface mainPage_orderByPopular {
  __typename: "OrderByPopularOutput";
  cartoon: mainPage_orderByPopular_cartoon[];
  novel: mainPage_orderByPopular_novel[];
}

export interface mainPage {
  mainBanner: mainPage_mainBanner[];
  orderByPopular: mainPage_orderByPopular;
}

export interface mainPageVariables {
  today: string;
}
