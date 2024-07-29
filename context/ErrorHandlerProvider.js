import { createContext, useContext } from "react";
import { router } from "expo-router";
import { Alert } from "react-native";

import { useClearSession } from "../hooks/useClearSession";
import handleGlobalError from "../utils/ErrorHandler";

const ErrorHandlerContext = createContext();

export const ErrorHandlerProvider = ({ children }) => {
  const { clearSession } = useClearSession();

  const handleError = async (error, handleFormError) => {
    console.log("error received: " + JSON.stringify(error.response.data));
    try {
      if (error.response 
        && error.response.data.details === "Unable to verify refresh token" 
        && error.response.data.name === "TokenExpiredError"
      ) {
        console.log("refresh token expired error triggered");
        // await clearSession();
        Alert.alert("Session expired", "Please log in again to continue", [
          {
            text: "Proceed to log in",
            onPress: () => {
              router.push("/sign-in");
              clearSession();
            }
          }
        ]);
      } else {
        handleGlobalError(error, handleFormError);
      }
    } catch (error) {
      console.log("error: " + JSON.stringify(error));
      handleGlobalError(error);
    }
    
  };

  return (
    <ErrorHandlerContext.Provider value={{ handleError}}>
      {children}
    </ErrorHandlerContext.Provider>
  )
};

export const useErrorHandler = () => useContext(ErrorHandlerContext);