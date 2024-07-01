import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { useAuthContext } from "../context/AuthProvider";

const App = () => {
  const { login, logout, auth, isLoggedIn, isLoading } = useAuthContext();

  if (!isLoading && isLoggedIn) {
    return (
      <View>
        <Text>User is Logged In</Text>
        <Text>{auth.username}</Text>
        <StatusBar style="auto" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text>Hey there! welcome to Box Brain</Text>
      <Text>Please log in to continue</Text>
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