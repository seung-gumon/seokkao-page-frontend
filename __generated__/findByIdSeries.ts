/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findByIdSeries
// ====================================================

export interface findByIdSeries_findByIdSeries {
  __typename: "Series";
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  view: number;
  like: number;
  /**
   * 언제 연재하는지
   */
  serialization: string;
}

export interface findByIdSeries {
  findByIdSeries: findByIdSeries_findByIdSeries;
}

export interface findByIdSeriesVariables {
  seriesId: number;
}
