import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "../api/axios";
import GlobalErrorHandler from "../utils/GlobalErrorHandler";

const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [auth, setAuth] = useState({
    username: "",
    accessToken: "",
  });

  const signIn = async ({username, hash}) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "/auth/login",
        { username, hash },
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
      GlobalErrorHandler(error);

    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
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
      GlobalErrorHandler(error);

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
    <AuthContext.Provider value={{ signIn, signOut, setAuth, auth, isLoggedIn, setIsLoggedIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  )

};

export default AuthContext;