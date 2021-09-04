/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MainCategoryRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: workDescription
// ====================================================

export interface workDescription_findByIdSeries_category {
  __typename: "Category";
  categoryName: string;
  mainCategory: MainCategoryRole;
}

export interface workDescription_findByIdSeries_writer {
  __typename: "User";
  name: string;
}

export interface workDescription_findByIdSeries {
  __typename: "Series";
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  view: number;
  like: number;
  category: workDescription_findByIdSeries_category;
  writer: workDescription_findByIdSeries_writer;
}

export interface workDescription {
  findByIdSeries: workDescription_findByIdSeries;
}

export interface workDescriptionVariables {
  seriesId: number;
}
