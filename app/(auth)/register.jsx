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
import GlobalErrorHandler from "../../utils/GlobalErrorHandler";
import MessageBox from "../../components/MessageBox";

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
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [activationToken, setActivationToken] = useState("");

  const register = async () => {
    setIsSubmitting(true);

    try {
      const { username, email, password } = form;
      const response = await axios.post(
        "/auth/register",
        { username, email, hash: password}
      );
      console.log("activateToken: " + JSON.stringify(response.data.activateToken));
      setActivationToken(response.data.activateToken);
      setShowSuccessMessage(true);

      console.log("response: " + JSON.stringify(response.data));

    } catch (error) {
      GlobalErrorHandler(error, handleFormError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormError = ( errorMessage, input ) => {
    setFormErrors(prev => ({...prev, [input]: errorMessage}));
  };

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;

    const { username, email, password, confirm_password } = form;

    if (!email || email.indexOf("@") < 0) {
      handleFormError("Please input a valid email", "email");
      isValid = false;
    }

    if ( !username ) {
      handleFormError("Please input an username", "username");
      isValid = false;
    }

    if ( !password ) {
      handleFormError("Please input your password", "password");
      isValid = false;
    }

    if ( !confirm_password ) {
      handleFormError("Please confirm your password", "confirm_password");
      isValid = false;
    }

    if ( password && confirm_password && password !== confirm_password ) {
      handleFormError("The confirm password does not match password", "confirm_password");
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

          { showSuccessMessage && (
            // <MessageBox 
            //   content="Please check your inbox for activation email"
            //   type="success"
            //   containerStyles="mt-5"
            // />
            <View>
              <MessageBox 
                content="Account created, pending activation"
                type="success"
                containerStyles="mt-5"
              />
              <CustomButton 
                title="Activate"
                containerStyles="mt-5"
                handlePress={() => router.push(`/activate/${activationToken}`)}
              />
            </View>
            
          )}

          { !showSuccessMessage && (
            <>
              <FormField 
              title="Username"
              value={form.username}
              handleChangeText={(e) => {
                handleFormError(null, "username");
                setForm({ ...form, username: e });
              }}
              otherStyles="mt-10"
              placeholder="give yourself a unique username"
              error={formErrors.username}
            />

            <FormField 
              title="Email"
              value={form.email}
              keyboardType="email-address"
              handleChangeText={(e) => {
                handleFormError(null, "email");
                setForm({ ...form, email: e });
              }}
              otherStyles="mt-4"
              placeholder="john.tan@email.com"
              error={formErrors.email}
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

            <FormField 
              title="Confirm Password"
              value={form.confirm_password}
              handleChangeText={(e) => {
                handleFormError(null, "confirm_password");
                setForm({ ...form, confirm_password: e });
              }}
              otherStyles="mt-4"
              error={formErrors.confirm_password}
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
            </>

          )}
          
          

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Register;