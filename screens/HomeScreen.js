import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";

const HomeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    return (
        <SafeAreaView className="bg-red-100 mt-[24px]">
            {/* First section */}
            <View className="flex-row px-6 mt-8 items-center space-x-2">
                <View>
                    <Text>
                        dsadsadadadasdsadsadadassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssGo
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
