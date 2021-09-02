/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: mySeries
// ====================================================

export interface mySeries_mySeries_series_category {
  __typename: "Category";
  categoryName: string;
}

export interface mySeries_mySeries_series {
  __typename: "Series";
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  view: number;
  like: number;
  category: mySeries_mySeries_series_category;
}

export interface mySeries_mySeries {
  __typename: "MySeriesOutputDto";
  name: string;
  series: mySeries_mySeries_series[];
}

export interface mySeries {
  mySeries: mySeries_mySeries;
}
