import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

import ItemSwiper from "../../components/ItemSwiper/ItemSwiper";

const DailyReview = () => {
  return (
    <SafeAreaView className="bg-light-background dark:bg-dark-background h-full">
      <View>
        <ItemSwiper />
      </View> 
    </SafeAreaView>
  )
};

export default DailyReview;