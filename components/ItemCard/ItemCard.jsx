import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

import TagChip from "./TagChip";
import PropertyDisplay from "./PropertyDisplay";

const ItemCard = ({ item }) => {
  const { keyword, definition, backgroundColor, textColor, subtextColor, tags, properties } = item;
  const [showDefinition, setShowDefinition] = useState(false);

  return (
    <ScrollView className="h-[90%]">
      <View 
        className="h-[70vh] border border-4 rounded-3xl overflow-hidden border-dark-background dark:border-dark-primary"
      >
        <View
          className={`${backgroundColor} justify-center p-5 flex-1 justify-between`}
        >
          <View className="flex-column flex-1 justify-center">
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
            { showDefinition && (
              <>
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
              </>
            )}
            
          </View>

          <View className="justify-end">
            <TouchableOpacity
              onPress={() => setShowDefinition(true)}
            >
              <View style={styles.dashedBorder}>
                <Text className={`${textColor} font-sans tracking-wide`}>
                  Tap to reveal definition
                </Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  dashedBorder: {
    borderWidth: 1,
    borderColor: "#4c4f69",
    borderStyle: "dashed",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },
});

export default ItemCard;