import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Switch } from "react-native";
import { router, Redirect, Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthContext } from "../context/AuthProvider";
import { useThemeContext } from "../context/ThemeProvider";

// components
import CustomButton from "../components/CustomButton/CustomButton";
import { useEffect } from "react";

const App = () => {
  const { isLoggedIn, isLoading } = useAuthContext();
  const { theme, toggleTheme } = useThemeContext();

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />
  }

  useEffect(() => {
    console.log("current theme on index page: " + theme);
  }, [])

  return (
    <SafeAreaView 
      className={`
        ${ theme === "dark" ? "dark" : "" }
        bg-light-background dark:bg-dark-background
        justify-center items-center h-full
      `}
    >
      <View>
        <Text className="dark:text-white">
          Hey there! welcome to Box Brain
        </Text>
      </View>
      
      <Text>Please sign in to continue</Text>
      <CustomButton 
        title="Sign In"
        handlePress={() => router.push("/sign-in")}
        containerStyles="w-full mt-7"
      />
      <Link href="/settings" className="text-blue-500">Go to settings</Link>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default App;