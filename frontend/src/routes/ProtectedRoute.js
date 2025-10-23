import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  if (loading === false) {
    if (!isAuthenticated) {
       toast.error("Please login to continue");
      return <Navigate to="/login" replace />;
    }
    return children;
  }
};

export default ProtectedRoute; 
