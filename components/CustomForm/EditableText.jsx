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
  maxLength,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(value);
  const [notEdited, setNotEdited] = useState(true);

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
        <TextInput
          className="font-sans-light text-light-text dark:text-dark-text"
          placeholder={placeholder}
          placeholderTextColor={`${ theme === "dark" ? "#6c7086" : lightTextColor}`}
          value={currentText}
          onBlur={handleSave}
          onChangeText={(value) => {
            setNotEdited(false);
            setCurrentText(value);
          }}
          autoFocus
          maxLength={ maxLength ? maxLength : 2000}
        />
      ) : (
        <TouchableOpacity
          onPress={() => setIsEditing(true)}
        >
          <Text
            className={`${ notEdited ? "font-sans-italic text-light-grey1 dark:text-dark-grey1" : "font-sans text-light-text dark:text-dark-text" }`}
          >
            {notEdited ? placeholder : currentText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
};

export default EditableText;