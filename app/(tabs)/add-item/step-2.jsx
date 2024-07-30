import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

import CustomButton from "../../../components/CustomButton/CustomButton";
import Dropdown from "../../../components/CustomForm/Dropdown";
import NoAuth from "../../../components/NoAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";

import tailwindConfig from "../../../tailwind.config";

import { useAuthContext } from "../../../context/AuthProvider";
import { useThemeContext } from "../../../context/ThemeProvider";
import { useErrorHandler } from "../../../context/ErrorHandlerProvider";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Step2 = () => {
  const { keyword, definition, itemActiveOption, stack } = useLocalSearchParams();
  const axiosPrivate = useAxiosPrivate();

  const { theme } = useThemeContext();
  const iconColor = theme === "dark"
  ? tailwindConfig.theme.extend.colors.dark.text
  : tailwindConfig.theme.extend.colors.light.text;
  const { auth } = useAuthContext();
  const { handleError } = useErrorHandler();
  // const [form, setForm] = useState({
  //   tags: [],
  //   properties: []
  // });

  const [tags, setTags] = useState([]);
  const [properties, setProperties] = useState([{name: "", id: "", value: ""}]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTags, setCurrentTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const tagsData = await axiosPrivate.get(`/users/${auth.username}/tags`);
        setCurrentTags(tagsData.data.tags);

        const tagOpts = [];
        for (const tag of tagsData.data.tags) {
          const option = {
            label: tag.name,
            value: tag._id
          };
          tagOpts.push(option);
        }
        setTagOptions(tagOpts);
      } catch (error) {
        await handleError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

  }, []);

  const handleAddProperty = () => {
    setProperties([...properties, {name: "", id: "", value: ""}]);
  };

  const handleFormError = ( errorMessage, input ) => {
    setFormErrors(prev => ({...prev, [input]: errorMessage}));
  };

  return (
    <>
      <SafeAreaView className="bg-light-background dark:bg-dark-background h-full">
        <ScrollView nestedScrollEnabled={true}>
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
                    Tags & Properties
                  </Text>
                </View>

                <View className="w-[24px]"></View> 
              </View>

              <View className="flex-row justify-center items-end gap-2 mt-1">
                <Text className="font-sans-bold text-light-text dark:text-dark-text">
                  Keyword:
                </Text>
                <Text className="font-sans-bold text-xl tracking-wide text-light-mauve dark:text-light-yellow">
                  {keyword}
                </Text>
              </View>

              {/* TO DO: allow users to quick add new tag */}
              <Dropdown 
                title="Tag"
                value={tags}
                handleChangeValue={(value) => {
                  handleFormError(null, "tags");
                  setTags(value);
                }}
                items={tagOptions}
                containerStyles="mt-10"
                placeholder="Select Tags to apply to item"
                open={tagDropdownOpen}
                setOpen={setTagDropdownOpen}
                multiple={true}
                min={0}
                max={tagOptions.length}
                mode="BADGE"
              />
              <Text className="text-light-text dark:text-dark-text text-xs mt-1 font-sans-italic tracking-wide">
                {form.tags.length} tags selected
              </Text>
            </View>
            
          )}

        </View>
        
        </ScrollView>
      </SafeAreaView>
      { isLoading && (
        <LoadingSpinner />
      )}
    </>
    
  )
};

export default Step2;