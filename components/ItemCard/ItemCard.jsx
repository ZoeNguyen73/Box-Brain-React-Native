import { View, ScrollView, Text, ImageBackground } from "react-native";
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
          <View className="flex-column justify-left">
            <Text className={`font-mono-bold text-4xl ${textColor}`}>
              {keyword}
            </Text>

            <View className="flex-row mt-5 self-start">
              { tags.map((tag) => {
                return (
                  <TagChip
                    key={tag.tag_id._id} 
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
                    name={property.property_id.name}
                    content={property.content}
                  />
                )
              })}

            </View>
          </View>
          
        </ImageBackground>
      </View>
    </ScrollView>
  )
};

export default ItemCard;