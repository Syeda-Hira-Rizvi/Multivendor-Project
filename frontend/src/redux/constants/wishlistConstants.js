import { createAction } from "@reduxjs/toolkit";

// Add to wishlist
export const addToWishlistRequest = createAction("addToWishlistRequest");
export const addToWishlistSuccess = createAction("addToWishlistSuccess");
export const addToWishlistFail = createAction("addToWishlistFail");

// Remove from wishlist
export const removeFromWishlistRequest = createAction("removeFromWishlistRequest");
export const removeFromWishlistSuccess = createAction("removeFromWishlistSuccess");
export const removeFromWishlistFail = createAction("removeFromWishlistFail");
