/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { seriesEpisodeIdsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getEpisodeBySeriesIdAndEpisodeId
// ====================================================

export interface getEpisodeBySeriesIdAndEpisodeId_getEpisodeBySeriesIdAndEpisodeId_series {
  __typename: "Series";
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
