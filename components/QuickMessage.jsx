import { View, Text } from "react-native";
import React from "react";

const QuickMessage = () => {
  return (
    <View className="w-full h-50px] bg-dark-warning rounded-xl px-4 py-2 my-2">
      <Text className="font-mono text-sx">
        Amazing! You've hit your goals 5 days in a row. Keep it going!
      </Text>
    </View>
  )
};

export default QuickMessage;