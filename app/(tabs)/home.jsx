import { View, ScrollView } from "react-native";
import React from "react";
import { Redirect} from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthContext } from "../../context/AuthProvider";

import DailySummary from "../../components/DailySummary";
import TodayProgress from "../../components/TodayProgress";
import QuickMessage from "../../components/QuickMessage";
import QuickReview from "../../components/QuickReview";
import ProfileWelcomeHeader from "../../components/ProfileWelcomeHeader";

const Home = () => {
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
        <View className="flex-column w-full px-5">

          <QuickMessage />

          <DailySummary />

          <TodayProgress />

          <QuickReview />

        </View>
        
      </ScrollView> 
    </SafeAreaView>
    
  )
};

export default Home;