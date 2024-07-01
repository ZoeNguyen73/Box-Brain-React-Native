import { View, Text } from "react-native";
import React from "react";
import { useAuthContext } from "../../context/AuthProvider";
import { Redirect } from "expo-router";

const Home = () => {
  const { auth, isLoggedIn, isLoading } = useAuthContext();

  if (!isLoading && !isLoggedIn) {
    return <Redirect href="/" />
  }

  return (
    <View>
        <Text>User is Logged In</Text>
        <Text>{auth.username}</Text>
        <StatusBar style="auto" />
      </View>
  )
};

export default Home;