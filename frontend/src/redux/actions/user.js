// import axios from "axios";
// import { server } from "../../server";

// // load user
// export const loadUser = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: "LoadUserRequest",
//     });
//     const { data } = await axios.get(`${server}/user/getuser`, {
//       withCredentials: true,
//     });
//     dispatch({
//       type: "LoadUserSuccess",
//       payload: data.user,
//     });
//   } catch (error) {
//     dispatch({
//       type: "LoadUserFail",
//       payload: error.response.data.message,
//     });
//   }
// };

// // load seller
// export const loadSeller = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: "LoadSellerRequest",
//     });
//     const { data } = await axios.get(`${server}/shop/getSeller`, {
//       withCredentials: true,
//     });
//     dispatch({
//       type: "LoadSellerSuccess",
//       payload: data.seller,
//     });
//   } catch (error) {
//     dispatch({
//       type: "LoadSellerFail",
//       payload: error.response.data.message,
//     });
//   }
// };

// // user update information
// export const updateUserInformation =
//   (name, email, phoneNumber, password) => async (dispatch) => {
//     try {
//       dispatch({
//         type: "updateUserInfoRequest",
//       });

//       const { data } = await axios.put(
//         `${server}/user/update-user-info`,
//         {
//           email,
//           password,
//           phoneNumber,
//           name,
//         },
//         {
//           withCredentials: true,
//           headers: {
//             "Access-Control-Allow-Credentials": true,
//           },
//         }
//       );

//       dispatch({
//         type: "updateUserInfoSuccess",
//         payload: data.user,
//       });
//     } catch (error) {
//       dispatch({
//         type: "updateUserInfoFailed",
//         payload: error.response.data.message,
//       });
//     }
//   };

// // update user address
// export const updatUserAddress =
//   (country, city, address1, address2, zipCode, addressType) =>
//   async (dispatch) => {
//     try {
//       dispatch({
//         type: "updateUserAddressRequest",
//       });

//       const { data } = await axios.put(
//         `${server}/user/update-user-addresses`,
//         {
//           country,
//           city,
//           address1,
//           address2,
//           zipCode,
//           addressType,
//         },
//         { withCredentials: true }
//       );

//       dispatch({
//         type: "updateUserAddressSuccess",
//         payload: {
//           successMessage: "User address updated succesfully!",
//           user: data.user,
//         },
//       });
//     } catch (error) {
//       dispatch({
//         type: "updateUserAddressFailed",
//         payload: error.response.data.message,
//       });
//     }
//   };

// // delete user address
// export const deleteUserAddress = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "deleteUserAddressRequest",
//     });

//     const { data } = await axios.delete(
//       `${server}/user/delete-user-address/${id}`,
//       { withCredentials: true }
//     );

//     dispatch({
//       type: "deleteUserAddressSuccess",
//       payload: {
//         successMessage: "User deleted successfully!",
//         user: data.user,
//       },
//     });
//   } catch (error) {
//     dispatch({
//       type: "deleteUserAddressFailed",
//       payload: error.response.data.message,
//     });
//   }
// };

// // get all users --- admin
// export const getAllUsers = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: "getAllUsersRequest",
//     });

//     const { data } = await axios.get(`${server}/user/admin-all-users`, {
//       withCredentials: true,
//     });

//     dispatch({
//       type: "getAllUsersSuccess",
//       payload: data.users,
//     });
//   } catch (error) {
//     dispatch({
//       type: "getAllUsersFailed",
//       payload: error.response.data.message,
//     });
//   }
// };






import axios from "axios";
// import { server } from "../../server";
import {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  updateUserInfoRequest,
  updateUserInfoSuccess,
  updateUserInfoFailed,
  updateUserAddressRequest,
  updateUserAddressSuccess,
  updateUserAddressFailed,
  deleteUserAddressRequest,
  deleteUserAddressSuccess,
  deleteUserAddressFailed,
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFailed,
} from "../constants/userConstants";


//forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());

    const { data } = await axios.post(
      `${REACT_APP_BASE_URL}/user/forgot-password`,
      { email },
      { withCredentials: true }
    );

    dispatch(forgotPasswordSuccess(data.message));
  } catch (error) {
    dispatch(
      forgotPasswordFail(error.response?.data?.message || "Something went wrong")
    );
  }
};

// Reset Password
export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());

    const { data } = await axios.put(
      `${REACT_APP_BASE_URL}/user/reset-password/${token}`,
      { password },
      { withCredentials: true }
    );

    dispatch(resetPasswordSuccess(data.message));
  } catch (error) {
    dispatch(
      resetPasswordFail(error.response?.data?.message || "Something went wrong")
    );
  }
};


// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await axios.get(`${REACT_APP_BASE_URL}/user/getuser`, {
      withCredentials: true,
    });
    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    // if user is not logged in (401 Unauthorized), just fail silently — no toast
    if (error.response && error.response.status === 401) {
      dispatch(loadUserFail(null)); // no message to avoid toast
    } else {
      dispatch(loadUserFail(error.response?.data?.message || "Something went wrong"));
    }
  }
};

// // load user
// export const loadUser = () => async (dispatch) => {
//   try {
//     const hasUserToken = document.cookie.includes("token=");
//     if (!hasUserToken) return; // this line is added

//     dispatch(loadUserRequest());
//     const { data } = await axios.get(`${server}/user/getuser`, { withCredentials: true });
//     dispatch(loadUserSuccess(data.user));
//   } catch (error) {
//     dispatch(loadUserFail(error.response?.data?.message || "Failed to load user"));
//   }
// };


// update user information
export const updateUserInformation =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch(updateUserInfoRequest());

      const { data } = await axios.put(
        `${REACT_APP_BASE_URL}/user/update-user-info`,
        { email, password, phoneNumber, name },
        {
          withCredentials: true,
          headers: { "Access-Control-Allow-Credentials": true },
        }
      );

      dispatch(updateUserInfoSuccess(data.user));
    } catch (error) {
      dispatch(updateUserInfoFailed(error.response.data.message));
    }
  };

// update user address
export const updateUserAddress =
  (country, city, address1, address2, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch(updateUserAddressRequest());

      const { data } = await axios.put(
        `${REACT_APP_BASE_URL}/user/update-user-addresses`,
        { country, city, address1, address2, zipCode, addressType },
        { withCredentials: true }
      );

      dispatch(
        updateUserAddressSuccess({
          successMessage: "User address updated successfully!",
          user: data.user,
        })
      );
    } catch (error) {
      dispatch(updateUserAddressFailed(error.response.data.message));
    }
  };

// delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch(deleteUserAddressRequest());

    const { data } = await axios.delete(
      `${REACT_APP_BASE_URL}/user/delete-user-address/${id}`,
      { withCredentials: true }
    );

    dispatch(
      deleteUserAddressSuccess({
        successMessage: "User address deleted successfully!",
        user: data.user,
      })
    );
  } catch (error) {
    dispatch(deleteUserAddressFailed(error.response.data.message));
  }
};

// get all users --- admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(getAllUsersRequest());

    const { data } = await axios.get(`${REACT_APP_BASE_URL}/user/admin-all-users`, {
      withCredentials: true,
    });

    dispatch(getAllUsersSuccess(data.users));
  } catch (error) {
    dispatch(getAllUsersFailed(error.response.data.message));
  }
};
