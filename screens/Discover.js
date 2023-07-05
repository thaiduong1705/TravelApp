import { View, Text, SafeAreaView, Image, ScrollView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MenuContainer from "../components/MenuContainer";

const Discover = () => {
    const navigation = useNavigation();
    const [type, setType] = useState("restaurants");
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    return (
        <SafeAreaView className="flex-1 bg-white relative">
            <View className="flex-row items-center justify-between px-8">
                <View>
                    <Text className="text-[40px] text-[#0b646b] font-bold">
                        Discover
                    </Text>
                    <Text className="text-[#527283] text-4xl ">
                        The Beauty today
                    </Text>
                </View>
                <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center">
                    <Image source={require("../assets/avatar.png")} />
                </View>
            </View>
            <View className="flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-lg">
                <GooglePlacesAutocomplete
                    GooglePlacesDetailsQuery={{ fields: "geometry" }}
                    placeholder="Search"
                    fetchDetails={true}
                    onPress={(data, detail = null) => {
                        console.log(data, detail);
                        console.log(detail?.geometry?.viewport);
                    }}
                    query={{}}
                />
            </View>

            {/* Menu container */}
            <ScrollView>
                <View className="flex-row items-center justify-center px-8 mt-8">
                    <MenuContainer
                        key={"Restaurants"}
                        title="Restaurants"
                        imageSrc={require("../assets/restaurant.png")}
                        type={type}
                        setType={setType}
                    />
                    <MenuContainer
                        key={"Attractions"}
                        title="Attractions"
                        imageSrc={require("../assets/attraction.png")}
                        type={type}
                        setType={setType}
                    />
                    <MenuContainer
                        key={"Hotels"}
                        title="Hotels"
                        imageSrc={require("../assets/hotel.png")}
                        type={type}
                        setType={setType}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Discover;
