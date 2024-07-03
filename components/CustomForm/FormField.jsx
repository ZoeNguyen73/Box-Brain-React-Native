import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import tailwindConfig from "../../tailwind.config";
import { useThemeContext } from "../../context/ThemeProvider";

import { icons } from "../../constants";

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles,  inputMode }) => {
  const { theme } = useThemeContext();
  const lightTextColor = tailwindConfig.theme.extend.colors.light.text;
  const darkTextColor = tailwindConfig.theme.extend.colors.dark.text;
  const lightSurface= tailwindConfig.theme.extend.colors.light.surface;
  const darkSurface = tailwindConfig.theme.extend.colors.dark.surface;


  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="font-sans-semibold text-base text-light-text dark:text-dark-text tracking-wide">
        {title}
      </Text>

      <View 
        className="w-full h-12 px-4 border border-light-grey1 dark:border-dark-Surface rounded-xl
        focus:border-light-warning items-center flex-row"
        backgroundColor={`${ theme === "dark" ? darkSurface : lightSurface}`}
      >
        <TextInput 
          className="flex-1 font-sans-light text-light-text dark:text-dark-text"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={`${ theme === "dark" ? darkTextColor : lightTextColor}`}
          inputMode={inputMode}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          textContentType={`${ title === "Email" ? "emailAddress" : ""}`}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={()=>setShowPassword(!showPassword)} >
            <Image 
              source={ !showPassword ? icons.eye : icons.eyeHide }
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField;