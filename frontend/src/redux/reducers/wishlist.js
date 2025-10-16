// import { createReducer } from "@reduxjs/toolkit";

// const initialState = {
//   wishlist: localStorage.getItem("wishlistItems")
//     ? JSON.parse(localStorage.getItem("wishlistItems"))
//     : [],
// };

// export const wishlistReducer = createReducer(initialState, {
//   addToWishlist: (state, action) => {
//     const item = action.payload;
//     const isItemExist = state.wishlist.find((i) => i._id === item._id);
//     if (isItemExist) {
//       return {
//         ...state,
//         wishlist: state.wishlist.map((i) =>
//           i._id === isItemExist._id ? item : i
//         ),
//       };
//     } else {
//       return {
//         ...state,
//         wishlist: [...state.wishlist, item],
//       };
//     }
//   },

//   removeFromWishlist: (state, action) => {
//     return {
//       ...state,
//       wishlist: state.wishlist.filter((i) => i._id !== action.payload),
//     };
//   },
// });










import { createReducer } from "@reduxjs/toolkit";
import {
  addToWishlistRequest,
  addToWishlistSuccess,
  addToWishlistFail,
  removeFromWishlistRequest,
  removeFromWishlistSuccess,
  removeFromWishlistFail,
} from "../constants/wishlistConstants";

const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
  isLoading: false,
  error: null,
};

export const wishlistReducer = createReducer(initialState, (builder) => {
  builder
    // Add to Wishlist
    .addCase(addToWishlistRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(addToWishlistSuccess, (state, action) => {
      state.isLoading = false;
      const item = action.payload;
      const isItemExist = state.wishlist.find((i) => i._id === item._id);
      if (isItemExist) {
        state.wishlist = state.wishlist.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.wishlist.push(item);
      }
    })
    .addCase(addToWishlistFail, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Remove from Wishlist
    .addCase(removeFromWishlistRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(removeFromWishlistSuccess, (state, action) => {
      state.isLoading = false;
      state.wishlist = state.wishlist.filter((i) => i._id !== action.payload);
    })
    .addCase(removeFromWishlistFail, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
});
