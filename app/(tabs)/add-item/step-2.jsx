import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

import CustomButton from "../../../components/CustomButton/CustomButton";
import Dropdown from "../../../components/CustomForm/Dropdown";
import NoAuth from "../../../components/NoAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";
import FormField from "../../../components/CustomForm/FormField";
import EditableText from "../../../components/CustomForm/EditableText";

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
  const [properties, setProperties] = useState([{id: "", content: ""}]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTags, setCurrentTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [propertyDropdownOpen, setPropertyDropdownOpen] = useState(false);

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

        const propertiesData = await axiosPrivate.get(`/users/${auth.username}/properties`);

        const propertyOpts = [];
        for (const prop of propertiesData.data.properties) {
          const option = {
            label: prop.name,
            value: prop._id
          };
          propertyOpts.push(option);
        }
        setPropertyOptions(propertyOpts);
      } catch (error) {
        await handleError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

  }, []);

  const handleAddProperty = () => {
    setProperties([...properties, {id: "", content: ""}]);
  };

  const handlePropertyChange = (index, key, value) => {
    const newProperties = [...properties];
    newProperties[index][key] = value;
    setProperties(newProperties);
  }

  const handleFormError = ( errorMessage, input ) => {
    setFormErrors(prev => ({...prev, [input]: errorMessage}));
  };

  const onTagDropdownOpen = () => setPropertyDropdownOpen(false);
  const onPropertyDropdownOpen = () => setTagDropdownOpen(false);

  const updatePropertyOptions = (propertyId) => {
    // to remove already selected property from the option list
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

                {/* <View className="flex-row justify-center items-end gap-2 mt-1">
                  <Text className="font-sans-bold text-light-text dark:text-dark-text">
                    Keyword:
                  </Text>
                  <Text className="font-sans-bold text-xl tracking-wide text-light-mauve dark:text-light-yellow">
                    {keyword}
                  </Text>
                </View> */}
                <View>
                  <Text className="font-sans-bold text-3xl mt-10 tracking-wide text-light-teal dark:text-dark-teal">
                    {keyword}
                  </Text>
                </View>

                {/* TO DO: allow users to quick add new tag */}
                <View style={{zIndex: tagDropdownOpen ? 1 : 0 }}>
                  <Dropdown 
                    title="Tag"
                    value={tags}
                    handleChangeValue={(value) => {
                      handleFormError(null, "tags");
                      setTags(value);
                    }}
                    items={tagOptions}
                    containerStyles="mt-5"
                    placeholder="Select Tags to apply to item"
                    open={tagDropdownOpen}
                    setOpen={setTagDropdownOpen}
                    onOpen={onTagDropdownOpen}
                    multiple={true}
                    min={0}
                    max={tagOptions.length}
                    mode="BADGE"
                  />
                </View>
                
                <Text className="text-light-text dark:text-dark-text text-xs mt-1 font-sans-italic tracking-wide mb-5">
                  {tags.length} tags selected
                </Text>

                {properties.map((property, index) => (
                  <View 
                    key={index} 
                    style={{zIndex: propertyDropdownOpen ? 1 : 0 }}
                    className="flex-row items-end mt-2"
                  >
                    <View>
                      <Text className="font-sans-semibold text-light-text dark:text-dark-text">
                        Prop name
                      </Text>
                    </View>
                    
                    {/* <Text className="font-sans text-sm text-light-text dark:text-dark-text">
                      Prop content
                    </Text> */}
                    <EditableText 
                      value={property.content}
                      placeholder="empty"
                      onSave={(currentText) => {
                        handlePropertyChange(index, "content", currentText);
                      }}
                      containerStyles="ml-2 flex-1"
                    />
                    {/* <Dropdown 
                      title={`Property ${index + 1}`}
                      value={property.id}
                      handleChangeValue={(value) => {
                        // handleFormError(null, "properties");
                        console.log("selected value: " + value);
                        // setProperties(value);
                        handlePropertyChange(index, "id", value);
                        updatePropertyOptions(value);
                      }}
                      items={propertyOptions}
                      containerStyles="mt-5"
                      placeholder="Select Property to add"
                      open={propertyDropdownOpen}
                      setOpen={setPropertyDropdownOpen}
                      onOpen={onPropertyDropdownOpen}
                      multiple={false}
                      mode="BADGE"
                    />
                    <FormField 
                      title={`Property ${index + 1} input`}
                      value={property.content}
                      handleChangeText={(e) => {
                        // handleFormError(null, "definition");
                        handlePropertyChange(index, "content", e)
                      }}
                      otherStyles="mt-5"
                      // error={formErrors.keyword}
                      helpText="max 200 characters"
                      numberOfLines={5}
                      maxLength={200}
                      charCount={true}
                    /> */}
                  </View>
                ))}

                {/* <CustomButton 
                  title="Add another Property"
                  variant="secondary"
                  handlePress={handleAddProperty}
                /> */}

                <TouchableOpacity
                  onPress={() => handleAddProperty()}
                  className="mt-3"
                >
                  <Text className="font-sans-semibold underline tracking-wide text-light-mauve dark:text-light-yellow">
                    + Add a property
                  </Text>
                </TouchableOpacity>
                
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