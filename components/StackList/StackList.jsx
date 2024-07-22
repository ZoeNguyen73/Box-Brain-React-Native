import { View, Text, FlatList, TouchableOpacity, ImageBackground } from "react-native";
import * as Animatable from "react-native-animatable";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import GradientColors from "../ItemSwiper/GradientColors";
import GenerateColorOptions from "../ItemSwiper/ColorOptions";
import StatusChip from "../StatusChip";

const zoomIn = {
  0: {
    scale: 0.9
  },
  1: {
    scale: 1.1
  },
};

const zoomOut = {
  0: {
    scale: 1
  },
  1: {
    scale: 0.9
  },
};

const StackCard = ({ activeStackId, stack, lastStackId }) => {
  const { name, color1, color2, accentColor, is_private, box_count, item_count } = stack;
  return (
    <Animatable.View
      className={`ml-3 ${ lastStackId === stack._id ? "mr-3" : ""}`}
      animation={activeStackId === stack._id ? zoomIn : zoomOut}
      duration={500}
    >
      <View
        className="border border-4 rounded-3xl overflow-hidden 
        h-[200px] w-[150px] my-3"
        style={{ borderColor: accentColor }}
      >

        <LinearGradient 
          colors={[color1, color2]}
          style={{
            flex: 1,
            // justifyContent: "center",
            padding: 10,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View className="flex-column">
            <View className="flex-row justify-between items-center mb-2">
              <StatusChip 
                text="In Progress"
                color="yellow"        
              />
              {is_private && (
                <FontAwesome5 name="lock" size={16} color="grey" />
              )}
            </View>
            
            <Text 
              className="font-mono-bold text-xl leading-5 mt-1"
              style={{ color: accentColor }}
            >
              {name}
            </Text>
            
            <View className="mt-1">
              <Text>
                {box_count} boxes
              </Text>
              <Text>
                {item_count} items
              </Text>
            </View>

          </View>
          
        </LinearGradient>

      </View>
      
    </Animatable.View>
  )
};

const StackList = ({ stacks }) => {
  const [activeStackId, setActiveStackId] = useState(stacks[0]._id);
  const [lastStackId, setLastStackId] = useState(null);
  const colorOptions = GenerateColorOptions();

  const viewableStacksChanges = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveStackId(viewableItems[0].item._id);
    }
  };

  const randomColorIndex = (lastIndex) => {
    let colorIndex = lastIndex;
    while (colorIndex === lastIndex) {
      colorIndex = Math.floor(Math.random() * GradientColors.length);
    }
    return colorIndex;
  }

  // identify the last stack in the list
  useEffect(() => {
    setLastStackId(stacks[stacks.length-1]._id);

    // assign colors to each item
    let lastIndex = 0;
    let lastAccentIndex = 0;

    for (const stack of stacks) {
      const colorIndex = randomColorIndex(lastIndex);
      const colorSet = GradientColors[colorIndex];
      let accentColorIndex = Math.floor(Math.random() * colorOptions.length);
      let accentColorSet = colorOptions[accentColorIndex];
      while (colorSet.excludedAccents.includes(accentColorSet.name) || accentColorIndex === lastAccentIndex) {
        accentColorIndex = Math.floor(Math.random() * colorOptions.length);
        accentColorSet = colorOptions[accentColorIndex];
      }

      lastIndex = colorIndex;
      lastAccentIndex = accentColorIndex;

      stack.color1 = colorSet.color1;
      stack.color2 = colorSet.color2;
      stack.accentColor = accentColorSet.code;
    }

  }, []);

  return (
    <FlatList
      data={stacks}
      keyExtractor={(stack) => stack._id}
      renderItem={({ item }) => (
        <StackCard 
          activeStackId={activeStackId}
          stack={item}
          lastStackId={lastStackId}
        />
      )}
      onViewableItemsChanged={viewableStacksChanges}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
    </FlatList>
  )
};

export default StackList;