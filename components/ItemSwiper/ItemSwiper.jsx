import { View, Text } from "react-native";
import React, {useState, useEffect} from "react";
import Swiper from "react-native-deck-swiper";

import sampleData from "./sampleData.json";
import ItemCard from "../ItemCard/ItemCard";
import ColorPairings from "./ColorPairings";
import ProgressBar from "../ProgressBar";

const ItemSwiper = () => {
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(0);
  const [amount, setAmount] = useState("0%");
  
  useEffect(() => {
    // assign colors to each item
    let lastIndex = 0;
    const updatedItems = sampleData.map((item) => {
      const colorIndex = randomColorIndex(lastIndex);
      const colorSet = ColorPairings[colorIndex];

      lastIndex = colorIndex;
      return {
        ...item,
        backgroundColor: colorSet.background,
        textColor: colorSet.text,
        subtextColor: colorSet.subtext
      };
    });
    setItems(updatedItems);
  }, []);

  const swipeAction = (type) => {
    let newAmount = "";
    switch(type) {
      case "left":
        console.log("swipe left");
        newAmount = `${Math.floor((counter + 1) / items.length * 100)}%`;
        setAmount(newAmount);
        setCounter(prev => prev + 1 );

        break;
      case "right":
        console.log("swipe right");
        newAmount = `${Math.floor((counter + 1) / items.length * 100)}%`;
        setAmount(newAmount);
        setCounter(prev => prev + 1 );
        break;
      default:
        console.log("swipe default");
    }
  };

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
        <View
          className="h-full flex flex-column bg-light-background dark:bg-dark-background"
        >
          <View className="justify-center items-center mt-10">
            <View className="flex-row gap-1">
              <Text 
                className="text-light-yellow font-sans-semibold tracking-wide"
              >
                {counter}
              </Text>
              <Text className="text-light-text dark:text-dark-text font-sans tracking-wide">
                {`out of ${items.length} done`}
              </Text>
            </View>
            
            <ProgressBar 
              amount={amount}
              containerStyles="w-[60%]"
              hideProgressLabel={true}
            />
          </View>

          <View>
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
              stackSeparation={20}
              animateCardOpacity
              onSwipedLeft={() => swipeAction("left")}
              onSwipedRight={() => swipeAction("right")}
              verticalSwipe={false}
              cardVerticalMargin={30}
              cardHorizontalMargin={30}
            />
          </View>
          
        </View>
        
      ) : (
        <Text>Loading...</Text>
      )}
      
    </View>
  )
};

export default ItemSwiper;