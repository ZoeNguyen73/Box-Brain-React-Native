import { View, Text } from "react-native";
import React from "react";

const DailySummary = () => {
  return (
    <View className="w-full h-[160px] bg-light-rosewater rounded-xl p-4 my-4">
      <Text className="font-mono-bold text-4xl">
        Daily Summary
      </Text>
    </View>
  )
};

export default DailySummary;