import { View, Text, Switch } from "react-native";
import React from "react";
import { router, Redirect } from "expo-router";

import { useThemeContext } from "../../context/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useAuthContext } from "../../context/AuthProvider";
import { useErrorHandler } from "../../context/ErrorHandlerProvider";

const Settings = () => {
  const { theme, toggleTheme } = useThemeContext();
  const { signOut, auth, isLoggedIn, isLoading } = useAuthContext();
  const { handleError } = useErrorHandler();

  if (!isLoading && !isLoggedIn) {
    return <Redirect href="/" />
  }

  const submit = async () => {
    try {
      await signOut();
      router.replace("/");
    } catch (error) {
      await handleError(error);
    }
  }

  return (
    <SafeAreaView className="bg-light-background dark:bg-dark-background h-full">
      <Text className="dark:text-white">
        Toggle Dark Mode
      </Text>
      <Switch value={theme === "dark"} onValueChange={toggleTheme}/>
      <View>
        <CustomButton 
          title="Sign Out"
          handlePress={submit}
        />
        <CustomButton 
          title="Back to index"
          variant="secondary"
          handlePress={() => router.push("/")}
        />
      </View>
    </SafeAreaView>
  )
}

export default Settings;