import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from ".";
import Loader from "@/components/Loader";
import useFetchUserDetails from "@/hooks/useFetchUserDetails";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { loading, user } = useFetchUserDetails();

  if (loading) {
    return (
      <div className="relative  w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isLoggedIn() && user) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default PrivateRoute;
