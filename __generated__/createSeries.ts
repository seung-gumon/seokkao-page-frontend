/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateSeriesInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createSeries
// ====================================================

export interface createSeries_createSeries {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface createSeries {
  createSeries: createSeries_createSeries;
}

export interface createSeriesVariables {
  input: CreateSeriesInput;
}
