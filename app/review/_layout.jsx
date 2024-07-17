import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import tailwindConfig from "../../tailwind.config";
import { useThemeContext } from "../../context/ThemeProvider";

const ReviewLayout = () => {
  const { theme } = useThemeContext();

  const lightBackgroundColor = tailwindConfig.theme.extend.colors.light.background;
  const darkBackgroundColor = tailwindConfig.theme.extend.colors.dark.background;

  return (
    <>
      <Stack>
        <Stack.Screen 
          name="daily-review"
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="box-review/[boxID]"
          options={{ headerShown: false }}
        />

      </Stack>

      <StatusBar 
        backgroundColor={`${ theme === "dark" ? darkBackgroundColor : lightBackgroundColor }`} 
        style={`${ theme === "dark" ? "light" : "dark"}`}
      />
    </>
  )
};

export default ReviewLayout;