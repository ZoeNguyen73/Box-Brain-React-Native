import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { Feather } from "@expo/vector-icons";

import tailwindConfig from "../../tailwind.config";
import { useThemeContext } from "../../context/ThemeProvider";

const SelectionModal = ({ modalTitle, options, isVisible, onClose, onSelect }) => {
  const { theme } = useThemeContext();
  const backgroundColor = theme === "dark"
    ? tailwindConfig.theme.extend.colors.dark.background
    : tailwindConfig.theme.extend.colors.light.background;
  const iconColor = theme === "dark"
    ? tailwindConfig.theme.extend.colors.dark.text
    : tailwindConfig.theme.extend.colors.light.text;

  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        style={{ 
          margin: 5,
          padding: 5,
        }}
      >
        <View 
          className="p-5 rounded-xl"
          style={{ backgroundColor: backgroundColor }}
        >
          <FlatList
            ListHeaderComponent={
              <>
                <Text className="font-sans-bold text-2xl text-light-mauve dark:text-dark-yellow tracking-wide mb-2">
                  {modalTitle}
                </Text>
              </>
            } 
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => {
              if (item.disabled) {
                return (
                  <View>
                    <Text
                      className="font-sans-italic text-dark-text dark:text-light-text tracking-wide mt-2"
                    >
                      {item.label}
                    </Text>
                  </View>
                  
                )
              } else {
                return (
                  <TouchableOpacity 
                    onPress={() => onSelect(item.value)}
                    className="flex-row mt-3"
                  >
                    <Feather name="plus-circle" size={20} color={iconColor} />
                    <Text
                      className="font-sans text-light-text dark:text-dark-text tracking-wide ml-2"
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )
              }
              
            }}
          />
        </View>
      </Modal>
      
    </View>
  )
};

export default SelectionModal;