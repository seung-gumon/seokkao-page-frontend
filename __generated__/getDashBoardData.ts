/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PurChaseHistoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getDashBoardData
// ====================================================

export interface getDashBoardData_seriesDashBoardData {
  __typename: "PurchaseHistoryOutput";
  date: string[];
  count: number[];
}

export interface getDashBoardData {
  seriesDashBoardData: getDashBoardData_seriesDashBoardData;
  totalPurchase: number;
}

export interface getDashBoardDataVariables {
  purchaseInput: PurChaseHistoryInput;
  seriesId: number;
}
