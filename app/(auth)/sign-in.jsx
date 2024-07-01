import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";

import { useAuthContext } from "../../context/AuthProvider";

const SignIn = () => {
  const { login, auth, isLoggedIn, isLoading } = useAuthContext();

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <Text className="text-white text-lg">Sign In</Text>
    </SafeAreaView>
  )
}

export default SignIn;