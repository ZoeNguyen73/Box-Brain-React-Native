import { ScrollView, View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect} from "expo-router";

import { useAuthContext } from "../../context/AuthProvider";

import ProfileWelcomeHeader from "../../components/ProfileWelcomeHeader";

const Profile = () => {
  const { isLoggedIn, isLoading } = useAuthContext();

  if (!isLoading && !isLoggedIn) {
    return <Redirect href="/" />
  }

  return (
    <SafeAreaView
      className="bg-light-background dark:bg-dark-background h-full"
    >
      <ProfileWelcomeHeader
        containerStyles="px-5 pt-5"
      />

      <ScrollView>

      </ScrollView>
    </SafeAreaView>
  )
};

export default Profile;

