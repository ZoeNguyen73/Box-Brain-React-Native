import { View, Text } from "react-native";
import React from "react";

import { router } from "expo-router";
import CustomButton from "./CustomButton/CustomButton";

const DailySummary = () => {
  const handlePress = () => {
    router.push("/review/daily-review")
  };

  return (
    <View className="w-full h-[160px] bg-light-rosewater rounded-xl p-4 my-4">
      <Text className="font-mono-bold text-4xl">
        Daily Summary
      </Text>

      <CustomButton 
        title="Start Daily Review"
        handlePress={handlePress}
      />

    </View>
  )
};

export default DailySummary;