/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PurChaseHistoryInput, MainCategoryRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: getDashBoardData
// ====================================================

export interface getDashBoardData_seriesDashBoardData_series_category {
  __typename: "Category";
  id: number;
  mainCategory: MainCategoryRole;
  categoryName: string;
}

export interface getDashBoardData_seriesDashBoardData_series_episode {
  __typename: "Episode";
  id: number;
  episode: number;
}

export interface getDashBoardData_seriesDashBoardData_series {
  __typename: "Series";
  thumbnail: string;
  name: string;
  description: string;
  /**
   * 언제 연재하는지
   */
  serialization: string;
  like: number;
  view: number;
  category: getDashBoardData_seriesDashBoardData_series_category;
  episode: getDashBoardData_seriesDashBoardData_series_episode[];
}

export interface getDashBoardData_seriesDashBoardData {
  __typename: "PurchaseHistoryOutput";
  date: string[];
  count: number[];
  series: getDashBoardData_seriesDashBoardData_series;
}

export interface getDashBoardData {
  seriesDashBoardData: getDashBoardData_seriesDashBoardData;
}

export interface getDashBoardDataVariables {
  purchaseInput: PurChaseHistoryInput;
}
