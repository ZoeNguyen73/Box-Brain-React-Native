import { Alert } from "react-native";

const GlobalErrorHandler = (error) => {
  if (error.response) {
    console.log(`error.response: ` + error.response);
    const errorMessage = error.response.data.message || "An error occurred";
    const errorDetails = error.response.data.details || "Please try again.";
    Alert.alert(errorMessage, errorDetails);
  } else if (error.request) {
    console.log(`error.request: ` + error.request);
    Alert.alert("No response from server", "Please check your internet connection and try again.");
  } else {
    console.log("other error");
    Alert.alert("Error", error.message);
  }
};

export default GlobalErrorHandler;