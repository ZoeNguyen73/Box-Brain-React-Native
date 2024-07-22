import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import tailwindConfig from "../../tailwind.config";
import { useThemeContext } from "../../context/ThemeProvider";

const TabIcon = ({ color, icon, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <FontAwesome5
         name={icon}
         size={24}
         color={color}
      />
      <Text
        className={`${focused ? "font-sans-semibold" : "font-sans"} text-sx}`}
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
  const borderTopColor = tailwindConfig.theme.extend.colors.dark.grey1;
  const borderTopWidth = theme === "dark" ? 1 : 0;
  const activeTintColor = tailwindConfig.theme.extend.colors.dark.yellow;
  const inactiveTintColor = tailwindConfig.theme.extend.colors.dark.grey1;
  
  return (
    <>
      <Tabs
        screenOptions={{ 
          tabBarShowLabel: false,
          tabBarActiveTintColor: activeTintColor,
          tabBarInactiveTintColor: inactiveTintColor,
          tabBarStyle: {
            backgroundColor: backgroundColor,
            borderTopWidth: borderTopWidth,
            borderTopColor: borderTopColor,
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
                icon="trophy"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen 
          name="add-item"
          options={{
            title: "Add Item",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                name="Add Item"
                icon="plus-square"
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
                icon="cog"
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
                icon="user-alt"
                color={color}
                focused={focused}
              />
            ),
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