import { View, Text, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthContext } from "../../context/AuthProvider";

import CustomButton from "../../components/CustomButton/CustomButton";

const Home = () => {
  const { signOut, auth, isLoggedIn, isLoading } = useAuthContext();

  if (!isLoading && !isLoggedIn) {
    return <Redirect href="/" />
  }

  const submit = async () => {
    try {
      await signOut();
      router.replace("/");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <SafeAreaView classname="bg-light-background dark:bg-dark-background h-full">
      <View>
        <Text>User is Logged In</Text>
        <Text>{auth.username}</Text>
        <StatusBar style="auto" />
        <CustomButton 
          title="Sign Out"
          handlePress={submit}
        />
    </View>
    </SafeAreaView>
    
  )
};

export default Home;