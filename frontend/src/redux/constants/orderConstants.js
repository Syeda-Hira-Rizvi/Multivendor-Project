import { createAction } from "@reduxjs/toolkit";

// user orders
export const getAllOrdersUserRequest = createAction("getAllOrdersUserRequest");
export const getAllOrdersUserSuccess = createAction("getAllOrdersUserSuccess");
export const getAllOrdersUserFailed = createAction("getAllOrdersUserFailed");

// shop orders
export const getAllOrdersShopRequest = createAction("getAllOrdersShopRequest");
export const getAllOrdersShopSuccess = createAction("getAllOrdersShopSuccess");
export const getAllOrdersShopFailed = createAction("getAllOrdersShopFailed");

// admin orders
export const adminAllOrdersRequest = createAction("adminAllOrdersRequest");
export const adminAllOrdersSuccess = createAction("adminAllOrdersSuccess");
export const adminAllOrdersFailed = createAction("adminAllOrdersFailed");

// clear errors
export const clearErrors = createAction("clearErrors");
