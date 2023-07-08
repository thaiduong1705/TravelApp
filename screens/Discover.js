import {
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MenuContainer from "../components/MenuContainer";
import { FontAwesome } from "@expo/vector-icons";
import ItemCardContainer from "../components/ItemCardContainer";
import { getPlacesData } from "../api";

const Discover = () => {
    const navigation = useNavigation();
    const [type, setType] = useState("restaurants");
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState([]);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    useEffect(() => {
        setIsLoading(true);
        getPlacesData().then((data) => setMainData(data?.data));
        const timeOut = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => {
            clearTimeout(timeOut);
        };
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-white relative mt-[24px]">
            <View className="flex-row items-center justify-between px-8">
                <View>
                    <Text className="text-3xl text-[#0b646b] font-bold">
                        Discover
                    </Text>
                    <Text className="text-[#527283] text-2xl ">
                        The Beauty today
                    </Text>
                </View>
                <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center">
                    <Image
                        source={require("../assets/avatar.png")}
                        className="w-full h-full rounded-md object-cover"
                    />
                </View>
            </View>
            <View className="flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 mt-4 shadow">
                <GooglePlacesAutocomplete
                    GooglePlacesDetailsQuery={{ fields: "geometry" }}
                    placeholder="Search"
                    fetchDetails={true}
                    onPress={(data, detail = null) => {
                        console.log(data, detail);
                        console.log(detail?.geometry?.viewport);
                    }}
                    query={{}}
                    className="w-full h-full"
                />
            </View>

            {/* Menu container */}
            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#0b646b" />
                </View>
            ) : (
                <ScrollView>
                    <View className="flex-row justify-evenly items-center mt-8 px-8">
                        <MenuContainer
                            key={"hotel"}
                            title="Hotels"
                            imageSrc={require("../assets/hotel.png")}
                            type={type}
                            setType={setType}
                        />
                        <MenuContainer
                            key={"attraction"}
                            title="Attractions"
                            imageSrc={require("../assets/attraction.png")}
                            type={type}
                            setType={setType}
                        />
                        <MenuContainer
                            key={"restaurant"}
                            title="Restaurants"
                            imageSrc={require("../assets/restaurant.png")}
                            type={type}
                            setType={setType}
                        />
                    </View>

                    <View>
                        <View className="flex-row items-center justify-between px-4 mt-8">
                            <Text className="text-[#2C7379] text-[28px] font-bold">
                                Top Tips
                            </Text>
                            <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                                <Text className="text-[#A0C4C7] text-[20px] font-bold">
                                    Explore
                                </Text>
                                <FontAwesome
                                    name="long-arrow-right"
                                    size={24}
                                    color="#A0C4C7"
                                />
                            </TouchableOpacity>
                        </View>

                        <View className="px-4 mt-8 flex-row items-center justify-start flex-wrap">
                            {mainData?.length > 0 ? (
                                <>
                                    {/* <ItemCardContainer
                                        key={"101"}
                                        imageSrc={
                                            "https://cdn.pixabay.com/photo/2023/05/15/09/18/iceberg-7994536_1280.jpg"
                                        }
                                        title={"Something"}
                                        location="da"
                                    /> */}
                                    {mainData?.map((data, index) => {
                                        return (
                                            <ItemCardContainer
                                                key={index}
                                                imageSrc={
                                                    data?.photo?.images?.medium
                                                        ?.url
                                                        ? data?.photo?.images
                                                              ?.medium?.url
                                                        : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg"
                                                }
                                                title={data?.name}
                                                location={data?.location_string}
                                            />
                                        );
                                    })}
                                </>
                            ) : (
                                <View className="w-full h-[300px] items-center space-y-8 justify-center">
                                    <Image
                                        source={require("../assets/NotFound.png")}
                                        className="w-[32px] h-[32px] object-cover"
                                    />
                                    <Text>Oops... No Data Found</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default Discover;
