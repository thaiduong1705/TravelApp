import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const ItemCardContainer = ({ imageSrc, title, location, data }) => {
    const navigation = useNavigation();
    return (
        <View className="ml-[4px]">
            <TouchableOpacity
                className="rounded-md border border-gray-300 space-y-2 px-3 py-2 shadow-md bg-white w-[182px] my-2"
                onPress={() =>
                    navigation.navigate("ItemScreen", { param: data })
                }
            >
                <Image
                    source={{ uri: imageSrc }}
                    className="w-full h-40 rounded-md object-cover"
                />

                <>
                    <Text
                        className="text-[#428288] text-[18px] font-bold"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {title?.length > 14
                            ? `${title?.slice(0, 14)}...`
                            : title}
                    </Text>
                    <View className="flex-row items-center space-x-1">
                        <FontAwesome
                            name="map-marker"
                            size={24}
                            color="#8597A2"
                        />
                        <Text
                            className="text-[#428288] text-[14px] font-bold"
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {location?.length > 18
                                ? `${location?.slice(0, 18)}...`
                                : location}
                        </Text>
                    </View>
                </>
            </TouchableOpacity>
        </View>
    );
};

export default ItemCardContainer;
