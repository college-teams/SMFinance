import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from ".";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { getCurrentUser } from "@/api";
import { useAPI } from "@/hooks/useApi";
import { setCurrentUserDetails } from "@/store/slices/user";
import { isApiError } from "@/types/Api";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useAppSelector((state) => state.appState);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const api = useAPI();

  const fetchLoggedInUserDetails = async () => {
    setLoading(true);
    try {
      return await getCurrentUser(api);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (isLoggedIn() && !user) {
        const userDetails = await fetchLoggedInUserDetails();
        if (!isApiError(userDetails)) {
          dispatch(setCurrentUserDetails(userDetails));
        } else {
          console.log("ERROR console");
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // TODO: Add proper loader
  }

  if (isLoggedIn() && user) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default PrivateRoute;
