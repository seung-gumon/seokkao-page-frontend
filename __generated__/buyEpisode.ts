/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BuyEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: buyEpisode
// ====================================================

export interface buyEpisode_buyEpisode {
  __typename: "BuyEpisodeOutput";
  ok: boolean;
  error: string | null;
  buyEpisodeId: number | null;
}

export interface buyEpisode {
  buyEpisode: buyEpisode_buyEpisode;
}

export interface buyEpisodeVariables {
  buyEpisodeInput: BuyEpisodeInput;
}
