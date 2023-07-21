import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import AddressPickup from "../components/AddressPickup";
import CustomBtn from "../components/CustomBtn";
import { FontAwesome5 } from "@expo/vector-icons";

import { showError, showSuccess } from "../helper/helperFunction";

const ChooseLocation = (props) => {
    const navigation = useNavigation()

    const [state, setState] = useState({
        destinationCords: {}
    })
    const { destinationCords } = state

    const onDone = () => {
        const isValid = checkValid();
        console.log("Is valid...?", isValid)
        if (isValid) {
            props.route.params.getCoordinates({ 
                destinationCords
            })
            showSuccess("Bạn có thể quay lại");
            navigation.goBack();
        }
    }
    
    const fetchDestinationCords = (lat, lng, zipCode, cityText) => {
        setState({
            ...state, destinationCords: {
                latitude: lat,
                longitude: lng 
            }
        })
    }
    
    const checkValid = () => {
        if (Object.keys(destinationCords).length === 0) {
            showError("Bạn chưa nhập điểm đến")
            return false;
        }
        else return true;
    }

    const onBack = () => {
        navigation.goBack();
    };
    
    return (
        <View style={styles.container}>
            <View className="w-[100%] h-[40px] top-0 right-0 left-0">
                <TouchableOpacity
                    onPress={() => onBack()}
                    className="rounded-md pl-7 pt-5 bg-white"
                >
                    <FontAwesome5
                        name="chevron-left"
                        size={16}
                        color="#06B2BE"
                    >
                        Trờ về
                    </FontAwesome5>
                </TouchableOpacity>
            </View>
            <ScrollView keyboardShouldPersistTaps="handled" 
                style={{ backgroundColor: 'white', flex: 1, padding: 24 }}>

                <View style={{ marginBottom: 16 }}/>
                <AddressPickup 
                    placeholderText="Nhập điểm đến" 
                    fetchAddress={fetchDestinationCords}
                />
                <CustomBtn 
                    btnText="Hoàn tất" 
                    btnStyle={{ marginTop: 24 }} 
                    onPress={onDone}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 24
    }
});

export default ChooseLocation;