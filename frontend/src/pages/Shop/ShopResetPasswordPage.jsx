import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShopResetPassword from "../../components/Shop/ShopResetPassword.jsx";

const ShopResetPasswordPage = () => {
  const navigate = useNavigate();

  // redux se shop login status
  const { isSeller } = useSelector((state) => state.seller);

  useEffect(() => {
    // ✅ Agar seller login hai toh reset password page ki need nahi
    if (isSeller === true) {
      navigate("/dashboard");
    }
  }, [isSeller, navigate]);

  return (
    <div>
      <ShopResetPassword />
    </div>
  );
};

export default ShopResetPasswordPage;
