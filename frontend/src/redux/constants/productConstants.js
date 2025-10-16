import { createAction } from "@reduxjs/toolkit";

// product create
export const productCreateRequest = createAction("productCreateRequest");
export const productCreateSuccess = createAction("productCreateSuccess");
export const productCreateFail = createAction("productCreateFail");

// get all products of shop
export const getAllProductsShopRequest = createAction("getAllProductsShopRequest");
export const getAllProductsShopSuccess = createAction("getAllProductsShopSuccess");
export const getAllProductsShopFailed = createAction("getAllProductsShopFailed");

// delete product of shop
export const deleteProductRequest = createAction("deleteProductRequest");
export const deleteProductSuccess = createAction("deleteProductSuccess");
export const deleteProductFailed = createAction("deleteProductFailed");

// get all products
export const getAllProductsRequest = createAction("getAllProductsRequest");
export const getAllProductsSuccess = createAction("getAllProductsSuccess");
export const getAllProductsFailed = createAction("getAllProductsFailed");

// clear errors
export const clearErrors = createAction("clearErrors");
