import { View, Text, ScrollView, Keyboard, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";

import FormField from "../../../components/CustomForm/FormField";
import CustomButton from "../../../components/CustomButton/CustomButton";
import LoadingSpinner from "../../../components/LoadingSpinner";
import NoAuth from "../../../components/NoAuth";
import Dropdown from "../../../components/CustomForm/Dropdown";
import CheckBox from "../../../components/CustomForm/CheckBox";
import tailwindConfig from "../../../tailwind.config";

import { useAuthContext } from "../../../context/AuthProvider";
import { useThemeContext } from "../../../context/ThemeProvider";
import { useErrorHandler } from "../../../context/ErrorHandlerProvider";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Step1 = () => {
  // TO DO: add functions to check if there is stack_id already passed in

  const { auth } = useAuthContext();
  const { handleError } = useErrorHandler();
  const [form, setForm] = useState({
    keyword: "",
    definition: "",
    itemActiveOption: "",
    stack: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [currentStacks, setCurrentStacks] = useState([]);
  const [currentBoxes, setCurrentBoxes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stackOptions, setStackOptions] = useState([]);
  const [stackDropdownOpen, setStackDropdownOpen] = useState(false);
  
  const itemActiveOptions = [
    {
      label: "Add to next review queue including today",
      disabled: false,
    },
    {
      label: "Add to next review queue after today - not working",
      disabled: false,
    },
    {
      label: "Set Item inactive",
      disabled: false,
    },
  ];

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

      } catch (error) {
        await handleError(error);

      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    const { keyword, definition, itemActiveOption, stack } = form;
    const boxesInStack = currentBoxes.filter((box) => box.stack_id._id === stack);
    let box_id = "";
    let is_active = true;

    if (itemActiveOption === "Add to next review queue including today") {
      // find the box in the current stack that is not default & has the lowest lapse_days
      let selectedBoxId = "";
      let lowestLapseDay = null;
      for (box in boxesInStack) {
        if (lowestLapseDay === null || box.lapse_days < lowestLapseDay) {
          selectedBoxId = box._id;
          lowestLapseDay = box.lapse_days;
        }
      }
      box_id = selectedBoxId;
    } else if (itemActiveOption === "Add to next review queue after today - not working") {
      let selectedBoxId = "";
      let lowestLapseDay = null;
      for (box in boxesInStack) {
        if (lowestLapseDay === null || box.lapse_days < lowestLapseDay) {
          selectedBoxId = box._id;
          lowestLapseDay = box.lapse_days;
        }
      }
      box_id = selectedBoxId;
    } else if (itemActiveOption === "Set Item inactive") {
      is_active = false;
    }

    router.push({ 
      pathname: "add-item/step-2", 
      params: { keyword, definition, box_id, is_active }
    });
  };

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;

    const { keyword, definition, itemActiveOption, stack } = form;

    if (!keyword) {
      handleFormError("Please input a keyword", "keyword");
      isValid = false;
    }

    if (!definition) {
      handleFormError("Please input definition", "definition");
      isValid = false;
    }

    if (!itemActiveOption) {
      handleFormError("Please select an Item Active option", "itemActiveOption");
      isValid = false;
    }

    if (!stack) {
      handleFormError("Please select a stack", "stack");
      isValid = false;
    }

    if (isValid) {
      handleNext();
    }

  };

  const handleFormError = ( errorMessage, input ) => {
    setFormErrors(prev => ({...prev, [input]: errorMessage}));
  };

  return (
    <>
      <SafeAreaView className="bg-light-background dark:bg-dark-background h-full">
        {!auth.username && (
          <NoAuth 
            containerStyles="h-full"
          />
        )}
        {auth.username && (
          <>
            <View>
              <View className="flex-row px-5 items-center mt-5">
                <TouchableOpacity
                  onPress={() => router.back()}
                >
                  <Feather name="arrow-left" size={24} color={iconColor} />
                </TouchableOpacity>
                
                <View className="flex-1 mx-2">
                  <Text className="font-sans-semibold text-xl tracking-wide text-light-primary dark:text-light-yellow">
                    Add Item
                  </Text>
                </View>

                <View>
                  <CustomButton 
                    title="Continue"
                    variant="small-secondary"
                    iconName="chevron-right"
                    handlePress={() => validate()}
                  />
                </View>

              </View>
            </View>
            <ScrollView nestedScrollEnabled={true}>
              <View className="w-full justify-center px-8">
                <View className="h-full">

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
                    open={stackDropdownOpen}
                    setOpen={setStackDropdownOpen}
                    error={formErrors.stack}
                  />

                  <CheckBox 
                    title="Item Active Options"
                    items={itemActiveOptions}
                    containerStyles="mt-5 pr-5"
                    handleSelectionChange={(key, value) => {
                      handleFormError(null, "itemActiveOption");
                      setForm({ ...form, itemActiveOption: key });
                    }}
                    multiple={false}
                    error={formErrors.itemActiveOption}
                  />

                </View>
  
              </View>
            </ScrollView>
          </>
          
        )}
      </SafeAreaView>
      { isLoading && (
        <LoadingSpinner />
      )}
    </>
    
  )
};

export default Step1;