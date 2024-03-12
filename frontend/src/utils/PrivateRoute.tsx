import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from ".";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  return isLoggedIn() ? <>{children}</> : <Navigate to="/" replace />;
};

export default PrivateRoute;
