import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { useThemeContext } from "../../context/ThemeProvider";

import tailwindConfig from "../../tailwind.config";

const EditableText = ({
  value, 
  onSave,
  placeholder,
  error,
  containerStyles,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(value);

  const { theme } = useThemeContext();
  const lightTextColor = tailwindConfig.theme.extend.colors.light.text;
  const darkTextColor = tailwindConfig.theme.extend.colors.dark.text;
  const lightSurface= tailwindConfig.theme.extend.colors.light.surface;
  const darkSurface = tailwindConfig.theme.extend.colors.dark.surface;

  const handleSave = () => {
    onSave(currentText);
    setIsEditing(false);
  };

  return (
    <View className={containerStyles}>
      { isEditing ? (
        // <View
        //   className={`w-full px-4 border 
        //   ${ error ? "border-light-error dark:border-dark-error" : "border-light-surface dark:border-dark-surface"} 
        //   rounded-xl focus:border-light-warning items-center flex-row`}
        //   backgroundColor={`${ theme === "dark" ? darkSurface : lightSurface}`}
        //   style={{ minHeight: 40 }}
        // >
           <TextInput
            className="font-sans-light text-light-text dark:text-dark-text"
            placeholder={placeholder}
            placeholderTextColor={`${ theme === "dark" ? "#6c7086" : lightTextColor}`}
            value={currentText}
            onBlur={handleSave}
            onChangeText={setCurrentText}
            autoFocus
          />
        // </View>
       
      ) : (
        <TouchableOpacity
          onPress={() => setIsEditing(true)}
        >
          <Text
            className="font-sans text-light-text dark:text-dark-text"
          >
            {currentText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
};

export default EditableText;