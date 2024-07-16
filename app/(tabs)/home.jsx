import { View, Text, Alert, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useAuthContext } from "../../context/AuthProvider";
import { useThemeContext } from "../../context/ThemeProvider";
import GlobalErrorHandler from "../../utils/GlobalErrorHandler";
import tailwindConfig from "../../tailwind.config";

import CustomButton from "../../components/CustomButton/CustomButton";
import Avatar from "../../components/Avatar/Avatar";
import DailySummary from "../../components/DailySummary";
import TodayProgress from "../../components/TodayProgress";
import QuickMessage from "../../components/QuickMessage";
import QuickReview from "../../components/QuickReview";

const Home = () => {
  const { signOut, auth, isLoggedIn, isLoading } = useAuthContext();
  const { theme } = useThemeContext();
  const iconColor = theme === "dark"
    ? tailwindConfig.theme.extend.colors.dark.text
    : tailwindConfig.theme.extend.colors.light.text

  if (!isLoading && !isLoggedIn) {
    return <Redirect href="/" />
  }

  const submit = async () => {
    try {
      await signOut();
      router.replace("/");
    } catch (error) {
      GlobalErrorHandler(error);
    }
  }

  return (
    <SafeAreaView className="bg-light-background dark:bg-dark-background h-full">
      <ScrollView>
        <View className="flex-column w-full px-5 py-5 border">
          <View className="flex-row gap-2.5 items-center ml-1 mb-7">
            <Avatar 
              avatarName={auth.avatar}
              withoutBorder={true}
              size="small"
            />

            <View className="flex-column grow">
              <View className="flex-row gap-1">
                <Text className="font-sans text-light-text dark:text-dark-text">
                  Welcome
                </Text>
                <MaterialCommunityIcons name="hand-wave" size={16} color={iconColor} />
              </View>
              
              <Text className="font-sans-semibold text-xl text-light-text dark:text-dark-text">
                {auth.username}
              </Text>
            </View>

            <View
              className="justify-center items-center w-[50px] h-[50px]"
              style={{
                borderRadius: 25,
                backgroundColor: "#FFFFFF"
              }}
            >
              <MaterialCommunityIcons name="bell-badge-outline" size={30} color={iconColor} />
            </View>
          </View>

          <QuickMessage />

          <DailySummary />

          <TodayProgress />

          <QuickReview />

          {/* <View>
            <Text>User is Logged In</Text>
            <Text>{auth.username}</Text>
            <StatusBar style="auto" />
            <CustomButton 
              title="Sign Out"
              handlePress={submit}
            />
            <CustomButton 
              title="Back to index"
              variant="secondary"
              handlePress={() => router.push("/")}
            />
          </View> */}
        </View>
        
      </ScrollView> 
    </SafeAreaView>
    
  )
};

export default Home;