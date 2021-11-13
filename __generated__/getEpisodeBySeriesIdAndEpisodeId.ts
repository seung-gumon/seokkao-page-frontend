/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { seriesEpisodeIdsInput, MainCategoryRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: getEpisodeBySeriesIdAndEpisodeId
// ====================================================

export interface getEpisodeBySeriesIdAndEpisodeId_getEpisodeBySeriesIdAndEpisodeId_series_category {
  __typename: "Category";
  mainCategory: MainCategoryRole;
}

export interface getEpisodeBySeriesIdAndEpisodeId_getEpisodeBySeriesIdAndEpisodeId_series {
  __typename: "Series";
  category: getEpisodeBySeriesIdAndEpisodeId_getEpisodeBySeriesIdAndEpisodeId_series_category;
  name: string;
}

export interface getEpisodeBySeriesIdAndEpisodeId_getEpisodeBySeriesIdAndEpisodeId {
  __typename: "Episode";
  episode: number;
  contents: string[];
  series: getEpisodeBySeriesIdAndEpisodeId_getEpisodeBySeriesIdAndEpisodeId_series;
}

export interface getEpisodeBySeriesIdAndEpisodeId {
  getEpisodeBySeriesIdAndEpisodeId: getEpisodeBySeriesIdAndEpisodeId_getEpisodeBySeriesIdAndEpisodeId | null;
}

export interface getEpisodeBySeriesIdAndEpisodeIdVariables {
  seriesEpisodeIdsInput: seriesEpisodeIdsInput;
}
