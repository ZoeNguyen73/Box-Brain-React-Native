import { View, Text } from "react-native";
import React from "react";

const ProgressBar = ({ amount }) => {
  return (
    <View className="my-3">
      <Text 
        className="font-sans-light-italic text-light-text"
        style={{ fontSize: 10 }}
      >
        {amount} completed
      </Text>

      <View className="h-2 rounded-full bg-dark-secondary">
        <View 
          className="h-2 rounded-full bg-light-green"
          style={{ width: amount }}
        >
        </View>

      </View>
      
    </View>
    
  )
};

export default ProgressBar;