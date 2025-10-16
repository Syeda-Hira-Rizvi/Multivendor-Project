// // add to wishlist
// export const addToWishlist = (data) => async (dispatch, getState) => {
//     dispatch({
//       type: "addToWishlist",
//       payload: data,
//     });
  
//     localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
//     return data;
//   };
  
//   // remove from wishlist
//   export const removeFromWishlist = (data) => async (dispatch, getState) => {
//     dispatch({
//       type: "removeFromWishlist",
//       payload: data._id,
//     });
//     localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
//     return data;
//   };
  








import {
  addToWishlistRequest,
  addToWishlistSuccess,
  addToWishlistFail,
  removeFromWishlistRequest,
  removeFromWishlistSuccess,
  removeFromWishlistFail,
} from "../constants/wishlistConstants";

//Add to Wishlist
export const addToWishlist = (data) => async (dispatch, getState) => {
  try {
    dispatch(addToWishlistRequest());

    dispatch(addToWishlistSuccess(data));

    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(getState().wishlist.wishlist)
    );

    return data;
  } catch (error) {
    dispatch(addToWishlistFail(error.message));
  }
};

//Remove from Wishlist
export const removeFromWishlist = (data) => async (dispatch, getState) => {
  try {
    dispatch(removeFromWishlistRequest());

    dispatch(removeFromWishlistSuccess(data._id));

    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(getState().wishlist.wishlist)
    );

    return data;
  } catch (error) {
    dispatch(removeFromWishlistFail(error.message));
  }
};
