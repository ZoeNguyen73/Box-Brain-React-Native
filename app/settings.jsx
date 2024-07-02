import { View, Text, Switch } from "react-native";
import React from "react";

import { useThemeContext } from "../context/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <SafeAreaView className="bg-light-background dark:bg-dark-background">
      <Text className="dark:text-white">
        Toggle Dark Mode
      </Text>
      <Switch value={theme === "dark"} onValueChange={toggleTheme}/>
    </SafeAreaView>
  )
}

export default Settings;