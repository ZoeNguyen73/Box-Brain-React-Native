import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import Modal from "react-native-modal";

import tailwindConfig from "../../tailwind.config";
import { useThemeContext } from "../../context/ThemeProvider";

const SelectionModal = ({ modalTitle, options, isVisible, onClose, onSelect }) => {
  const { theme } = useThemeContext();
  const backgroundColor = theme === "dark"
    ? tailwindConfig.theme.extend.colors.dark.background
    : tailwindConfig.theme.extend.colors.light.background;

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
              return (
                <TouchableOpacity 
                  onPress={() => onSelect(item.value)}
                  className="mt-2"
                >
                  <Text
                    className="font-sans text-light-text dark:text-dark-text tracking-wide"
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </Modal>
      
    </View>
  )
};

export default SelectionModal;