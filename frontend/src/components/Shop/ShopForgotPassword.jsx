// import React, { useState } from "react";
// import styles from "../../styles/styles";
// import axios from "axios";
// import { server } from "../../server";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

// const ShopForgotPassword = () => {
//   const [email, setEmail] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ✅ email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       toast.error("Enter a valid email address");
//       return;
//     }

//     try {
//       await axios.post(
//         `${server}/shop/forgot-password`,
//         { email },
//         { withCredentials: true }
//       );

//       toast.success("Reset link sent to your email!");
//       setEmail("");
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Error sending email");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Forgot Password (Shop)
//         </h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Enter your email
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md
//                      shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   placeholder="example@gmail.com"
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="group relative w-full h-[40px] flex justify-center py-2 px-4 border 
//               border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
//             >
//               Send Reset Link
//             </button>

//             <div className={`${styles.noramlFlex} w-full`}>
//               <p>Remembered password?</p>
//               <Link to="/shop-login" className="text-blue-600 pl-2">
//                 Back to Login
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopForgotPassword;



import React, { useState, useEffect } from "react";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { shopForgotPassword } from "../../redux/actions/sellers";

const ShopForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  // Redux state
  const { isLoading, successMessage, error } = useSelector((state) => state.seller);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address");
      return;
    }

    dispatch(shopForgotPassword(email));
  };

  // ✅ show success/error toast when state updates
  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (successMessage) {
      toast.success(successMessage);
      setEmail("");
    }
  }, [error, successMessage]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter your email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md
                    shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="example@gmail.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full h-[40px] flex justify-center py-2 px-4 border 
              border-transparent text-sm font-medium rounded-md text-white 
              ${isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>

            <div className={`${styles.noramlFlex} w-full`}>
              <p>Remembered password?</p>
              <Link to="/shop-login" className="text-blue-600 pl-2">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopForgotPassword;

