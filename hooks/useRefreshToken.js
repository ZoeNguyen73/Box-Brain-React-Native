import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAuthContext } from "../context/AuthProvider";
import axios from "../api/axios";
import GlobalErrorHandler from "../utils/GlobalErrorHandler";

const useRefreshToken = () => {
  const { setAuth } = useAuthContext();
  const [refreshToken, setRefreshToken] = useState("");

  useEffect(() => {

    const getRefreshToken = async () => {
      try {
        const token = await AsyncStorage.getItem("refreshToken");
        setRefreshToken(token);
      } catch (error) {
        GlobalErrorHandler(error);
      }
    };

    getRefreshToken();
    
  }, []);

  const refresh = async () => {
    const response = await axios.post(
      "/auth/refresh",
      { refreshToken }
    );

    const newAccessToken = response.data.accessToken;
    setAuth(prev => {
      return {...prev, accessToken: newAccessToken}
    });
    await AsyncStorage.setItem("accessToken", newAccessToken);

    return newAccessToken;
  }

  return refresh;
};

export default useRefreshToken;