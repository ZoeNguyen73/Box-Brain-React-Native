import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import tailwindConfig from "../../tailwind.config";
import { useThemeContext } from "../../context/ThemeProvider";

import { icons } from "../../constants";

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, inputMode, error }) => {
  const { theme } = useThemeContext();
  const lightTextColor = tailwindConfig.theme.extend.colors.light.text;
  const darkTextColor = tailwindConfig.theme.extend.colors.dark.text;
  const lightSurface= tailwindConfig.theme.extend.colors.light.surface;
  const darkSurface = tailwindConfig.theme.extend.colors.dark.surface;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-1 ${otherStyles}`}>
      <Text className="font-sans-semibold text-sm text-light-text dark:text-dark-text tracking-wide">
        {title}
      </Text>

      <View 
        className={`w-full h-12 px-4 border 
        ${ error ? "border-light-error dark:border-dark-error" : "border-light-surface dark:border-dark-surface"} 
        rounded-xl focus:border-light-warning items-center flex-row`}
        backgroundColor={`${ theme === "dark" ? darkSurface : lightSurface}`}
      >
        <TextInput 
          className="flex-1 font-sans-light text-light-text dark:text-dark-text"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={`${ theme === "dark" ? "#6c7086" : lightTextColor}`}
          inputMode={inputMode}
          onChangeText={handleChangeText}
          secureTextEntry={(title === "Password" || title === "Confirm Password") && !showPassword}
          textContentType={`${ title === "Email" ? "emailAddress" : ""}`}
        />
        {(title === "Password" || title === "Confirm Password") && (
          <TouchableOpacity onPress={()=>setShowPassword(!showPassword)} >
            <Image 
              source={ !showPassword ? icons.eye : icons.eyeHide }
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>

      { error && (
        <Text className="text-light-error dark:text-dark-error font-xs font-sans-light">
          {error}
        </Text>
      )}
    </View>
  )
};

export default FormField;