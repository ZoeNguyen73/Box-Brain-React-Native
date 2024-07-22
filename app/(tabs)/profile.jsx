import { ScrollView, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect} from "expo-router";

import { useAuthContext } from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import GlobalErrorHandler from "../../utils/GlobalErrorHandler";

import ProfileWelcomeHeader from "../../components/ProfileWelcomeHeader";
import StackList from "../../components/StackList/StackList";

import sampleData from "../../components/StackList/sampleData.json";

const Profile = () => {
  const { auth, isLoggedIn, isLoading } = useAuthContext();
  const [stacks, setStacks] = useState([]);
  const [pending, setPending] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    // const getStacks = async () => {
    //   setPending(true);

    //   try {
    //     const response = await axiosPrivate.get(
    //       `/users/${auth.username}/stacks`
    //     )
    //     setStacks(response.data.stacks);
    //   } catch (error) {
    //     GlobalErrorHandler(error);
    //   } finally {
    //     setPending(false);
    //   }
    // };

    // getStacks();
    setStacks(sampleData.stacks);
  }, []);

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
        { (pending || stacks.length === 0) && (
          <Text>Loading...</Text>
        )}

        { (!pending && stacks.length >0) && (
          <View className="flex-column w-full px-5">
            <View>
              <Text className="font-mono-bold text-light-yellow dark:text-dark-yellow text-3xl mb-5">
                Your stacks
              </Text>
              <StackList 
                stacks={stacks}
              />
            </View>
          </View>
          
        )}

      </ScrollView>
    </SafeAreaView>
  )
};

export default Profile;

