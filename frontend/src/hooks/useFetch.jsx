import { useState } from "react";
import { useCallback } from "react";
import { getAuthState } from "../context/authcontext";
const useFetch = () => {
  const { logout } = getAuthState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const request = useCallback(
    async (
      url,
      metadata = {
        method: "GET",
      }
    ) => {
      setIsLoading(true);

      if (metadata.headers) {
        metadata.headers.Authorization = `Bearer ${localStorage.getItem(
          "user_token"
        )}`;
      } else {
        metadata.headers = {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`,
        };
      }

      try {
        const response = await fetch(url, metadata);
        const data = await response.json();
        console.log(data);
        if (data.status !== "ok") {
          if (data.error?.authorization) {
            logout();
          }
          setError(data.error);
        } else {
          setData(data);
        }
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    },
    [logout]
  );
  return {
    isLoading,
    error,
    data,
    request,
  };
};

export default useFetch;
