import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";

import FormField from "../../components/CustomForm/FormField";
import CustomButton from "../../components/CustomButton/CustomButton";
import GlobalErrorHandler from "../../utils/GlobalErrorHandler";
import LoadingSpinner from "../../components/LoadingSpinner";
import NoAuth from "../../components/NoAuth";
import Dropdown from "../../components/CustomForm/Dropdown";
import tailwindConfig from "../../tailwind.config";

import { useAuthContext } from "../../context/AuthProvider";
import { useThemeContext } from "../../context/ThemeProvider";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AddItem = () => {
  // TO DO: add functions to check if there is box_id / stack_id already passed in

  const { auth } = useAuthContext();
  const [form, setForm] = useState({
    keyword: "",
    definition: "",
    is_active: true,
    box: "",
    stack: "",
    tags: [],
    properties: [], 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [currentTags, setCurrentTags] = useState([]);
  const [currentProperties, setCurrentProperties] = useState([]);
  const [currentStacks, setCurrentStacks] = useState([]);
  const [currentBoxes, setCurrentBoxes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stackOptions, setStackOptions] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  const { theme } = useThemeContext();
  const iconColor = theme === "dark"
    ? tailwindConfig.theme.extend.colors.dark.text
    : tailwindConfig.theme.extend.colors.light.text;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const stacksData = await axiosPrivate.get(`/users/${auth.username}/stacks`);
        setCurrentStacks(stacksData.data.stacks);

        const stackOpts = [];
        for (const stack of stacksData.data.stacks) {
          const option = {
            label: stack.name,
            value: stack._id
          };
          stackOpts.push(option);
        }
        setStackOptions(stackOpts);

        const boxesData = await axiosPrivate.get(`/users/${auth.username}/boxes`);
        setCurrentBoxes(boxesData.data.boxes);

        const tagsData = await axiosPrivate.get(`/users/${auth.username}/tags`);
        setCurrentTags(tagsData.data.tags);

        const propertiesData = await axiosPrivate.get(`/users/${auth.username}/properties`);
        setCurrentProperties(propertiesData.data.properties);

      } catch (error) {
        GlobalErrorHandler(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [])

  const handleFormError = ( errorMessage, input ) => {
    setFormErrors(prev => ({...prev, [input]: errorMessage}));
  };

  return (
    <>
      <SafeAreaView className="bg-light-background dark:bg-dark-background h-full">
        {/* <ScrollView> */}
          <View className="w-full justify-center px-8 my-6 min-h-[85vh]">
            {!auth.username && (
              <NoAuth 
                containerStyles="h-full"
              />
            )}

            {auth.username && (
              <View className="h-full">
                <View className="flex-row">
                  <TouchableOpacity
                    onPress={() => router.back()}
                  >
                    <Feather name="arrow-left-circle" size={24} color={iconColor} />
                  </TouchableOpacity>
                  
                  <View className="flex-1 items-center">
                    <Text className="font-sans-bold text-2xl text-light-mauve dark:text-light-yellow">
                      Add item
                    </Text>
                  </View>

                  <View className="w-[24px]"></View> 
                </View>

                <FormField 
                  title="Keyword"
                  value={form.keyword}
                  handleChangeText={(e) => {
                    handleFormError(null, "keyword");
                    setForm({ ...form, keyword: e });
                  }}
                  otherStyles="mt-10"
                  error={formErrors.keyword}
                  helpText="max 70 characters"
                  maxLength={70}
                  charCount={true}
                />

                <FormField 
                  title="Definition"
                  value={form.definition}
                  handleChangeText={(e) => {
                    handleFormError(null, "definition");
                    setForm({ ...form, definition: e });
                  }}
                  otherStyles="mt-5"
                  error={formErrors.keyword}
                  helpText="max 200 characters"
                  numberOfLines={7}
                  maxLength={200}
                  charCount={true}
                />

                <Dropdown 
                  title="Stack"
                  value={form.stack}
                  handleChangeValue={(value) => {
                    handleFormError(null, "stack");
                    setForm({ ...form, stack: value });
                  }}
                  items={stackOptions}
                  containerStyles="mt-5"
                  placeholder="Select a Stack to add Item to"
                />

              </View>
              
            )}
            
          </View>
        {/* </ScrollView> */}
      </SafeAreaView>
      { isLoading && (
        <LoadingSpinner />
      )}
    </>
    
  )
};

export default AddItem;