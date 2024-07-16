import { View, Text, ScrollView, Keyboard, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Link } from "expo-router";

import { useAuthContext } from "../../context/AuthProvider";
import CustomButton from "../../components/CustomButton/CustomButton";
import FormField from "../../components/CustomForm/FormField";
import GlobalErrorHandler from "../../utils/GlobalErrorHandler";
import Avatar from "../../components/Avatar/Avatar";
import { avatars } from "../../constants";

const SignIn = () => {
  const { auth, signIn, isLoggedIn, isLoading, signOut } = useAuthContext();

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
    <SafeAreaView className="bg-light-background dark:bg-dark-background h-full">
      <ScrollView>
        <View 
          className="flex-column w-full justify-center items-center px-8 my-6 min-h-[85vh]"
        >
          <View className="flex-column gap-5 justify-center items-center w-full">
            <View className="flex-row">
              <Text 
                className="font-mono-bold text-xl text-light-yellow 
                dark:text-dark-yellow tracking-wider mr-2"
              >
                Hey
              </Text>
              <Text 
                className="font-mono-bold text-xl text-light-teal
                dark:text-dark-teal tracking-wider"
              >
                Brainiac
              </Text>
              <Text 
                className="font-mono-bold text-xl text-light-yellow 
                dark:text-dark-yellow tracking-wider"
              >
                ,
              </Text>
            </View>
            
            <Text 
              className="font-mono-bold text-4xl text-light-yellow 
              dark:text-dark-yellow tracking-wider"
            >
              Hello again!
            </Text>
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

          <View className="justify-center gap-2 pt-5 flex-row mt-5">
            <Text className="text-sm text-light-text dark:text-dark-text font-sans">
              Don't have an account?
            </Text>
            <Link
              href="/register"
              className="text-sm font-sans-bold text-light-text dark:text-dark-text underline"
            > 
              Register for free
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn;