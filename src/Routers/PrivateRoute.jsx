import { Navigate, useLocation } from "react-router";
import Loader from "../Components/Laoder/Loader";
import useAuth from "../Hooks/useAuth";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div>
      {user ? (
        children
      ) : (
        <Navigate state={location.pathname} to="/login"></Navigate>
      )}
    </div>
  );
};

export default PrivateRoutes;
