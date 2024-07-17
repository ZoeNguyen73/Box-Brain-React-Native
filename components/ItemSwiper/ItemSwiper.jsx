import { View, ScrollView, Text, ImageBackground } from "react-native";
import React, {useState, useEffect} from "react";
import Swiper from "react-native-deck-swiper";

import sampleData from "./sampleData.json";
import ColorPairings from "./ColorPairings";
import { gradients } from "../../constants";

const ItemCard = ({ item }) => {
  const { keyword, definition, borderColor, textColor } = item;

  return (
    <ScrollView className="h-[95%]">
      <View 
        className={`h-[70vh] border-8 ${borderColor} rounded-3xl overflow-hidden`}
      >
        <ImageBackground 
          source={gradients.gradientYellowBlue}
          resizeMode="cover"
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 20,
            overflow: "hidden"
          }}
        >
          <View className="p-8">
            <Text className={`font-mono-bold text-3xl ${textColor}`}>
              {keyword}
            </Text>
            <Text className="font-sans text-light-text mt-5">
              {definition}
            </Text>
          </View>
          
        </ImageBackground>
      </View>
    </ScrollView>
  )
}

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
    console.log(updatedItems);
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