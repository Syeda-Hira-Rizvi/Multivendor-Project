import { createAction } from "@reduxjs/toolkit";

export const addToCartRequest = createAction("addToCartRequest");
export const addToCartSuccess = createAction("addToCartSuccess");
export const addToCartFail = createAction("addToCartFail");

export const removeFromCartRequest = createAction("removeFromCartRequest");
export const removeFromCartSuccess = createAction("removeFromCartSuccess");
export const removeFromCartFail = createAction("removeFromCartFail");

export const clearCart = createAction("clearCart");
