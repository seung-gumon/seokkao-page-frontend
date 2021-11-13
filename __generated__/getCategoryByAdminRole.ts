/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCategoryByAdminRole
// ====================================================

export interface getCategoryByAdminRole_getCategoryByAdminRole {
  __typename: "Category";
  id: number;
  categoryName: string;
}

export interface getCategoryByAdminRole {
  getCategoryByAdminRole: getCategoryByAdminRole_getCategoryByAdminRole[];
}

export interface getCategoryByAdminRoleVariables {
  mainCategory: string;
}
