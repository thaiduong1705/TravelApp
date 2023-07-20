import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const MenuContainer = ({ title, imageSrc, type, setType, key, kind }) => {
    const handlePress = () => {
        console.log("HE",kind);
        setType(kind);
    };
    return (
        <TouchableOpacity
            className="items-center justify-center space-y-2"
            onPress={handlePress}
        >
            <View
                className={`w-24 h-24 p-2 shadow-sm rounded-full items-center justify-center ${
                    type === kind ? "bg-gray-200" : ""
                }`}
            >
                <Image
                    source={imageSrc}
                    className="w-full h-full object-contain"
                />
            </View>
            <Text className="text-[#00bcc9] font-semibold">{title}</Text>
        </TouchableOpacity>
    );
};

export default MenuContainer;
