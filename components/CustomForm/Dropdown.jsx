import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import tailwindConfig from "../../tailwind.config";
import { useThemeContext } from "../../context/ThemeProvider";

const Dropdown = ({ title, helpText, containerStyles, value, handleChangeValue, items, multiple, min, max }) => {
  const [open, setOpen] = useState(false);
  const { theme } = useThemeContext();
  const bgColor = theme === "dark"
    ? tailwindConfig.theme.extend.colors.dark.surface
    : tailwindConfig.theme.extend.colors.light.surface

  return (
    <View className={containerStyles}>
      <Text className="font-sans-semibold text-sm text-light-text dark:text-dark-text tracking-wide">
        {title}
      </Text>
      { helpText && (
        <Text className="font-sans-light-italic text-xs text-light-text dark:text-dark-text">
          {helpText}
        </Text>
      )}
      <DropDownPicker 
        open={open}
        setOpen={setOpen}
        value={value}
        items={items}
        onChangeValue={(value) => handleChangeValue(value)}
        multiple={multiple}
        min={ min || null }
        max={ max || null }
        style={{ backgroundColor: bgColor, minHeight: 40}}
      />
    </View>
  )
};

export default Dropdown;