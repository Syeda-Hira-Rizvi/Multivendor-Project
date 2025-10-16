import { createAction } from "@reduxjs/toolkit";

// Load Seller
export const loadSellerRequest = createAction("loadSellerRequest");
export const loadSellerSuccess = createAction("loadSellerSuccess");
export const loadSellerFail = createAction("loadSellerFail");

// Get All Sellers --- Admin
export const getAllSellersRequest = createAction("getAllSellersRequest");
export const getAllSellersSuccess = createAction("getAllSellersSuccess");
export const getAllSellersFailed = createAction("getAllSellersFailed");

// Clear Errors
export const clearErrors = createAction("clearErrors");
