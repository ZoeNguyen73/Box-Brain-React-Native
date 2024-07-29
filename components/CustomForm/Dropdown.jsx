import { View, Text } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import Feather from "@expo/vector-icons/Feather";

import tailwindConfig from "../../tailwind.config";
import { useThemeContext } from "../../context/ThemeProvider";

const Dropdown = ({ 
  title, 
  helpText, 
  containerStyles, 
  value, 
  handleChangeValue, 
  items, 
  multiple, 
  min, 
  max, 
  placeholder,
  open,
  setOpen,
  onOpen,
  mode, 
}) => {
  // const [open, setOpen] = useState(open);
  const [selectedValue, setSelectedValue] = useState(value);
  const { theme } = useThemeContext();
  const bgColor = theme === "dark"
    ? tailwindConfig.theme.extend.colors.dark.surface
    : tailwindConfig.theme.extend.colors.light.surface;
  const highlightBorderColor = tailwindConfig.theme.extend.colors.light.warning;
  const textColor = theme === "dark"
    ? tailwindConfig.theme.extend.colors.dark.text
    : tailwindConfig.theme.extend.colors.light.text;
  const textFont = tailwindConfig.theme.fontFamily.sans[0];
  const textFontBold = tailwindConfig.theme.fontFamily["sans-bold"][0];

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
        // TO DO: ListEmptyComponent 
        open={open}
        setOpen={setOpen}
        onOpen={onOpen}
        value={selectedValue}
        items={items}
        setValue={setSelectedValue}
        onChangeValue={(value) => {
          handleChangeValue(value);
        }}
        multiple={multiple}
        min={ min || null }
        max={ max || null }
        style={{ 
          backgroundColor: bgColor, 
          minHeight: 40, 
          borderWidth: open ? 1 : 0,
          borderColor: highlightBorderColor,
        }}
        dropDownContainerStyle={{ backgroundColor: bgColor, borderColor: highlightBorderColor }}
        textStyle={{
          color: textColor,
          fontFamily: textFont,
        }}
        placeholder={ placeholder || "Please select an item"}
        ArrowDownIconComponent={() => <Feather name="chevron-down" size={24} color={textColor} />}
        ArrowUpIconComponent={() => <Feather name="chevron-up" size={24} color={textColor} />}
        TickIconComponent={() => <Feather name="check" size={24} color={tailwindConfig.theme.extend.colors.light.text} />}
        selectedItemContainerStyle={{
          backgroundColor: tailwindConfig.theme.extend.colors.light.yellow,
        }}
        selectedItemLabelStyle={{
          color: tailwindConfig.theme.extend.colors.light.text,
          fontFamily: textFontBold,
        }}
        mode={ mode ? mode : "SIMPLE"}
        badgeColors={[tailwindConfig.theme.extend.colors.light["off-white"]]}
        badgeTextStyle={{
          color: tailwindConfig.theme.extend.colors.light.text
        }}
        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
      />
    </View>
  )
};

export default Dropdown;