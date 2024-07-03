import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { useThemeContext } from "../../context/ThemeProvider";
import tailwindConfig from "../../tailwind.config";

const CustomButton = ({ title, handlePress, containerStyles, iconName }) => {
  const { theme } = useThemeContext();
  const lightTextColor = tailwindConfig.theme.extend.colors.light.text;

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-light-yellow dark:bg-dark-yellow rounded-xl min-h-[62px] 
        justify-center items-center px-6 py-4 w-fit
        ${containerStyles}`}
    >
      <View className="justify-center items-center flex-row gap-2">
        <Text
          className="text-white dark:text-light-text font-mono-bold uppercase text-xl tracking-wider"
        >
          {title}
        </Text>
        <FontAwesome5
          name={iconName} size={16} 
          color={`${theme === "dark" ? lightTextColor : "white"}`} 
        />
      </View>
      
    </TouchableOpacity>
  )
}

export default CustomButton;