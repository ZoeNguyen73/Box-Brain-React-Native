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
import SelectionModal from "../../../components/CustomForm/SelectionModal";

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
  const [properties, setProperties] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTags, setCurrentTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [propertyDropdownOpen, setPropertyDropdownOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
            value: prop._id,
            disabled: false,
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

  const handleAddProperty = (newPropId) => {
    setProperties([...properties, {id: newPropId, content: ""}]);
  };

  const handleRemoveProperty = (index) => {
    const newProperties = [...properties];
    newProperties.splice(index, 1);
    setProperties(newProperties);
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
  // const onPropertyDropdownOpen = () => setTagDropdownOpen(false);
 

  const updatePropertyOptions = ({propId, isRemoval}) => {
    // to remove already selected property from the option list
    const index = propertyOptions.findIndex((prop) => prop.value === propId);
    if (isRemoval) {
      propertyOptions[index].disabled = true;
    } else {
      propertyOptions[index].disabled = false;
    }
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
                <View className="flex-column nowrap">
                  <Text className="font-sans-bold text-3xl mt-10 tracking-wide text-light-teal dark:text-dark-teal">
                    {keyword}
                  </Text>
                  <Text 
                    className="font-sans-italic mt-1 tracking-wider text-light-teal dark:text-dark-teal"
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {definition}
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

                <Text className="font-sans-bold text-light-text dark:text-dark-text mt-5 tracking-wide">
                    Properties
                </Text>

                {properties.map((property, index) => {
                  const prop = propertyOptions.find(propOption => propOption.value === property.id) || null;
                  const propName = prop ? prop.label : "Prop Name";
                  return (
                    <View 
                      key={index} 
                      style={{zIndex: propertyDropdownOpen ? 1 : 0 }}
                      className="flex-row items-start mt-4"
                    >
                      <View>
                        <Text className="font-sans underline text-light-text dark:text-dark-text">
                          {propName}
                        </Text>
                      </View>
                      
                      <EditableText 
                        value={property.content}
                        placeholder="empty"
                        onSave={(currentText) => {
                          handlePropertyChange(index, "content", currentText);
                        }}
                        containerStyles="ml-2 flex-1"
                        maxLength={200}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          handleRemoveProperty(index);
                          updatePropertyOptions({ propId: property.id, isRemoval: false})
                        }}
                      >
                        <Feather 
                          name="trash-2" 
                          size={18} 
                          color={`${ theme === "dark" ? "#6c7086" : tailwindConfig.theme.extend.colors.light.text}`} />
                      </TouchableOpacity>
                    </View>
                  )
                })}

                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  className="mt-5"
                >
                  <Text className="font-sans-semibold underline tracking-wide text-light-mauve dark:text-light-yellow">
                    + Add a property
                  </Text>
                </TouchableOpacity>
                {/* TO DO: allow users to quick add new property */}

                <SelectionModal
                  modalTitle="Select a Property to add"
                  options={propertyOptions} 
                  isVisible={modalVisible}
                  onClose={() => setModalVisible(false)}
                  onSelect={(propId) => {
                    handleAddProperty(propId);
                    setModalVisible(false);
                    updatePropertyOptions({propId: propId, isRemoval: true})
                  }}
                />
                
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