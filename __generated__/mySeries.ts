/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: mySeries
// ====================================================

export interface mySeries_mySeries_writer {
  __typename: "User";
  name: string;
}

export interface mySeries_mySeries_category {
  __typename: "Category";
  categoryName: string;
}

export interface mySeries_mySeries {
  __typename: "Series";
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  view: number;
  like: number;
  writer: mySeries_mySeries_writer;
  category: mySeries_mySeries_category;
}

export interface mySeries {
  mySeries: mySeries_mySeries[];
}
