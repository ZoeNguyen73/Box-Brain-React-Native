import { View, Text, StyleSheet } from "react-native";
import React from "react";

const ProgressBar = ({ amount, containerStyles, hideProgressLabel }) => {
  return (
    <View className={containerStyles}>
      { !hideProgressLabel && (
        <Text 
          className="font-sans-light-italic text-light-text"
          style={{ fontSize: 10 }}
        >
          {amount} completed
        </Text>
      )}

      <View className="h-[10px] rounded-full bg-transparent border-2 border-dark-background dark:border-dark-grey1">
        <View
          style={[StyleSheet.absoluteFill, { 
            backgroundColor: "#FFBD12", 
            width: amount, 
            borderRadius: 50, 
            overflow: "hidden"
          }]}
        >

        </View>
      </View>
      
    </View>
    
  )
};

export default ProgressBar;