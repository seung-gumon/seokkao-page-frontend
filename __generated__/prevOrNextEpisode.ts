/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { prevOrNextEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: prevOrNextEpisode
// ====================================================

export interface prevOrNextEpisode_prevOrNextEpisode {
  __typename: "BuyEpisodeOutput";
  ok: boolean;
  error: string | null;
}

export interface prevOrNextEpisode {
  prevOrNextEpisode: prevOrNextEpisode_prevOrNextEpisode;
}

export interface prevOrNextEpisodeVariables {
  prevOrNext: string;
  prevOrNextEpisode: prevOrNextEpisodeInput;
}
