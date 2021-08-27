/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSerializationTodayFromMain
// ====================================================

export interface getSerializationTodayFromMain_getSerializationTodayFromMain {
  __typename: "Series";
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  view: number;
  like: number;
}

export interface getSerializationTodayFromMain {
  getSerializationTodayFromMain: getSerializationTodayFromMain_getSerializationTodayFromMain[];
}

export interface getSerializationTodayFromMainVariables {
  mainCategory: string;
  today: string;
}
