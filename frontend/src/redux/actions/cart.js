// // add to cart
// export const addTocart = (data) => async (dispatch, getState) => {
//   dispatch({
//     type: "addToCart",
//     payload: data,
//   });

//   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
//   return data;
// };

// // remove from cart
// export const removeFromCart = (data) => async (dispatch, getState) => {
//   dispatch({
//     type: "removeFromCart",
//     payload: data._id,
//   });
//   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
//   return data;
// };








import {
  addToCartRequest,
  addToCartSuccess,
  addToCartFail,
  removeFromCartRequest,
  removeFromCartSuccess,
  removeFromCartFail,
} from "../constants/cartConstants";

// add to cart
export const addTocart = (data) => async (dispatch, getState) => {
  try {
    dispatch(addToCartRequest());

    // success
    dispatch(addToCartSuccess(data));

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return data;
  } catch (error) {
    dispatch(addToCartFail(error.message || "Something went wrong"));
  }
};

// remove from cart
export const removeFromCart = (data) => async (dispatch, getState) => {
  try {
    dispatch(removeFromCartRequest());

    // success
    dispatch(removeFromCartSuccess(data._id));

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return data;
  } catch (error) {
    dispatch(removeFromCartFail(error.message || "Something went wrong"));
  }
};

