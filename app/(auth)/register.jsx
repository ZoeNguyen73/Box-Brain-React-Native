import { View, Text, ScrollView, Alert, Keyboard } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/CustomForm/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import tailwindConfig from "../../tailwind.config";
import { useThemeContext } from "../../context/ThemeProvider";
import axios from "../../api/axios";

const Register = () => {
  const { theme } = useThemeContext();
  const lightYellow = tailwindConfig.theme.extend.colors.light.yellow;
  const darkYellow = tailwindConfig.theme.extend.colors.dark.yellow;

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const register = async () => {
    // if (form.username === "" || form.email === "" || form.password === "" || form.confirm_password === "") {
    //   Alert.alert("Error", "Please fill in all the required fields");
    // };

    // if (form.password !== form.confirm_password) {
    //   Alert.alert("Error", "Confirm Password does not match Password field");
    // };

    setIsSubmitting(true);
    console.log("register triggered...")

    try {
      const { username, email, password } = form;
      const response = await axios.post(
        "/auth/register",
        { username, email, hash: password}
      );

      console.log("response: " + response.data);

    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorMessage = error.response.data.message;
        const errorDetails = error.response.data.details;
        console.log("error message: " + errorMessage);
        console.log("error details: " + errorDetails);
        Alert.alert(errorMessage, errorDetails);

      } else if (error.request) {
        // The request was made but no response was received
        console.log("error request: " + error.request);
        Alert.alert("No response from server.");
        
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        Alert.alert("Error", error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleError = ( errorMessage, input ) => {
    setErrors(prev => ({...prev, [input]: errorMessage}));
  };

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;

    const { username, email, password, confirm_password } = form;

    if (!email || email.indexOf("@") < 0) {
      console.log("email checking...");
      handleError("Please input a valid email", "email");
      isValid = false;
    }

    if ( !username ) {
      handleError("Please input an username", "username");
      isValid = false;
    }

    if ( !password ) {
      handleError("Please input your password", "password");
      isValid = false;
    }

    if ( !confirm_password ) {
      handleError("Please confirm your password", "confirm_password");
      isValid = false;
    }

    if ( password && confirm_password && password !== confirm_password ) {
      handleError("The confirm password does not match password", "confirm_password");
      isValid = false;
    }

    if (isValid) {
      await register();
    }

  };

  return (
    <SafeAreaView className="bg-light-background dark:bg-dark-background h-full">
      <ScrollView>
        <View
          className="w-full justify-center  px-8 my-6"
        >
          <View className="flex-row gap-2 inline-block items-end mt-10">
            <Text 
              className="font-mono-bold text-4xl text-light-yellow 
              dark:text-dark-yellow tracking-wider"
            >
              Sign Up to{"\n"}
              Box Brain
            </Text>
            <View className="pb-2">
              <FontAwesome5
                name="brain" size={30} 
                color={`${theme === "dark" ? darkYellow : lightYellow}`} 
              />
            </View>
          </View>

          <View className="mt-2">
            <Text className="font-sans-light text-lg text-light-grey1 dark:text-dark-grey2">
              Get started for free with your email
            </Text>
          </View>
          
          <FormField 
            title="Username"
            value={form.username}
            handleChangeText={(e) => {
              handleError(null, "username");
              setForm({ ...form, username: e });
            }}
            otherStyles="mt-10"
            placeholder="give yourself a unique username"
            error={errors.username}
          />

          <FormField 
            title="Email"
            value={form.email}
            keyboardType="email-address"
            handleChangeText={(e) => {
              handleError(null, "email");
              setForm({ ...form, email: e });
            }}
            otherStyles="mt-4"
            placeholder="john.tan@email.com"
            error={errors.email}
          />

          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => {
              handleError(null, "password");
              setForm({ ...form, password: e });
            }}
            otherStyles="mt-4"
            error={errors.password}
          />

          <FormField 
            title="Confirm Password"
            value={form.confirm_password}
            handleChangeText={(e) => {
              handleError(null, "confirm_password");
              setForm({ ...form, confirm_password: e });
            }}
            otherStyles="mt-4"
            error={errors.confirm_password}
          />

          <CustomButton 
            title="Register"
            handlePress={validate}
            containerStyles="mt-12"
            isLoading={isSubmitting}
          />

          <View className="justify-center gap-2 pt-5 flex-row">
            <Text className="text-sm text-light-text dark:text-dark-text font-sans">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="font-sans-bold text-light-links dark:text-dark-links"
            > 
              Sign In
            </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Register;