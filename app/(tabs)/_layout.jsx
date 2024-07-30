import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Feather from '@expo/vector-icons/Feather';

import tailwindConfig from "../../tailwind.config";
import { useThemeContext } from "../../context/ThemeProvider";

const TabIcon = ({ color, icon, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Feather
         name={icon}
         size={24}
         color={color}
      />
      <Text
        className={`${focused ? "font-sans-semibold" : "font-sans"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  const { theme } = useThemeContext();

  const lightBackgroundColor = tailwindConfig.theme.extend.colors.light.background;
  const darkBackgroundColor = tailwindConfig.theme.extend.colors.dark.background;

  const backgroundColor = theme === "dark" 
    ? tailwindConfig.theme.extend.colors.dark.surface
    : tailwindConfig.theme.extend.colors.dark.background;
  const activeTintColor = tailwindConfig.theme.extend.colors.dark.yellow;
  const inactiveTintColor = tailwindConfig.theme.extend.colors.dark.grey1;
  
  return (
    <>
      <Tabs
        backBehavior="history"
        screenOptions={{ 
          tabBarShowLabel: false,
          tabBarActiveTintColor: activeTintColor,
          tabBarInactiveTintColor: inactiveTintColor,
          tabBarStyle: {
            backgroundColor: backgroundColor,
            height: 84,
          }
        }}
      >
        <Tabs.Screen 
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                name="Home"
                icon="home"
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen 
          name="progress"
          options={{
            title: "Progress",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                name="Progress"
                icon="bar-chart"
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen 
          name="add-item/step-1"
          options={{
            title: "Add Item",
            headerShown: false,
            href:"/add-item/step-1",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                name="Add Item"
                icon="plus-circle"
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen 
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                name="Settings"
                icon="settings"
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen 
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                name="Profile"
                icon="smile"
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen 
          name="add-item/step-2"
          options={{
            href:null,
            headerShown: false,
          }}
        />

      </Tabs>
      <StatusBar 
        backgroundColor={`${ theme === "dark" ? darkBackgroundColor : lightBackgroundColor }`} 
        style={`${ theme === "dark" ? "light" : "dark"}`}
      />
    </>
  )
}

export default TabsLayout;