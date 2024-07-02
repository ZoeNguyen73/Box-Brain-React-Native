import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ title, handlePress, containerStyles }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-light-yellow dark:bg-dark-yellow rounded-xl min-h-[62px] justify-center items-center 
        ${containerStyles}`}
    >
      <Text
        className="text-white dark:text-light-text"
      >
        {title}
      </Text>

    </TouchableOpacity>
  )
}

export default CustomButton;