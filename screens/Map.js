import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const Map = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View className="">
                    MAP
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Map