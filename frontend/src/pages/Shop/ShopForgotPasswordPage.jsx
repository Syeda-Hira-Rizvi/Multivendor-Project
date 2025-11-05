import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShopForgotPassword from "../../components/Shop/ShopForgotPassword.jsx";

const ShopForgotPasswordPage = () => {
  const navigate = useNavigate();
  
  // redux se seller auth state
  const { isSeller } = useSelector((state) => state.seller);

  useEffect(() => {
    // ✅ Agar seller already login hai to redirect to dashboard
    if (isSeller === true) {
      navigate("/dashboard");
    }
  }, [isSeller, navigate]);

  return (
    <div>
      <ShopForgotPassword />
    </div>
  );
};

export default ShopForgotPasswordPage;
