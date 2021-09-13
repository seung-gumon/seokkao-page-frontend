/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: adminFindByIdEpisode
// ====================================================

export interface adminFindByIdEpisode_adminFindByIdEpisode_series {
  __typename: "Series";
  name: string;
}

export interface adminFindByIdEpisode_adminFindByIdEpisode {
  __typename: "Episode";
  id: number;
  episode: number;
  contents: string[];
  series: adminFindByIdEpisode_adminFindByIdEpisode_series;
}

export interface adminFindByIdEpisode {
  adminFindByIdEpisode: adminFindByIdEpisode_adminFindByIdEpisode | null;
}

export interface adminFindByIdEpisodeVariables {
  seriesId: number;
  episodeId: number;
}
