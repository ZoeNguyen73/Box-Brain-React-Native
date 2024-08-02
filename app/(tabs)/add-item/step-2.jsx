import { View, Text, TouchableOpacity, ScrollView, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

import CustomButton from "../../../components/CustomButton/CustomButton";
import Dropdown from "../../../components/CustomForm/Dropdown";
import NoAuth from "../../../components/NoAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";
import EditableText from "../../../components/CustomForm/EditableText";
import SelectionModal from "../../../components/CustomForm/SelectionModal";

import tailwindConfig from "../../../tailwind.config";

import { useAuthContext } from "../../../context/AuthProvider";
import { useThemeContext } from "../../../context/ThemeProvider";
import { useErrorHandler } from "../../../context/ErrorHandlerProvider";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Step2 = () => {
  const { keyword, definition, box_id, is_active } = useLocalSearchParams();
  const axiosPrivate = useAxiosPrivate();

  const { theme } = useThemeContext();
  const iconColor = theme === "dark"
  ? tailwindConfig.theme.extend.colors.dark.text
  : tailwindConfig.theme.extend.colors.light.text;
  const { auth } = useAuthContext();
  const { handleError } = useErrorHandler();

  const [tags, setTags] = useState([]);
  const [properties, setProperties] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tagOptions, setTagOptions] = useState([]);
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [propertyInputErrors, setPropertyInputErrors] = useState({});
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [propertyDropdownOpen, setPropertyDropdownOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const tagsData = await axiosPrivate.get(`/users/${auth.username}/tags`);

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
    setProperties([...properties, {property_id: newPropId, content: ""}]);
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

  const handlePropertyInputError = ( errorMessage, propertyIndex ) => {
    setPropertyInputErrors(prev => ({...prev, [propertyIndex]: errorMessage}));
  };

  const updatePropertyOptions = ({propId, isRemoval}) => {
    // to remove already selected property from the option list
    const index = propertyOptions.findIndex((prop) => prop.value === propId);
    if (isRemoval) {
      propertyOptions[index].disabled = true;
    } else {
      propertyOptions[index].disabled = false;
    }
  };

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;

    properties.forEach((property, index) => {
      if (property.content === "") {
        isValid = false;
        handlePropertyInputError("Please provide input for this property", index);
      }
    });

    console.log("isValid: " + isValid);

    if (isValid) {
      await submit();
    }
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      const newItem = await axiosPrivate.post(
        "/items",
        {
          keyword,
          definition,
          box_id,
          is_active,
          tags,
          properties
        }
      );

      console.log("newItem created: " + JSON.stringify(newItem.data));
    } catch (error) {
      await handleError(error);
    } finally {
      setIsLoading(false);
    }
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
                    Tags & Properties
                  </Text>
                </View>

                <View>
                  <CustomButton 
                    title="Done"
                    variant="small-primary"
                    iconName="plus-circle"
                    handlePress={() => validate()}
                  />
                </View>

              </View>
            </View>
            <ScrollView nestedScrollEnabled={true}>
              <View className="w-full h-full justify-center px-8">
                <View className="min-h-[65vh] flex-column">
                  
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
                        console.log("selected tags value: " + JSON.stringify(value));
                        const tagIdArray = [];
                        value.forEach(tag => {
                          tagIdArray.push({ tag_id: tag});
                        })
                        setTags(tagIdArray);
                      }}
                      items={tagOptions}
                      containerStyles="mt-5"
                      placeholder="Select Tags to apply to item"
                      open={tagDropdownOpen}
                      setOpen={setTagDropdownOpen}
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
                  <View className="flex-1">
                    {properties.map((property, index) => {
                      const prop = propertyOptions.find(propOption => propOption.value === property.property_id) || null;
                      const propName = prop ? prop.label : "Prop Name";
                      return (
                        <View key={index} >
                          <View 
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
                                handlePropertyInputError("", index);
                              }}
                              containerStyles="ml-2 flex-1"
                              maxLength={200}
                            />
                            <TouchableOpacity
                              onPress={() => {
                                handleRemoveProperty(index);
                                updatePropertyOptions({ propId: property.property_id, isRemoval: false})
                              }}
                            >
                              <Feather 
                                name="trash-2" 
                                size={18} 
                                color={`${ theme === "dark" ? "#6c7086" : tailwindConfig.theme.extend.colors.light.text}`} />
                            </TouchableOpacity>
                          </View>
                          { propertyInputErrors[index] && (
                            <Text className="text-light-error dark:text-dark-error font-xs font-sans-light">
                              {propertyInputErrors[index]}
                            </Text>
                          )}
                        </View> 
                      )
                    })}

                    <TouchableOpacity
                      onPress={() => setModalVisible(true)}
                      className="mt-5"
                    >
                      <Text className="font-sans-semibold tracking-wide text-light-primary dark:text-light-yellow">
                        + Add a property
                      </Text>
                    </TouchableOpacity>
                    {/* TO DO: allow users to quick add new property */}
                  </View>
                  

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

export default Step2;