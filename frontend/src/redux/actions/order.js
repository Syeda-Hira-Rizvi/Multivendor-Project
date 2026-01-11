// import axios from "axios";
// import { server } from "../../server";

// // get all orders of user
// export const getAllOrdersOfUser = (userId) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "getAllOrdersUserRequest",
//     });

//     const { data } = await axios.get(
//       `${server}/order/get-all-orders/${userId}`
//     );

//     dispatch({
//       type: "getAllOrdersUserSuccess",
//       payload: data.orders,
//     });
//   } catch (error) {
//     dispatch({
//       type: "getAllOrdersUserFailed",
//       payload: error.response.data.message,
//     });
//   }
// };

// // get all orders of seller
// export const getAllOrdersOfShop = (shopId) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "getAllOrdersShopRequest",
//     });

//     const { data } = await axios.get(
//       `${server}/order/get-seller-all-orders/${shopId}`
//     );

//     dispatch({
//       type: "getAllOrdersShopSuccess",
//       payload: data.orders,
//     });
//   } catch (error) {
//     dispatch({
//       type: "getAllOrdersShopFailed",
//       payload: error.response.data.message,
//     });
//   }
// };

// // get all orders of Admin
// export const getAllOrdersOfAdmin = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: "adminAllOrdersRequest",
//     });

//     const { data } = await axios.get(`${server}/order/admin-all-orders`, {
//       withCredentials: true,
//     });

//     dispatch({
//       type: "adminAllOrdersSuccess",
//       payload: data.orders,
//     });
//   } catch (error) {
//     dispatch({
//       type: "adminAllOrdersFailed",
//       payload: error.response.data.message,
//     });
//   }
// };










import axios from "axios";
// import { server } from "../../server";
import {
  getAllOrdersUserRequest,
  getAllOrdersUserSuccess,
  getAllOrdersUserFailed,
  getAllOrdersShopRequest,
  getAllOrdersShopSuccess,
  getAllOrdersShopFailed,
  adminAllOrdersRequest,
  adminAllOrdersSuccess,
  adminAllOrdersFailed,
} from "../constants/orderConstants";

// get all orders of user
export const getAllOrdersOfUser = (userId) => async (dispatch) => {
  try {
    dispatch(getAllOrdersUserRequest());

    const { data } = await axios.get(`${REACT_APP_BASE_URL}/order/get-all-orders/${userId}`);

    dispatch(getAllOrdersUserSuccess(data.orders));
  } catch (error) {
    dispatch(getAllOrdersUserFailed(error.response?.data?.message || error.message));
  }
};

// get all orders of seller
export const getAllOrdersOfShop = (shopId) => async (dispatch) => {
  try {
    dispatch(getAllOrdersShopRequest());

    const { data } = await axios.get(
      `${REACT_APP_BASE_URL}/order/get-seller-all-orders/${shopId}`
    );

    dispatch(getAllOrdersShopSuccess(data.orders));
  } catch (error) {
    dispatch(getAllOrdersShopFailed(error.response?.data?.message || error.message));
  }
};

// get all orders of Admin
export const getAllOrdersOfAdmin = () => async (dispatch) => {
  try {
    dispatch(adminAllOrdersRequest());

    const { data } = await axios.get(`${REACT_APP_BASE_URL}/order/admin-all-orders`, {
      withCredentials: true,
    });

    dispatch(adminAllOrdersSuccess(data.orders));
  } catch (error) {
    dispatch(adminAllOrdersFailed(error.response?.data?.message || error.message));
  }
};

