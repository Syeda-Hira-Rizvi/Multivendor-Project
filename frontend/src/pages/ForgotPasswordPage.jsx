import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword.jsx";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    // agar user already login hai to redirect kar do home pe
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <ForgotPassword />
    </div>
  );
};

export default ForgotPasswordPage;
