import { View, Text } from "react-native";
import React from "react";

const TodayProgress = () => {
  return (
    <View className="w-full h-[200px] bg-light-mauve rounded-xl p-4">
      <Text className="font-mono-bold text-4xl">
        Your Progress today
      </Text>
    </View>
  )
};

export default TodayProgress;