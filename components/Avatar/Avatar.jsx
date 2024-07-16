import { Image, View } from "react-native";
import React from "react";

import { avatars } from "../../constants";
import { useThemeContext } from "../../context/ThemeProvider";
import tailwindConfig from "../../tailwind.config";

const Avatar = ({ avatarName, size, withoutBorder }) => {
  let dimension = 80; // 5rem 80px
  let borderRadius = 40;
  if (size && size === "extra small") {
    dimension = 44; // 2.75rem 44px
    borderRadius = 22;
  } else if (size && size === "small") {
    dimension = 60; // 4rem 64px
    borderRadius = 30;
  } else if (size && size === "large") {
    dimension = 112; // 7rem 112px
    borderRadius = 56;
  }

  const { theme } = useThemeContext();
  const borderColor = theme === "dark"
    ? tailwindConfig.theme.extend.colors.dark.yellow
    : tailwindConfig.theme.extend.colors.light.yellow

  const borderWidth = withoutBorder ? 0 : 5;

  return (
    <View 
      className="justify-center items-center"
      style={{
        width: dimension,
        height: dimension
      }}
    >
      <Image 
        source={avatars[avatarName]}
        alt={avatarName}
        borderWidth={borderWidth}
        borderRadius={borderRadius}
        borderColor={borderColor}
        className="w-[100%] h-[100%]"
        resizeMode="contain"
      />
    </View>

  )
}

export default Avatar;