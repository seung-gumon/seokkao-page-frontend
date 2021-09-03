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

export interface CategoryInput {
  mainCategory: MainCategoryRole;
  categoryName: string;
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
  name: string;
  phoneNumber: string;
  coin: number;
  series: SeriesInput[];
}

export interface EpisodeInput {
  Series: number;
  episode: number;
  contents: string[];
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SeriesInput {
  thumbnail: string;
  name: string;
  description: string;
  serialization: string;
  like: number;
  view: number;
  writer: UserInput;
  category: CategoryInput;
  episode: EpisodeInput[];
}

export interface UserInput {
  id: number;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  phoneNumber: string;
  coin: number;
  series: SeriesInput[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
