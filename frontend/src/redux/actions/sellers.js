// import axios from "axios";
// import { server } from "../../server";

// // get all sellers --- admin
// export const getAllSellers = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: "getAllSellersRequest",
//     });

//     const { data } = await axios.get(`${server}/shop/admin-all-sellers`, {
//       withCredentials: true,
//     });

//     dispatch({
//       type: "getAllSellersSuccess",
//       payload: data.sellers,
//     });
//   } catch (error) {
//     dispatch({
//       type: "getAllSellerFailed",
//     //   payload: error.response.data.message,
//     });
//   }
// };












import axios from "axios";
import { server } from "../../server";
import {
  shopForgotPasswordRequest,
  shopForgotPasswordSuccess,
  shopForgotPasswordFail,
  shopResetPasswordRequest,
  shopResetPasswordSuccess,
  shopResetPasswordFail,
  getAllSellersRequest,
  getAllSellersSuccess,
  getAllSellersFailed,
  loadSellerRequest,
  loadSellerSuccess,
  loadSellerFail,
} from "../constants/sellerConstants";

// shop forgot password 
export const shopForgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(shopForgotPasswordRequest());

    const { data } = await axios.post(
      `${server}/shop/shop-forgot-password`,
      { email },
      { withCredentials: true }
    );

    dispatch(shopForgotPasswordSuccess(data.message));
  } catch (error) {
    dispatch(
      shopForgotPasswordFail(error.response?.data?.message || "Something went wrong")
    );
  }
};

//shop reset password 
export const shopResetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch(shopResetPasswordRequest());

    const { data } = await axios.put(
      `${server}/shop/shop-reset-password/${token}`,
      { password },
      { withCredentials: true }
    );

    dispatch(shopResetPasswordSuccess(data.message));
  } catch (error) {
    dispatch(
      shopResetPasswordFail(error.response?.data?.message || "Reset failed")
    );
  }
};


// get all sellers --- admin
export const getAllSellers = () => async (dispatch) => {
  try {
    dispatch(getAllSellersRequest());

    const { data } = await axios.get(`${server}/shop/admin-all-sellers`, {
      withCredentials: true,
    });

    dispatch(getAllSellersSuccess(data.sellers));
  } catch (error) {
    dispatch(
      getAllSellersFailed(
        error.response?.data?.message || "Failed to fetch sellers"
      )
    );
  }
};

// load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch(loadSellerRequest());
    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true,
    });
    dispatch(loadSellerSuccess(data.seller));
  } catch (error) {
    dispatch(loadSellerFail(error.response.data.message));
  }
};

// //load seller
// export const loadSeller = () => async (dispatch) => {
//   try {
//     const hasSellerToken = document.cookie.includes("seller_token=");
//     if (!hasSellerToken) return; // this line is added
//     dispatch(loadSellerRequest());
//     const { data } = await axios.get(`${server}/shop/getSeller`, { withCredentials: true });
//     dispatch(loadSellerSuccess(data.seller));
//   } catch (error) {
//     dispatch(loadSellerFail(error.response.data.message));
//   }
// };

// //load seller
// export const loadSeller = () => async (dispatch) => {
//   try {
//     const hasSellerToken = document.cookie.includes("seller_token=");
//     if (!hasSellerToken) {
//       return dispatch(loadSellerFail("No seller token found"));
//     }

//     dispatch(loadSellerRequest());

//     const { data } = await axios.get(`${server}/shop/getSeller`, {
//       withCredentials: true,
//     });

//     dispatch(loadSellerSuccess(data.seller));
//   } catch (error) {
//     dispatch(
//       loadSellerFail(error.response?.data?.message || "Failed to load seller")
//     );
//   }
// };
