import { View, Text } from "react-native";
import React from "react";

const PropertyDisplay = ({ name, content }) => {
  return (
    <View className="flex-column gap-0.25 my-2.5">
      <Text className="font-mono-semibold text text-light-grey2">
        {name}
      </Text>
      <Text className="font-sans-italic text-sm text-light-grey2">
        {content}
      </Text>
    </View>
  )
};

export default PropertyDisplay;