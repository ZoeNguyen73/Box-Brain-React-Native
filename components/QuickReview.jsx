import { View, Text } from "react-native";
import React from "react";

const QuickReview = () => {
  return (
    <View>
      <Text className="font-mono-bold text-2xl mt-6">
        Quick Review
      </Text>
      <View className="w-full h-[500px] bg-light-rosewater rounded-xl p-4 my-2">
        <Text className="font-mono text-2xl">
          Cards to review
        </Text>
      </View>
    </View>
    
  )
};

export default QuickReview;