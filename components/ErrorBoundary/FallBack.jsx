import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const FallBack = ({ error, resetErrorBoundary }) => {
  // resetErrorBoundary();

  return (
    <View>
      <Text>Something went wrong</Text>
      <Text className="text-light-error">
        {error.message}
      </Text>
    <TouchableOpacity
      className="mt-5"
      onPress={() =>{router.back()}}
    >
      <Text className="font-mono-bold text-light-red">
        Go back
      </Text>
    </TouchableOpacity>
    </View>
  )
};

export default FallBack;