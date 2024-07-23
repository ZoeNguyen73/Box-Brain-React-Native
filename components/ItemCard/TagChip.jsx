import { View, Text } from "react-native";
import React from "react";
import tailwindConfig from "../../tailwind.config";

const TagChip = ({ text, color }) => {
  const bgColorName = "card-" + color + "-800";
  const bgColorCode = tailwindConfig.theme.extend.colors.light[bgColorName];

  return (
    <View
      className="rounded-2xl py-1 px-2 mr-2 border border-dark-surface"
      style={{ backgroundColor: bgColorCode }}
    >
      <Text className="font-sans-light text-xs text-black">
        {text}
      </Text>
    </View>
  )
}

export default TagChip;