/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findByIdSeries
// ====================================================

export interface findByIdSeries_findByIdSeries_episode {
  __typename: "Episode";
  episode: number;
  createdAt: any;
}

export interface findByIdSeries_findByIdSeries_writer {
  __typename: "User";
  name: string;
}

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
  episode: findByIdSeries_findByIdSeries_episode[];
  writer: findByIdSeries_findByIdSeries_writer;
}

export interface findByIdSeries {
  findByIdSeries: findByIdSeries_findByIdSeries;
}

export interface findByIdSeriesVariables {
  seriesId: number;
}
