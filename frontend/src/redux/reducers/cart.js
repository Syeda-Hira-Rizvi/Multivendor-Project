// import { createReducer } from "@reduxjs/toolkit";

// const initialState = {
//   cart: localStorage.getItem("cartItems")
//     ? JSON.parse(localStorage.getItem("cartItems"))
//     : [],
// };

// export const cartReducer = createReducer(initialState, {
//   addToCart: (state, action) => {
//     const item = action.payload;
//     const isItemExist = state.cart.find((i) => i._id === item._id);
//     if (isItemExist) {
//       return {
//         ...state,
//         cart: state.cart.map((i) => (i._id === isItemExist._id ? item : i)),
//       };
//     } else {
//       return {
//         ...state,
//         cart: [...state.cart, item],
//       };
//     }
//   },

//   removeFromCart: (state, action) => {
//     return {
//       ...state,
//       cart: state.cart.filter((i) => i._id !== action.payload),
//     };
//   },
// });







import { createReducer } from "@reduxjs/toolkit";
import {
  addToCartRequest,
  addToCartSuccess,
  addToCartFail,
  removeFromCartRequest,
  removeFromCartSuccess,
  removeFromCartFail,
  clearCart,
} from "../constants/cartConstants";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  isLoading: false,
  error: null,
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    // add to cart
    .addCase(addToCartRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(addToCartSuccess, (state, action) => {
      state.isLoading = false;
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i._id === item._id);

      if (isItemExist) {
        state.cart = state.cart.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.cart.push(item);
      }
    })
    .addCase(addToCartFail, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // remove from cart
    .addCase(removeFromCartRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(removeFromCartSuccess, (state, action) => {
      state.isLoading = false;
      state.cart = state.cart.filter((i) => i._id !== action.payload);
    })
    .addCase(removeFromCartFail, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // clear cart
    .addCase(clearCart, (state) => {
      state.cart = [];
    });
});





