// import { createReducer } from "@reduxjs/toolkit";

// const initialState = {
//   isLoading: true,
// };

// export const sellerReducer = createReducer(initialState, {
//   LoadSellerRequest: (state) => {
//     state.isLoading = true;
//   },
//   LoadSellerSuccess: (state, action) => {
//     state.isSeller = true;
//     state.isLoading = false;
//     state.seller = action.payload;
//   },
//   LoadSellerFail: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//     state.isSeller = false;
//   },

//   // get all sellers ---admin
//   getAllSellersRequest: (state) => {
//     state.isLoading = true;
//   },
//   getAllSellersSuccess: (state, action) => {
//     state.isLoading = false;
//     state.sellers = action.payload;
//   },
//   getAllSellerFailed: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },
//   clearErrors: (state) => {
//     state.error = null;
//   },
// });











import { createReducer } from "@reduxjs/toolkit";
import {
  shopForgotPasswordRequest,
  shopForgotPasswordSuccess,
  shopForgotPasswordFail,
  shopResetPasswordRequest,
  shopResetPasswordSuccess,
  shopResetPasswordFail,
  loadSellerRequest,
  loadSellerSuccess,
  loadSellerFail,
  getAllSellersRequest,
  getAllSellersSuccess,
  getAllSellersFailed,
  clearErrors,
} from "../constants/sellerConstants";

const initialState = {
  isLoading: true,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    // Forgot Password
    .addCase(shopForgotPasswordRequest, (state) => {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    })
    .addCase(shopForgotPasswordSuccess, (state, action) => {
      state.isLoading = false;
      state.successMessage = action.payload; 
    })
    .addCase(shopForgotPasswordFail, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // Reset Password
    .addCase(shopResetPasswordRequest, (state) => {
    state.isLoading = true;
    state.error = null;
    state.successMessage = null;
  })
  .addCase(shopResetPasswordSuccess, (state, action) => {
    state.isLoading = false;
    state.successMessage = action.payload;
  })
  .addCase(shopResetPasswordFail, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  })
    // Load Seller
    .addCase(loadSellerRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(loadSellerSuccess, (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
    })
    .addCase(loadSellerFail, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })

    // Get All Sellers (Admin)
    .addCase(getAllSellersRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(getAllSellersSuccess, (state, action) => {
      state.isLoading = false;
      state.sellers = action.payload;
    })
    .addCase(getAllSellersFailed, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Clear Errors
    .addCase(clearErrors, (state) => {
      state.error = null;
    });
});

