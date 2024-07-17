import { View, Text } from "react-native";
import React from "react";

const TagChip = ({ text, color }) => {
  const bgColor = color ? `bg-light-${color}` : "bg-transparent";
  const borderSettings = color ? "" : "border border-dark-surface";
  const textColor = color ? "text-dark-text" : "text-dark-surface";

  return (
    <View
      className={`${bgColor} rounded-2xl py-1 px-2 mr-2 ${borderSettings}`}
    >
      <Text className={`font-sans-light text-xs ${textColor}`}>
        {text}
      </Text>
    </View>
  )
}

export default TagChip;