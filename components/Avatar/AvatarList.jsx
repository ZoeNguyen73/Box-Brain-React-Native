import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

import { avatars } from "../../constants";
import tailwindConfig from "../../tailwind.config";

const Avatar = ({ avatarName, selectedAvatar, setSelectedAvatar }) => {
  const lightWarning = tailwindConfig.theme.extend.colors.light.warning;
  const opacity = avatarName === selectedAvatar ? 1 : 0.3;
  const borderColor = avatarName === selectedAvatar ? lightWarning : "transparent";

  return (
    <TouchableOpacity
      onPress={() => setSelectedAvatar(avatarName)}
      className="p-2"
    >
      <Image 
        source={avatars[avatarName]}
        alt={avatarName}
        opacity={opacity}
        borderWidth={5}
        borderRadius={40}
        borderColor={borderColor}
        className="w-[80] h-[80]"
        resizeMode="cover"
      />
    </TouchableOpacity>
  )
};

const AvatarList = ({ containerStyles, selectedAvatar, setSelectedAvatar }) => {
  return (
    <View
      className={`flex flex-row flex-wrap justify-between items-center ${containerStyles}`}
    >
      {Object.keys(avatars).map((avatar) => (
        <Avatar 
          key={avatar}
          avatarName={avatar} 
          selectedAvatar={selectedAvatar} 
          setSelectedAvatar={setSelectedAvatar}
        />
      ))}
    </View>
  )
};

export default AvatarList;