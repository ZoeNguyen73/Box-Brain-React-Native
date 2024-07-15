import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
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
  const theme = useThemeContext();

  let backgroundColor = "";
  let borderTopColor = "";
  const borderTopWidth = theme === "dark" ? 1 : 0;
  const activeTintColor = tailwindConfig.theme.extend.colors.dark.yellow;
  const inactiveTintColor = tailwindConfig.theme.extend.colors.dark.grey1;

  if (theme === "dark") {
    backgroundColor = tailwindConfig.theme.extend.colors.dark.surface;
    borderTopColor = tailwindConfig.theme.extend.colors.dark.text;
  } else {
    backgroundColor = tailwindConfig.theme.extend.colors.dark.background;
  }
  
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
          name="records"
          options={{
            title: "Records",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                name="Records"
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
          name="more"
          options={{
            title: "More",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                name="More"
                icon="bars"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout;