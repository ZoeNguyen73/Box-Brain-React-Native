import { View, ScrollView, Text, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { gradients } from "../../constants";
import TagChip from "./TagChip";
import PropertyDisplay from "./PropertyDisplay";

const ItemCard = ({ item }) => {
  const { keyword, definition, borderColor, textColor, tags, properties } = item;

  return (
    <ScrollView className="h-[95%]">
      <View 
        className={`h-[70vh] border-8 ${borderColor} rounded-3xl overflow-hidden`}
      >
        {/* <ImageBackground 
          source={gradients.gradientYellowBlue}
          resizeMode="cover"
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 20,
            overflow: "hidden"
          }}
        > */}
        <LinearGradient
          colors={["#db5375", "#b3ffb3"]}
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 20,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View className="flex-column justify-left">
            <Text className={`font-mono-bold text-4xl ${textColor}`}>
              {keyword}
            </Text>

            <View className="flex-row mt-5 self-start">
              { tags.map((tag) => {
                return (
                  <TagChip
                    key={tag._id} 
                    text={tag.tag_id.name}
                    color={tag.tag_id.colour_name}
                  />
                )
              })}
            </View>

            <Text className="font-sans-semibold text-xl text-light-text mt-5 tracking-wide">
              {definition}
            </Text>

            <View className="flex-column mt-5">
              { properties.map((property) => {
                return (
                  <PropertyDisplay
                    key={property._id} 
                    name={property.property_id.name}
                    content={property.content}
                  />
                )
              })}

            </View>
          </View>
        </LinearGradient>  
        {/* </ImageBackground> */}
      </View>
    </ScrollView>
  )
};

export default ItemCard;