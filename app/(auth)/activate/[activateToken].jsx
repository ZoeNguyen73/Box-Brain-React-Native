import { View, Text, Alert, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView } from "react-native-safe-area-context";

import GlobalErrorHandler from "../../../utils/GlobalErrorHandler";
import axios from "../../../api/axios";
import CustomButton from "../../../components/CustomButton/CustomButton";

import { avatars } from "../../../constants";
import { FlatList } from "react-native-web";

const Avatar = ({ avatarName, selectedAvatar, setSelectedAvatar }) => {
  <TouachableOpacity
    onPress={() => setSelectedAvatar(avatarName)}
  >
    <Image 
      source={avatars[avatarName]}
      className={`w-[12] h-[12] border 
        ${ avatarName === selectedAvatar ? "border-light-warning" : "border-light-surface"}
      `}
      resizeMode="cover"
    />
  </TouachableOpacity>
  
};

const Activate = () => {
  const { query } = useLocalSearchParams();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("cat");

  useEffect(() => {
    async function activate() {
      try {
        await axios.post(`/users/${query}/activate`);
        setShowSuccessMessage(true);
      } catch (error) {
        GlobalErrorHandler(error);
      }
    }

    activate();
   
  }, [])

  return (
    <SafeAreaView className="bg-light-background dark:bg-dark-background h-full">
      <ScrollView>
        <View>
          <Text classname="font-mono-bold text-xl text-light-yellow 
          dark:text-dark-yellow tracking-wider">
            Choose your avatar
          </Text>
          <Text className="font-sans-light text-light-grey1 dark:text-dark-surface text-sm">
            You can change your avatar later in settings
          </Text>
          <FlatList 
            data={avatars}
            renderItem={(avatar) => (
              <Avatar 
                avatarName={avatar}
                selectedAvatar={selectedAvatar}
                setSelectedAvatar={setSelectedAvatar}
              />
            )}
          />
          <CustomButton 
            title="Confirm Avatar"
            handlePress={() => {
              // TO DO: update user profile with the selected avatar
              router.replace("/log-in")
            }}
          />
        </View>
        <View>
          {!showSuccessMessage && (
            <Text className="font-mono-semibold text-light-text dark:text-dark-text">
              Account activation in process...
            </Text>
          )}

          {showSuccessMessage && (
            <View>
              <Text className="font-mono-bold text-2xl text-light-success 
              dark:text-dark-succes tracking-wider">
                Account activation successful!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

export default Activate;