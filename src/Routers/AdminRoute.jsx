import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate} from "react-router";
import Loader from "../Components/Laoder/Loader";

const AdminRoute = ({children}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader></Loader>
  }

  if(!user || user.email !== "alamin@gmail.com"){
    return <Navigate to="/forbidden"></Navigate>
  }
  return children;
};

export default AdminRoute;
