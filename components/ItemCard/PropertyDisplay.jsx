import { View, Text } from "react-native";
import React from "react";
import Feather from '@expo/vector-icons/Feather';

const PropertyDisplay = ({ name, content, textColor }) => {
  return (
    <View className="flex-column gap-0.25 my-2.5">
      <View className="flex-row gap-0.25 items-center">
        <Feather name="chevron-right" size={14} color={textColor} />
        <Text className="font-mono-semibold tracking-wide" style={{ color: textColor }}>
          {name}
        </Text>
      </View>
      
      <Text className="font-sans-italic text-sm" style={{ color: textColor }}>
        {content}
      </Text>
    </View>
  )
};

export default PropertyDisplay;