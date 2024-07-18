import { View, Text } from "react-native";
import React, {useState, useEffect} from "react";
import Swiper from "react-native-deck-swiper";

import sampleData from "./sampleData.json";
import ItemCard from "../ItemCard/ItemCard";
import GradientColors from "./GradientColors";
import GenerateColorOptions from "./ColorOptions";

const ItemSwiper = () => {
  const [items, setItems] = useState([]);
  const colorOptions = GenerateColorOptions();
  
  useEffect(() => {
    // assign colors to each item
    let lastIndex = 0;
    let lastAccentIndex = 0;
    const updatedItems = sampleData.map((item) => {
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
      return {
        ...item,
        color1: colorSet.color1,
        color2: colorSet.color2,
        accentColor: accentColorSet.code
      };
    });
    setItems(updatedItems);
  }, []);

  const randomColorIndex = (lastIndex) => {
    let colorIndex = lastIndex;
    while (colorIndex === lastIndex) {
      colorIndex = Math.floor(Math.random() * GradientColors.length);
    }
    return colorIndex;
  }

  return (
    <View>
      { items.length > 0 ? (
        <Swiper
          cards={items}
          keyExtractor={(item) => item._id}
          cardIndex={0}
          renderCard={(item, index) => (
              <ItemCard 
                item={item}
                index={index}
              />
            )
          }
          stackSize={3}
        />
      ) : (
        <Text>Loading...</Text>
      )}
      
    </View>
  )
};

export default ItemSwiper;