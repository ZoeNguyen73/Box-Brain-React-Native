import { Image } from "react-native";
import React from "react";

import { avatars } from "../../constants";
import { useThemeContext } from "../../context/ThemeProvider";
import tailwindConfig from "../../tailwind.config";

const Avatar = ({ avatarName, dimensionInPx }) => {
  const dimension = dimensionInPx || "20";
  const { theme } = useThemeContext();
  const borderColor = theme === "dark"
    ? tailwindConfig.theme.extend.colors.dark.yellow
    : tailwindConfig.theme.extend.colors.light.yellow

  return (
    <Image 
      source={avatars[avatarName]}
      alt={avatarName}
      borderWidth={5}
      borderRadius={45}
      borderColor={borderColor}
      className={`w-[90px] h-[90px]`}
      resizeMode="cover"
    />
  )
}

export default Avatar;