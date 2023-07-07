import { View, Text, SafeAreaView, Image, ScrollView, Touchable, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MenuContainer from "../components/MenuContainer";
import { FontAwesome } from '@expo/vector-icons';
import ItemCarContainer from "../components/ItemCarContainer";

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
                <View>
                    <MenuContainer
                        key={"Restaurants"}
                        title="Restaurants"
                        imageSrc={require("../assets/restaurants.png")}
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

                <View className="flex-row items-center justify-between px-4 mt-8">
                    <View>
                        <Text className="text-[#2C7379] text-[28px] font-bold">
                            Top Tips
                        </Text>
                        <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                            <Text className="text-[#A0C4C7] text-[20px] font-bold">
                                Explore
                            </Text>
                            <FontAwesome name="long-arrow-right" size={24} color="#A0C4C7" />
                        </TouchableOpacity>
                    </View>

                 <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
                        <ItemCarContainer 
                        key={"101"} 
                        imageSrc={
                            "https://cdn.pixabay.com/photo/2023/05/15/09/18/iceberg-7994536_1280.jpg"
                        } 
                        title="Something" 
                        location="da" />
                        <ItemCarContainer 
                        key={"102"} 
                        imageSrc={
                            "https://media.istockphoto.com/id/693474546/vi/anh/t%E1%BA%A3ng-b%C4%83ng-tr%C3%B4i-%E1%BB%9F-bi%E1%BB%83n-b%E1%BA%AFc-c%E1%BB%B1c.jpg?s=612x612&w=is&k=20&c=6feUOhKHZQH1fa6FwmPJB5ySyKQ0_97c3cYWTWmenKM="
                        } 
                        title="ea" 
                        location="fe" />           
                 </View>   
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Discover;
