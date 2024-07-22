import { View, Text } from "react-native";
import React from "react";

const StatusChip = ({ text, backgroundColor, fontColor, size }) => {
  const bgColor = backgroundColor ? `bg-${backgroundColor}` : "bg-transparent";
  const borderSettings = backgroundColor ? "" : "border border-dark-surface";
  const textColor = fontColor ? `text-${fontColor}` : "text-light-text";

  let textSize = 14;

  if (size && size === "small") {
    textSize = 12;
  } else if (size && size === "large") {
    textSize = 18;
  }

  return (
    <View
      className={`${bgColor} rounded-xl px-1.5 ${borderSettings} w-fit`}
    >
      <Text 
        className={`font-sans-light-italic ${textColor}`}
        style={{ fontSize: textSize }}
      >
        {text}
      </Text>
    </View>
  )
};

export default StatusChip;