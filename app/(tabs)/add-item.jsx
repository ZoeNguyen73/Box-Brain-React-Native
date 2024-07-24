import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEfect } from "react";

import FormField from "../../components/CustomForm/FormField";
import CustomButton from "../../components/CustomButton/CustomButton";
import GlobalErrorHandler from "../../utils/GlobalErrorHandler";
import LoadingSpinner from "../../components/LoadingSpinner";
import NoAuth from "../../components/NoAuth";

import { useAuthContext } from "../../context/AuthProvider";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AddItem = () => {
  const { auth } = useAuthContext();

  return (
    <SafeAreaView className="bg-light-background dark:bg-dark-background h-full">
      <ScrollView>
        <View className="w-full justify-center px-8 my-6 min-h-[85vh]">
          <NoAuth 
            containerStyles="h-full"
          />
        </View>
        
        {/* <View className="w-full justify-center px-8 my-6 min-h-[85vh]">
          <Text className="text-light-text dark:text-dark-text">Add item</Text>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  )
};

export default AddItem;