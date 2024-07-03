import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/CustomForm/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import tailwindConfig from "../../tailwind.config";
import { useThemeContext } from "../../context/ThemeProvider";

const Register = () => {
  const { theme } = useThemeContext();
  const lightYellow = tailwindConfig.theme.extend.colors.light.yellow;
  const darkYellow = tailwindConfig.theme.extend.colors.dark.yellow;

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {};

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
          
          <FormField 
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
            placeholder="give yourself a unique username"
          />

          <FormField 
            title="Email"
            value={form.email}
            keyboardType="email-address"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            placeholder="john.tan@email.com"
          />

          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton 
            title="Register"
            handlePress={submit}
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