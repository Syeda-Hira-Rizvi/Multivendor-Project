import { createAction } from "@reduxjs/toolkit";

//Forgot Password
export const forgotPasswordRequest = createAction("forgotPasswordRequest");
export const forgotPasswordSuccess = createAction("forgotPasswordSuccess");
export const forgotPasswordFail = createAction("forgotPasswordFail");

//Reset Password
export const resetPasswordRequest = createAction("resetPasswordRequest");
export const resetPasswordSuccess = createAction("resetPasswordSuccess");
export const resetPasswordFail = createAction("resetPasswordFail");

// Load User
export const loadUserRequest = createAction("loadUserRequest");
export const loadUserSuccess = createAction("loadUserSuccess");
export const loadUserFail = createAction("loadUserFail");

// Update User Info
export const updateUserInfoRequest = createAction("updateUserInfoRequest");
export const updateUserInfoSuccess = createAction("updateUserInfoSuccess");
export const updateUserInfoFailed = createAction("updateUserInfoFailed");

// Update User Address
export const updateUserAddressRequest = createAction("updateUserAddressRequest");
export const updateUserAddressSuccess = createAction("updateUserAddressSuccess");
export const updateUserAddressFailed = createAction("updateUserAddressFailed");

// Delete User Address
export const deleteUserAddressRequest = createAction("deleteUserAddressRequest");
export const deleteUserAddressSuccess = createAction("deleteUserAddressSuccess");
export const deleteUserAddressFailed = createAction("deleteUserAddressFailed");

// Get All Users (Admin)
export const getAllUsersRequest = createAction("getAllUsersRequest");
export const getAllUsersSuccess = createAction("getAllUsersSuccess");
export const getAllUsersFailed = createAction("getAllUsersFailed");

// Clear
export const clearErrors = createAction("clearErrors");
export const clearMessages = createAction("clearMessages");
