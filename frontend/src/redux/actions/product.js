// import axios from "axios";
// import { server } from "../../server";

// // create product
// export const createProduct =
//   (
//     name,
//     description,
//     category,
//     tags,
//     originalPrice,
//     discountPrice,
//     stock,
//     shopId,
//     images
//   ) =>
//   async (dispatch) => {
//     try {
//       dispatch({
//         type: "productCreateRequest",
//       });

//       const { data } = await axios.post(
//         `${server}/product/create-product`,
//         name,
//         description,
//         category,
//         tags,
//         originalPrice,
//         discountPrice,
//         stock,
//         shopId,
//         images,
//       );
//       dispatch({
//         type: "productCreateSuccess",
//         payload: data.product,
//       });
//     } catch (error) {
//       dispatch({
//         type: "productCreateFail",
//         payload: error.response.data.message,
//       });
//     }
//   };

// // get All Products of a shop
// export const getAllProductsShop = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "getAllProductsShopRequest",
//     });

//     const { data } = await axios.get(
//       `${server}/product/get-all-products-shop/${id}`
//     );
//     dispatch({
//       type: "getAllProductsShopSuccess",
//       payload: data.products,
//     });
//   } catch (error) {
//     dispatch({
//       type: "getAllProductsShopFailed",
//       payload: error.response.data.message,
//     });
//   }
// };

// // delete product of a shop
// export const deleteProduct = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "deleteProductRequest",
//     });

//     const { data } = await axios.delete(
//       `${server}/product/delete-shop-product/${id}`,
//       {
//         withCredentials: true,
//       }
//     );

//     dispatch({
//       type: "deleteProductSuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "deleteProductFailed",
//       payload: error.response.data.message,
//     });
//   }
// };

// // get all products
// export const getAllProducts = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: "getAllProductsRequest",
//     });

//     const { data } = await axios.get(`${server}/product/get-all-products`);
//     dispatch({
//       type: "getAllProductsSuccess",
//       payload: data.products,
//     });
//   } catch (error) {
//     dispatch({
//       type: "getAllProductsFailed",
//       payload: error.response.data.message,
//     });
//   }
// };













import axios from "axios";
// import { server } from "../../server";
import {
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
  getAllProductsShopRequest,
  getAllProductsShopSuccess,
  getAllProductsShopFailed,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailed,
  getAllProductsRequest,
  getAllProductsSuccess,
  getAllProductsFailed,
} from "../constants/productConstants";

// create product
// export const createProduct =
//   (
//     name,
//     description,
//     category,
//     tags,
//     originalPrice,
//     discountPrice,
//     stock,
//     shopId,
//     images
//   ) =>
//   async (dispatch) => {
//     try {
//       dispatch(productCreateRequest());

//       const { data } = await axios.post(
//         `${server}/product/create-product`,
//         {
//           name,
//           description,
//           category,
//           tags,
//           originalPrice,
//           discountPrice,
//           stock,
//           shopId,
//           images,
//         },
//         { withCredentials: true }
//       );

//       dispatch(productCreateSuccess(data.product));
//     } catch (error) {
//       dispatch(productCreateFail(error.response?.data?.message || error.message));
//     }
//   };

// create product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch(productCreateRequest());

    const { data } = await axios.post(
      `${REACT_APP_BASE_URL}/product/create-product`,
      productData,
      { withCredentials: true }
    );

    dispatch(productCreateSuccess(data.product));
  } catch (error) {
    dispatch(
      productCreateFail(error.response?.data?.message || error.message)
    );
  }
};


// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch(getAllProductsShopRequest());

    const { data } = await axios.get(
      `${REACT_APP_BASE_URL}/product/get-all-products-shop/${id}`
    );

    dispatch(getAllProductsShopSuccess(data.products));
  } catch (error) {
    dispatch(getAllProductsShopFailed(error.response?.data?.message || error.message));
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());

    const { data } = await axios.delete(
      `${REACT_APP_BASE_URL}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch(deleteProductSuccess(data.message));
  } catch (error) {
    dispatch(deleteProductFailed(error.response?.data?.message || error.message));
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch(getAllProductsRequest());

    const { data } = await axios.get(`${REACT_APP_BASE_URL}/product/get-all-products`);

    dispatch(getAllProductsSuccess(data.products));
  } catch (error) {
    dispatch(getAllProductsFailed(error.response?.data?.message || error.message));
  }
};
