import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "../../../api/axios";
import GlobalErrorHandler from "../../../utils/GlobalErrorHandler";
import CustomButton from "../../../components/CustomButton/CustomButton";
import MessageBox from "../../../components/MessageBox";
import { useAuthContext } from "../../../context/AuthProvider";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

import AvatarList from "../../../components/Avatar/AvatarList";


const Activate = () => {
  const { activateToken } = useLocalSearchParams();
  const { setAuth, setIsLoggedIn } = useAuthContext();
  const [showSuccessMessage, setshowSuccessMessage] = useState(false);
  const [showAvatarChangeMessage, setShowAvatarChangeMessage] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    async function activate() {
      try {
        const response = await axios.post(`/users/${activateToken}/activate`);
        const { user, accessToken, refreshToken } = response.data;

        await AsyncStorage.setItem("username", user.username);
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);

        setSelectedAvatar(user.avatar);
        setAuth({ username: user.username, accessToken });
        setUsername(user.username);
        setIsLoggedIn(true);
        setshowSuccessMessage(true);
      } catch (error) {
        GlobalErrorHandler(error);
      }
    }

    activate();

  }, [])

  const updateUserAvatar = async () => {
    try {
      await axiosPrivate.put(
        `/users/${username}`,
        { avatar: selectedAvatar }
      )
      setShowAvatarChangeMessage(true);
      setTimeout( () => router.push("/home"), 2000);
    } catch (error) {
      GlobalErrorHandler(error);
    }
  }

  return (
    <SafeAreaView className="bg-light-background dark:bg-dark-background h-full">
      <ScrollView>
        <View className="w-full justify-center px-8 my-6">

          {!showSuccessMessage && (
            <Text className="font-mono-bold text-xl text-light-yellow dark:text-dark-yellow tracking-wider">
              Account activation in process...
            </Text>
          )}

          {showSuccessMessage && (
            <View className="justify-center items-center">
              <View className="flex mb-4 justify-center items-center py-2 rounded-lg">
                <Text className="font-mono-bold text-base text-light-success dark:text-dark-success tracking-wider mb-2 leading-none">
                  Account activated successfully
                </Text>
                <Text className="font-mono-bold text-xs text-light-text dark:text-dark-text tracking-wider mb-2 leading-3">
                  One last step before we get started
                </Text>
              </View>
              
              <View className="justify-center items-center">
                <Text className="font-mono-bold text-3xl text-light-yellow dark:text-dark-yellow tracking-wider">
                  Choose your avatar
                </Text>
                <Text className="font-sans-light text-light-grey1 dark:text-dark-text text-sm">
                  You can change your avatar later in settings
                </Text>

                { showAvatarChangeMessage && (
                  <MessageBox 
                    content="Avatar updated. Redirecting to Home..."
                    type="success"
                    constainerStyles="mt-2"
                  />
                )}
              </View>

              <AvatarList 
                containerStyles="px-5 mt-5"
                selectedAvatar={selectedAvatar}
                setSelectedAvatar={setSelectedAvatar}
              />

              <CustomButton 
                title="Confirm Avatar"
                containerStyles="mt-2"
                handlePress={()=> updateUserAvatar()}
              />

            </View>
            
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Activate;