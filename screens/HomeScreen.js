import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";

const HomeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    return (
        <SafeAreaView className="bg-white flex-1 relative mt-[24px]">
            {/* First section */}
            <View className="flex-row px-6 mt-8 items-center space-x-2">
                <View className="w-16 h-16 bg-black rounded-full items-center justify-center">
                    <Text className="text-[#4dabb7] text-3xl font-semibold">
                        Go
                    </Text>
                </View>
                <Text className="text-[#2a2b4b] text-3xl font-semibold">
                    Travel
                </Text>
            </View>

            {/* Second section */}

            <View className="px-8 mt-8 space-y-3 z-10">
                <Text className="text-[#3c6072] text-[42px]">
                    Enjoy the trip with
                </Text>
                <Text className="text-[#00bcc9] text-[38px] font-semibold">
                    Good Moments
                </Text>
                <Text className="text-[#3c6072] text-base">
                    Chào mừng đến với app tìm kiếm địa điểm.
                </Text>
            </View>

            {/* Circle section */}
            <View className="w-[300px] h-[300px] bg-[#00bcc9] absolute rounded-full bottom-36 -right-36"></View>
            <View className="w-[300px] h-[300px] bg-[#e99265] absolute rounded-full -bottom-28 -left-36"></View>

            {/* Image section */}
            <View className="flex-1 items-center justify-center relative ">
                <Animatable.Image
                    animation="fadeIn"
                    easing="ease-out"
                    source={require("../assets/hero.png")}
                    className="w-full h-full object-cover"
                />

                {/* Circle GO */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("Discover")}
                    className="absolute bottom-20 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#00bcc9] rounded-full items-center justify-center"
                >
                    <Animatable.View
                        className="w-20 h-20 items-center justify-center bg-[#00bcc9] rounded-full"
                        animation={"pulse"}
                        easing="ease-in-out"
                        iterationCount={"infinite"}
                    >
                        <Text className="text-white text-4xl font-semibold">
                            Go
                        </Text>
                    </Animatable.View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
