import { View, Text, ScrollView, Keyboard } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Link } from "expo-router";

import { useAuthContext } from "../../context/AuthProvider";
import CustomButton from "../../components/CustomButton/CustomButton";
import FormField from "../../components/CustomForm/FormField";
import GlobalErrorHandler from "../../utils/GlobalErrorHandler";
import Avatar from "../../components/Avatar/Avatar";

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
        <View className="w-full justify-center px-8 my-6 min-h-[85vh]">

          <View className="flex-column justify-center items-center gap-2">
            <Text 
              className="font-mono-bold text-2xl text-light-yellow 
              dark:text-dark-yellow tracking-wider mb-5"
            >
              Welcome back{"\n"}
              to Box Brain 
            </Text>

            <View className="justify-center items-center">
              { auth.avatar && (
                <Avatar 
                  avatarName={auth.avatar}
                  dimensionInPx={100}
                />
              )}
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
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="bg-light-background dark:bg-dark-background h-full">
      <ScrollView>
        <View className="w-full justify-center px-8 my-6 min-h-[85vh]">
          <Text 
            className="font-mono-bold text-4xl text-light-yellow 
            dark:text-dark-yellow tracking-wider"
          >
            Sign In
          </Text>

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
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center gap-2 pt-5 flex-row">
            <Text className="text-sm text-light-text dark:text-dark-text font-sans">
              Don't have an account?
            </Text>
            <Link
              href="/register"
              className="font-sans-bold text-light-links dark:text-dark-links"
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