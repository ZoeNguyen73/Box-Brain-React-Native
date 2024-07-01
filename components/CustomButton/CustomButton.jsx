import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ title, handlePress, containerStyles }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-primary rounded-xl min-h-[62px] justify-center items-center 
        ${containerStyles}`}
    >
      <Text
        className="text-white text-lg"
      >
        {title}
      </Text>

    </TouchableOpacity>
  )
}

export default CustomButton;