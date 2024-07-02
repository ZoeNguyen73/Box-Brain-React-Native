import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { router, Redirect } from "expo-router";

import { useAuthContext } from "../context/AuthProvider";

// components
import CustomButton from "../components/CustomButton/CustomButton";

const App = () => {
  const { isLoggedIn, isLoading } = useAuthContext();

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />
  }

  return (
    <View style={styles.container}>
      <Text>Hey there! welcome to Box Brain</Text>
      <Text>Please sign in to continue</Text>
      <CustomButton 
        title="Sign In"
        handlePress={() => router.push("/sign-in")}
        containerStyles="w-full mt-7"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;