import { View, ScrollView, Text } from "react-native";

import TagChip from "./TagChip";
import PropertyDisplay from "./PropertyDisplay";

const ItemCard = ({ item }) => {
  const { keyword, definition, backgroundColor, textColor, subtextColor, tags, properties } = item;

  return (
    <ScrollView className="h-[95%]">
      <View 
        className="h-[70vh] border border-4 rounded-3xl overflow-hidden border-dark-background dark:border-dark-primary"
      >
        <View
          className={`${backgroundColor} justify-center p-5 flex-1`}
        >
          <View className="flex-column justify-left">
            <Text 
              className={`${textColor} font-serif-bold text-5xl tracking-wider`}
            >
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

            <Text className={`${textColor} font-sans-semibold text-xl mt-5 tracking-wide`}>
              {definition}
            </Text>

            <View className="flex-column mt-5">
              { properties.map((property) => {
                return (
                  <PropertyDisplay
                    key={property._id} 
                    name={property.property_id.name}
                    content={property.content}
                    textColor={subtextColor}
                  />
                )
              })}

            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
};

export default ItemCard;