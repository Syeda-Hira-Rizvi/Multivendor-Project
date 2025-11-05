import { createAction } from "@reduxjs/toolkit";

//Forgot Password Seller
export const shopForgotPasswordRequest = createAction("shopForgotPasswordRequest");
export const shopForgotPasswordSuccess = createAction("shopForgotPasswordSuccess");
export const shopForgotPasswordFail = createAction("shopForgotPasswordFail");

//Reset Password Seller 
export const shopResetPasswordRequest = createAction("shopResetPasswordRequest");
export const shopResetPasswordSuccess = createAction("shopResetPasswordSuccess");
export const shopResetPasswordFail = createAction("shopResetPasswordFail");

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
