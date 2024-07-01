import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "../api/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [auth, setAuth] = useState({
    username: "",
    accessToken: "",
  });

  const login = async (username, hash) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "/auth/login",
        { username, hash }
      );

      const { accessToken, refreshToken } = response.data;

      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);

      setAuth({ username, accessToken });
      setIsLoggedIn(true);

    } catch (error) {
      setAuth({
        username: "",
        accessToken: "",
      });
      setIsLoggedIn(false);
      console.log(`log in error: ${error.message}`);
      throw new Error(error);

    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      await axios.delete(
        "/auth/logout",
        { data: { refreshToken }}
      );

      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");

      setAuth({
        username: "",
        accessToken: "",
      });
      setIsLoggedIn(false);

    } catch (error) {
      console.log(`log out error: ${error.message}`);
      throw new Error(error);

    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentUser = async () => {
    setIsLoading(true);

    try {
      const currentUsername = await AsyncStorage.getItem("username");
      const currentAccessToken = await AsyncStorage.getItem("accessToken");
      const currentRefreshToken = await AsyncStorage.getItem("refreshToken");

      if (!currentUsername || !currentAccessToken || !currentRefreshToken) {
        setAuth({
          username: "",
          accessToken: "",
        });
        setIsLoading(false);
        setIsLoggedIn(false);
        return;
      }

      setAuth({
        username: currentUsername,
        accessToken: currentAccessToken,
      });

      setIsLoggedIn(true);

    } catch (error) {
      console.log(`get current user error: ${error.message}`);
      setIsLoggedIn(false);
      throw new Error(error);

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [])

  return (
    <AuthContext.Provider value={{ login, logout, auth, isLoggedIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  )

};

export default AuthContext;