import { View, Text, Image } from "react-native";
import React from "react";
import { router } from "expo-router";

import { illustrations } from "../constants";
import CustomButton from "./CustomButton/CustomButton";

const NoAuth = ({ containerStyles }) => {
  return (
    <View
      className={`${containerStyles} flex-1 flex-column justify-center items-center`}
    >
      <View
        className="bg-light-yellow rounded-full justify-center items-center w-[250px] h-[250px] mb-8"
      >
        <Image 
          source={illustrations.openDoodlesMessy}
          resizeMode="contain"
          style={{ maxWidth: "100%" }}
        />
      </View>

      <Text className="font-serif-bold text-4xl tracking-wider text-light-text dark:text-dark-text">
        Oops...
      </Text>
      <Text className="font-sans tracking-wide text-light-text dark:text-dark-text mb-10 mt-3">
        Please sign in to access this feature
      </Text>

      <CustomButton 
        title="Go to Sign In"
        handlePress={() => router.push("/sign-in")}
      />
    </View>
  )
};

export default NoAuth;