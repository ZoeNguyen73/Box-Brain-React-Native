import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import Checkbox from "expo-checkbox";

import tailwindConfig from "../../tailwind.config";
import { useThemeContext } from "../../context/ThemeProvider";

const CheckBox = ({ title, multiple, max, min, items, handleSelectionChange, containerStyles, error }) => {
  const [checkedOptions, setCheckedOptions] = useState({});

  const { theme } = useThemeContext();
  const checkedColor = tailwindConfig.theme.extend.colors.light.yellow;
  const notCheckedColor = theme === "dark"
    ? tailwindConfig.theme.extend.colors.dark.text
    : tailwindConfig.theme.extend.colors.light.text;

  useEffect(() => {
    const initialCheckedOptions = {};
    items.forEach((item) => {
      initialCheckedOptions[item.label] = false;
    });
    setCheckedOptions(initialCheckedOptions);
  }, []);

  const uncheckOtherOptions = (selectedOptionValue) => {
    setCheckedOptions((prev) => {
      const updatedOptions = { ...prev };
      Object.keys(updatedOptions).forEach((key) => {
        updatedOptions[key] = key === selectedOptionValue;
      });
      return updatedOptions;
    })
  }
  
  return (
    <View className={containerStyles}>
      { title && (
        <Text className="font-sans-semibold text-sm text-light-text dark:text-dark-text tracking-wide">
          {title}
        </Text>
      )}
      { items.map((item) => {
        const currentKey = item.label;
        const currentValue =  checkedOptions[currentKey];
        return (
          <View className="flex-row items-center my-1" key={item.label}>
            <Checkbox 
              style={{ margin: 8, height: 25, width: 25 }}
              value={currentValue}
              onValueChange={() => {
                handleSelectionChange(currentKey, !currentValue);
                if (multiple) {
                  setCheckedOptions((prev) => ({
                    ...prev,
                    [currentKey]: !currentValue,
                  }));
                } else if (!multiple) {
                  uncheckOtherOptions(currentKey);
                }     
              }}
              color={ checkedOptions[item.label] ? checkedColor : notCheckedColor }
              disabled={item.disabled}
            />
            <Text className="font-sans text-light-text dark:text-dark-text pt-1">
              {item.label}
            </Text>
          </View>
        )
      })}
      { error && (
        <Text className="text-light-error dark:text-dark-error font-xs font-sans-light">
          {error}
        </Text>
      )}
    </View>
  )
};

export default CheckBox;