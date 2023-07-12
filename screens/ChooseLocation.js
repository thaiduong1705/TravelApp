import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import AddressPickup from "../components/AddressPickup";
import CustomBtn from "../components/CustomBtn";

const ChooseLocation = ({}) => {
    const navigation = useNavigation()

    const [state, setState] = useState({
        pickupCords: {},
        destinationCords: {}
    })
    const { pickupCords, destinationCords } = state

    const onDone = () => {        
        navigation.goBack()
    }

    const fetchAddressCords = (lat, lng) => {
        console.log("latitude: ", lat)
        console.log("longtitude: ", lng)
        setState({
            ...state, pickupCords: {
                latitude: lat,
                longtitude: lng 
            }
        })
    }

    const fetchDestinationCords = (lat, lng) => {
        console.log("latitude: ", lat)
        console.log("longtitude: ", lng)
        setState({
            ...state, pickupCords: {
                latitude: lat,
                longtitude: lng 
            }
        })
    }

    
    
    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled" style={{ backgroundColor: 'white', flex: 1, padding: 24 }}>
                <AddressPickup placeholderText="Enter start location" fetchAddress={fetchAddressCords}/>
                <View style={{ marginBottom: 16 }}/>
                <AddressPickup placeholderText="Enter destination location" fetchAddress={fetchDestinationCords}/>
                <CustomBtn btnText="Done" btnStyle={{ marginTop: 24 }} onPress={onDone}/>
            </ScrollView>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default ChooseLocation;