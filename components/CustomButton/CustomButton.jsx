import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";

import { useThemeContext } from "../../context/ThemeProvider";
import tailwindConfig from "../../tailwind.config";

const CustomButton = ({ title, handlePress, containerStyles, iconName, isDisabled, variant }) => {
  const { theme } = useThemeContext();
  let backgroundColor = "bg-light-yellow ";
  let textColor = "text-dark-background";
  let size = "min-h-[45px] min-w-[200px] px-6 py-4"
  let textSize = "text-xl";
  let iconSize = 16;
  let iconColor = tailwindConfig.theme.extend.colors.dark.background;

  if (!variant || variant === "primary") {
  } else if (variant === "secondary") {
    backgroundColor = "border border-2 border-light-yellow";
    textColor = "text-light-yellow";
    iconColor = tailwindConfig.theme.extend.colors.light.text;
  } else if (variant === "small-primary") {
    size = "min-h-[20px] min-w-[60px] px-3 py-1";
    textSize = "text-sm";
    iconSize = 14;
  } else if (variant === "small-secondary") {
    backgroundColor = theme === "dark"
      ? "bg-dark-surface"
      : "bg-light-surface";
    textColor = "text-light-text dark:text-dark-text";
    iconColor = theme === "dark"
      ? tailwindConfig.theme.extend.colors.dark.text
      : tailwindConfig.theme.extend.colors.light.text;
    size = "min-h-[20px] min-w-[60px] px-3 py-1";
    textSize = "text-sm";
    iconSize = 14;
  } 

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`${backgroundColor} ${size} rounded-full justify-center items-center
        ${containerStyles}`}
    >
      <View className="justify-center items-center flex-row">
        <Text
          className={`${textColor} ${textSize} font-sans-semibold tracking-wider`}
        >
          {title}
        </Text>
        { iconName && (
          <View className="ml-1">
            <Feather
              name={iconName} size={iconSize} color={iconColor}
            />
          </View>
        )}
        
       
      </View>
      
    </TouchableOpacity>
  )
}

export default CustomButton;