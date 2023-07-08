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
import { FontAwesome5 } from "@expo/vector-icons";

const ItemScreen = ({ route }) => {
    const navigate = useNavigation();
    const data = route?.params?.param;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    console.log(data);
    return (
        <SafeAreaView className="flex-1 relative bg-white mt-[24px]">
            <ScrollView className="flex-1 px-4 py-6">
                <View className="relative bg-white shadow-lg">
                    <Image
                        source={{
                            uri: data?.photo?.images?.large?.url
                                ? data?.photo?.images?.large?.url
                                : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg",
                        }}
                        className="w-full h-72 object-cover rounded-2xl"
                    />
                </View>
                <View className="absolute flex-row inset-x-0 top-5 justify-between px-6">
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Discover")}
                        className="w-10 h-10 rounded-md items-center justify-center bg-white"
                    >
                        <FontAwesome5
                            name="chevron-left"
                            size={24}
                            color="#06B2BE"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity className="w-10 h-10 rounded-md items-center justify-center bg-[#06B2BE]">
                        <FontAwesome5 name="heartbeat" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ItemScreen;
