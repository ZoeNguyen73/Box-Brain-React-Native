import { View, Text, Image } from "react-native";
import React, {useState, useEffect} from "react";
import Swiper from "react-native-deck-swiper";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

import sampleData from "./sampleData.json";
import ItemCard from "../ItemCard/ItemCard";
import ColorPairings from "./ColorPairings";
import ProgressBar from "../ProgressBar";
import CustomButton from "../CustomButton/CustomButton";
import tailwindConfig from "../../tailwind.config";
import LoadingSpinner from "../LoadingSpinner";

import { useThemeContext } from "../../context/ThemeProvider";

import { illustrations } from "../../constants";

const ItemSwiper = () => {
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(0);
  const [amount, setAmount] = useState("0%");
  const [swipedAllCards, setSwipedAllCards] = useState(false);

  const { theme } = useThemeContext();
  const iconColor = theme === "dark"
    ? tailwindConfig.theme.extend.colors.dark.text
    : tailwindConfig.theme.extend.colors.light.text
  
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
  };

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

            { !swipedAllCards && (
              <View className="w-[80%] flex-row justify-between mt-12">
                <View className="flex-row gap-2">
                  <Feather name="corner-up-left" size={20} color={iconColor} />
                  <View>
                    <Text className="font-sans-light-italic text-xs text-light-text dark:text-dark-text">
                      Swipe Left
                    </Text>
                    <Text className="font-sans-light-italic text-xs text-light-text dark:text-dark-text">
                      if you get it wrong
                    </Text>
                  </View>
                </View>

                <View className="flex-row gap-2">
                  <View className="flex-column items-end">
                    <Text className="font-sans-light-italic text-xs text-light-text dark:text-dark-text">
                      Swipe Right
                    </Text>
                    <Text className="font-sans-light-italic text-xs text-light-text dark:text-dark-text">
                      if you get it right
                    </Text>
                  </View>
                  <Feather name="corner-up-right" size={20} color={iconColor} />
                </View>
              </View>
            )}
            
          </View>

          <View>
            { !swipedAllCards && (
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
                cardVerticalMargin={20}
                cardHorizontalMargin={30}
                onSwipedAll={() => setSwipedAllCards(true)}
              />    
            )}

            { swipedAllCards && (
              <View className="flex justify-center items-center h-[80vh]">
                <View className="bg-light-yellow w-[250px] h-[250px] rounded-full justify-center items-center mb-10">
                  <Image
                    source={illustrations.openDoodlesSwinging}
                    style={{ maxWidth: "100%" }}
                    resizeMode="contain"
                  />
                </View>
                
                <View className="w-[80%] justify-center items-center">
                  <Text className="font-serif-bold text-4xl tracking-wider text-light-text dark:text-light-yellow">
                    Great job!
                  </Text>
                  <Text className="font-sans tracking-wide text-light-text dark:text-dark-text mt-1">
                    You have completed all items today
                  </Text>
                </View>

                <CustomButton
                  containerStyles="mt-20" 
                  title="Back to Home"
                  handlePress={() => router.push("/home")}
                />
               
              </View>
              
            )}
            
          </View>
          
        </View>
        
      ) : (
        <LoadingSpinner />
      )}
      
    </View>
  )
};

export default ItemSwiper;