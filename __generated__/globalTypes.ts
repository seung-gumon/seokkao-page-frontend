/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum MainCategoryRole {
  Cartoon = "Cartoon",
  Novel = "Novel",
}

export enum UserRole {
  Cartoonist = "Cartoonist",
  Novelist = "Novelist",
  User = "User",
}

export interface BuyEpisodeInput {
  seriesId: number;
  episodeId: number;
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
  name: string;
  phoneNumber: string;
  coin: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface PurChaseHistoryInput {
  seriesId: number;
  startDate: string;
  endDate: string;
}

export interface UpdateInput {
  email: string;
  name: string;
}

export interface episodeCreateInput {
  episode: number;
  contents: string[];
  seriesId: number;
}

export interface episodeUpdateInput {
  id: number;
  contents: string[];
}

export interface prevOrNextEpisodeInput {
  seriesId: number;
  episode: number;
}

export interface seriesEpisodeIdsInput {
  seriesId: number;
  episodeId: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
