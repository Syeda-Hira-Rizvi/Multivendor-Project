// import React, { useState, useEffect } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import styles from "../../styles/styles";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { server } from "../../server";
// import { toast } from "react-toastify";

// const ShopResetPassword = () => {
//   const navigate = useNavigate();
//   const { token } = useParams();

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [visible, setVisible] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password.length < 8) {
//       toast.error("Password must be at least 8 characters");
//       return;
//     }

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     setLoading(true);

//     try {
//       await axios.post(
//         `${server}/shop/reset-password/${token}`,
//         { password },
//         { withCredentials: true }
//       );

//       toast.success("Password Reset Successfully!");
//       setTimeout(() => navigate("/shop-login"), 2000);
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Reset failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Reset Password (Shop)
//         </h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 New Password
//               </label>
//               <div className="mt-1 relative">
//                 <input
//                   type={visible ? "text" : "password"}
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
//                   placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//                 {visible ? (
//                   <AiOutlineEye
//                     className="absolute right-2 top-2 cursor-pointer"
//                     size={24}
//                     onClick={() => setVisible(false)}
//                   />
//                 ) : (
//                   <AiOutlineEyeInvisible
//                     className="absolute right-2 top-2 cursor-pointer"
//                     size={24}
//                     onClick={() => setVisible(true)}
//                   />
//                 )}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Confirm Password
//               </label>
//               <div className="mt-1 relative">
//                 <input
//                   type={visible ? "text" : "password"}
//                   required
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
//                   placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//                 {visible ? (
//                   <AiOutlineEye
//                     className="absolute right-2 top-2 cursor-pointer"
//                     size={24}
//                     onClick={() => setVisible(false)}
//                   />
//                 ) : (
//                   <AiOutlineEyeInvisible
//                     className="absolute right-2 top-2 cursor-pointer"
//                     size={24}
//                     onClick={() => setVisible(true)}
//                   />
//                 )}
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className={`group relative w-full h-[40px] flex justify-center py-2 px-4 
//               border border-transparent text-sm font-medium rounded-md text-white 
//               ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
//             >
//               {loading ? "Resetting..." : "Reset Password"}
//             </button>

//             <div className={`${styles.noramlFlex} w-full`}>
//               <p>Back to login?</p>
//               <Link to="/shop-login" className="text-blue-600 pl-2">
//                 Sign In
//               </Link>
//             </div>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopResetPassword;


// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import styles from "../../styles/styles";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { shopResetPassword } from "../../redux/actions/sellers";

// const ShopResetPassword = () => {
//   const navigate = useNavigate();
//   const { token } = useParams();
//   const dispatch = useDispatch();

//   const { loading, successMessage, error } = useSelector((state) => state.seller);

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [visible, setVisible] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (password.length < 8) {
//       toast.error("Password must be at least 8 characters");
//       return;
//     }

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     dispatch(shopResetPassword(token, password));
//   };

//   if (successMessage) {
//     toast.success(successMessage);
//     setTimeout(() => navigate("/shop-login"), 1500);
//   }

//   if (error) {
//     toast.error(error);
//   }

//   return (
//     // 👇 Your existing JSX same, just button text changed below
//     <button
//       type="submit"
//       disabled={loading}
//       className={`group relative w-full h-[40px] flex justify-center py-2 px-4 
//       border border-transparent text-sm font-medium rounded-md text-white 
//       ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
//     >
//       {loading ? "Resetting..." : "Reset Password"}
//     </button>
//   );
// };

// export default ShopResetPassword;




import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styles from "../../styles/styles";
import { shopResetPassword } from "../../redux/actions/sellers";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ShopResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();

  const { isLoading, error, successMessage } = useSelector(
    (state) => state.seller
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(shopResetPassword(token, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (successMessage) {
      toast.success(successMessage);
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/shop-login"), 2500);
    }
  }, [error, successMessage, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please enter your new password
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter new password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[8px] text-xl"
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Confirm new password"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-[8px] text-xl"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full h-[40px] flex justify-center py-2 px-4 
              border border-transparent text-sm font-medium rounded-md text-white 
              ${
                isLoading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>

            <div className={`${styles.noramlFlex} w-full`}>
              <p>Back to</p>
              <Link to="/shop-login" className="text-blue-600 pl-2">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopResetPassword;
