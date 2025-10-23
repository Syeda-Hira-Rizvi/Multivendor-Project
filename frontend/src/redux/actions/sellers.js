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
  getAllSellersRequest,
  getAllSellersSuccess,
  getAllSellersFailed,
  loadSellerRequest,
  loadSellerSuccess,
  loadSellerFail,
} from "../constants/sellerConstants";

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

// // load seller
// export const loadSeller = () => async (dispatch) => {
//   try {
//     dispatch(loadSellerRequest());
//     const { data } = await axios.get(`${server}/shop/getSeller`, {
//       withCredentials: true,
//     });
//     dispatch(loadSellerSuccess(data.seller));
//   } catch (error) {
//     dispatch(loadSellerFail(error.response.data.message));
//   }
// };

//load seller
export const loadSeller = () => async (dispatch) => {
  try {
    const hasSellerToken = document.cookie.includes("seller_token=");
    if (!hasSellerToken) return;
    dispatch(loadSellerRequest());
    const { data } = await axios.get(`${server}/shop/getSeller`, { withCredentials: true });
    dispatch(loadSellerSuccess(data.seller));
  } catch (error) {
    dispatch(loadSellerFail(error.response.data.message));
  }
};
