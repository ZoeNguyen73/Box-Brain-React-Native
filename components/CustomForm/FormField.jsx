import { View, Text, TextInput } from "react-native";
import React from "react";

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles }) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">
        {title}
      </Text>

      <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl
        focus:border-secondary items-center flex-row"
      >
        <TextInput 
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
        />

      </View>
    </View>
  )
}

export default FormField;