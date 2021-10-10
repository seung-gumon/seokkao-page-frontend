/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateSerialization
// ====================================================

export interface updateSerialization_updateSerialization {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface updateSerialization {
  updateSerialization: updateSerialization_updateSerialization;
}

export interface updateSerializationVariables {
  seriesId: number;
  day: string;
}
