import { View, Text } from "react-native";
import React, {useState, useEffect} from "react";
import Swiper from "react-native-deck-swiper";

import sampleData from "./sampleData.json";
import ColorPairings from "./ColorPairings";
import ItemCard from "../ItemCard/ItemCard";


const ItemSwiper = () => {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    // assign colors to each item
    let lastIndex = 0;
    const updatedItems = sampleData.map((item) => {
      const colorIndex = randomColorIndex(lastIndex);
      lastIndex = colorIndex;
      return {
        ...item,
        backgroundColor: ColorPairings[colorIndex].backgroundColor,
        borderColor: ColorPairings[colorIndex].borderColor,
        textColor: ColorPairings[colorIndex].textColor,
      };
    });
    setItems(updatedItems);
  }, []);

  const randomColorIndex = (lastIndex) => {
    let colorIndex = lastIndex;
    while (colorIndex === lastIndex) {
      colorIndex = Math.floor(Math.random() * ColorPairings.length);
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