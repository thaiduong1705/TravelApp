import React from "react";
import { View, Text, StyleSheet} from 'react-native';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const AddressPickup = ({
    placeholderText,
    fetchAddress
}) => {
    const onPressAddress = (data, details) => {
        console.log(details)
        const lat = details.geometry.location.lat
        const lng = details.geometry.location.lng
        fetchAddress(lat, lng)       
    }
    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder={placeholderText}
                onPress={onPressAddress}
                fetchDetails={true}
                query={{
                    key: "AIzaSyCBvt54W7Mta-p7V-1eopesIe2GLz5j1qc",
                    language: 'vi'
                }}
                styles={{
                    textInputContainer: styles.containerStyle,
                    textInput: styles.textInputStyle
                }}
                disableScroll={true}>
                    

            </GooglePlacesAutocomplete>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerStyle: {
        backgroundColor: 'white'
    },
    textInputStyle: {
        height: 48,
        color: 'black',
        fontSize: 16,
        backgroundColor: '#F3F3F3'
    }
});

export default AddressPickup;