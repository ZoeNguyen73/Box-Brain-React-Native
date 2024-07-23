import { View, Text, ScrollView, Keyboard, Image, Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Link } from "expo-router";
import Feather from '@expo/vector-icons/Feather';

import { useAuthContext } from "../../context/AuthProvider";
import { useThemeContext } from "../../context/ThemeProvider";
import CustomButton from "../../components/CustomButton/CustomButton";
import FormField from "../../components/CustomForm/FormField";
import GlobalErrorHandler from "../../utils/GlobalErrorHandler";
import Avatar from "../../components/Avatar/Avatar";
import LoadingSpinner from "../../components/LoadingSpinner";
import tailwindConfig from "../../tailwind.config";
import { illustrations } from "../../constants";

const SignIn = () => {
  const { auth, signIn, isLoggedIn, isLoading, signOut } = useAuthContext();
  const { theme } = useThemeContext();
  const { width } = Dimensions.get("window");
  const circleDiameter = width * 0.5;

  const iconColor = theme === "dark"
    ? tailwindConfig.theme.extend.colors.dark.text
    : lightTextColor = tailwindConfig.theme.extend.colors.light.text

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleFormError = ( errorMessage, input ) => {
    setFormErrors(prev => ({...prev, [input]: errorMessage}));
  };

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    const { username, password } = form;

    if ( !username ) {
      handleFormError("Please input an username", "username");
      isValid = false;
    }

    if ( !password ) {
      handleFormError("Please input your password", "password");
      isValid = false;
    }

    if (isValid) {
      await submit();
    }
  }

  const submit = async () => {
    setIsSubmitting(true);

    try {
      await signIn({ username: form.username, hash: form.password });
      setShowSuccessMessage(true);
      router.replace("/home");
    } catch (error) {
      GlobalErrorHandler(error, handleFormError);
    } finally {
      setIsSubmitting(false);
    }
  }

  const logOut = async () => {
    try {
      await signOut();
      router.replace("/");
    } catch (error) {
      GlobalErrorHandler(error);
    }
  }

  if (!isLoading && isLoggedIn && auth.username) {
    return (
      <SafeAreaView className="bg-light-background dark:bg-dark-background h-full">
        <ScrollView>
          <View className="w-full justify-center px-8 my-6 min-h-[85vh]">
            <View className="flex-column justify-center items-center gap-2">
              <Text 
                className="font-mono-bold text-2xl text-light-yellow 
                dark:text-dark-yellow tracking-wider mb-5"
              >
                Welcome back{"\n"}
                to Box Brain 
              </Text>

              <View className="justify-center items-center w-full">
                <Avatar 
                  avatarName={auth.avatar}
                  size="large"
                />

                <Text className="font-mono-bold tracking-wider text-light-teal dark:text-dark-teal text-3xl mt-2">
                  {auth.username}
                </Text> 
              </View>
            </View>

            <View className="justify-center flex-column">
              <CustomButton 
                title="Continue to Home"
                handlePress={() => router.push("/home")}
                containerStyles="mt-12"
              />
              <CustomButton 
                title="Log Out"
                variant="secondary"
                handlePress={logOut}
                containerStyles="mt-12"
              />
            </View>
          </View>
        
        </ScrollView>
        
      </SafeAreaView>
    )
  }

  return (
    <>
      <SafeAreaView className="bg-light-mauve items-center h-full">
        <ScrollView className="w-full" contentContainerStyle={styles.scrollView}>
          <View 
            className="flex-column w-full h-full justify-between items-center"
          >

            <View className="h-[35vh] w-full justify-center items-center flex">
              <View 
                className="bg-light-yellow rounded-full justify-center items-center"
                style={{ width: circleDiameter, height: circleDiameter }}
              >
                <Image 
                  source={illustrations.openDoodlesDancing}
                  resizeMode="contain"
                  style={{ position: "absolute", height: circleDiameter * 1.2, top: circleDiameter * 0.2 }}
                />
              </View>
            </View>

            <View
              className="w-full h-[60vh] bg-light-background dark:bg-dark-background rounded-3xl justify-center items-center 
              rounded-b-none border border-t-8 border-black"
            >
              <View
                className="w-[85%] py-5 px-5"
              >
                <View className="flex-row gap-2 items-center">
                  <Text className="text-light-text dark:text-dark-text font-serif-bold text-4xl tracking-wider">
                    Welcome Back!
                  </Text>
                  <Feather name="smile" size={32} color={iconColor} />
                </View>
                

                <FormField 
                  title="Username"
                  value={form.username}
                  handleChangeText={(e) => {
                    handleFormError(null, "username");
                    setForm({ ...form, username: e });
                  }}
                  otherStyles="mt-10"
                  error={formErrors.username}
                />
                <FormField 
                  title="Password"
                  value={form.password}
                  handleChangeText={(e) => {
                    handleFormError(null, "password");
                    setForm({ ...form, password: e });
                  }}
                  otherStyles="mt-4"
                  error={formErrors.password}
                />

                <CustomButton 
                  title="Sign In"
                  handlePress={validate}
                  containerStyles="mt-12"
                  isLoading={isSubmitting}
                />

                <View className="justify-center gap-2 pt-5 flex-row mt-1 mb-5">
                  <Text className="text-sm text-light-text dark:text-dark-text font-sans">
                    Don't have an account?
                  </Text>
                  <Link
                    href="/register"
                    className="text-sm font-sans-bold text-light-links dark:text-dark-links"
                  > 
                    Register for free
                  </Link>
                </View>
              </View>
              
            </View>
            
          </View>
        </ScrollView>
        
      </SafeAreaView>
      { isSubmitting && (
        <LoadingSpinner />
      )}
      
    </>
  )
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
});

export default SignIn;