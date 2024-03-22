import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { getCurrentUser } from "@/api";
import { useAPI } from "@/hooks/useApi";
import { setCurrentUserDetails } from "@/store/slices/user";
import { isApiError } from "@/types/Api";
import { isLoggedIn } from "@/utils";

const useFetchUserDetails = () => {
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

  return { loading, user };
};

export default useFetchUserDetails;
