import { useState, useEffect } from "react";
import { axiosInstance } from "~/lib/AxiosInstance";

export default function useApiStatus() {
  const [apiStatus, setApiStatus] = useState(false);

  async function checkApiStatus() {
    try {
      const response = await axiosInstance.get(`/`);

      if (response.status === 200) {
        setApiStatus(true);
      } else {
        setApiStatus(false);
      }
    } catch (error) {
      console.error("Error checking API status:", error);
      setApiStatus(false);
    }
  }

  useEffect(() => {
    checkApiStatus();

    return () => {
      checkApiStatus();
    };
  }, []);

  return apiStatus;
}
