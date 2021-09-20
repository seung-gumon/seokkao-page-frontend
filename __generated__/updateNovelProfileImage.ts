/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateNovelProfileImage
// ====================================================

export interface updateNovelProfileImage_updateNovelProfileImage {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface updateNovelProfileImage {
  updateNovelProfileImage: updateNovelProfileImage_updateNovelProfileImage;
}

export interface updateNovelProfileImageVariables {
  seriesId: number;
  novelProfileImage: string;
}
