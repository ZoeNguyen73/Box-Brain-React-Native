import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Switch } from "react-native";
import { router, Redirect, Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthContext } from "../context/AuthProvider";
import { useThemeContext } from "../context/ThemeProvider";
import tailwindConfig from "../tailwind.config";

// components
import CustomButton from "../components/CustomButton/CustomButton";
import { useEffect } from "react";

const App = () => {
  const { isLoggedIn, isLoading } = useAuthContext();
  const { theme } = useThemeContext();

  const lightBackgroundColor = tailwindConfig.theme.extend.colors.light.background;
  const darkBackgroundColor = tailwindConfig.theme.extend.colors.dark.background;

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />
  }

  return (
    <SafeAreaView 
      className={`
        ${ theme === "dark" ? "dark" : "" }
        bg-light-background dark:bg-dark-background
        justify-center items-center h-full
      `}
    >
      <View>
        <Text className="text-light-text dark:text-dark-text font-serif-black text-2xl">
          Welcome to Box Brain!
        </Text>
      </View>
      
      <Text className="text-light-text dark:text-dark-text">
        Please sign in to continue
      </Text>
      <CustomButton 
        title="Sign In"
        handlePress={() => router.push("/sign-in")}
        containerStyles="w-fit px-6 py-4 mt-7 mb-7"
        icon
      />
      <Link 
        href="/settings"
      >
        <Text className="text-light-links dark:text-dark-links">
          Go to settings
        </Text>
        
      </Link>
      <Link 
        href="/register"
      >
        <Text className="text-light-links dark:text-dark-links">
          Go to register
        </Text>
      </Link>

      <StatusBar 
        backgroundColor={`${ theme === "dark" ? darkBackgroundColor : lightBackgroundColor }`} 
        style={`${ theme === "dark" ? "light" : "dark"}`}
      />
    </SafeAreaView>
  );
}

export default App;