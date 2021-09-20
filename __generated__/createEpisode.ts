/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { episodeCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createEpisode
// ====================================================

export interface createEpisode_createEpisode {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface createEpisode {
  createEpisode: createEpisode_createEpisode;
}

export interface createEpisodeVariables {
  episodeCreateInput: episodeCreateInput;
}
