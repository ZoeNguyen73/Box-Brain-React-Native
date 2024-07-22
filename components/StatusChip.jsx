import { View, Text } from "react-native";
import React from "react";

const StatusChip = ({ text, color, size }) => {
  const bgColor = color ? `bg-light-${color}` : "bg-transparent";
  const borderSettings = color ? "" : "border border-dark-surface";
  const textColor = color ? "text-white" : "text-dark-surface";

  let textSize = "";

  if (!size || size === "default") {
    textSize = "text-xs"
  } else if (size === "large") {
    textSize = "text-base"
  };

  return (
    <View
      className={`${bgColor} rounded-xl py-0.5 px-1.5 ${borderSettings} w-fit`}
    >
      <Text className={`font-sans-light-italic ${textSize} ${textColor}`}>
        {text}
      </Text>
    </View>
  )
};

export default StatusChip;