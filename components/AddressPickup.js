import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const AddressPickup = ({ placeholderText, fetchAddress }) => {
  const onPressAddress = (data, details) => {
    let resLength = details.address_components.length;
    let zipCode = '';
    let filterResCity = details.address_components.filter((val) => {
      if (val.types.includes("locality") || val.types.includes("sublocality")) {
        return val;
      }
      if (val.types.includes("postal_code")) {
        let postalCode = val?.long_name;
        zipCode = postalCode;
      }
      return false;
    });


    let dataTextCityObj =
      filterResCity.length > 0
        ? filterResCity[0]
        : details.address_components[
            resLength > 1 ? resLength - 2 : resLength - 1
          ];

    let cityText =
      dataTextCityObj.long_name && dataTextCityObj.long_name.length > 17
        ? dataTextCityObj.short_name
        : dataTextCityObj.long_name;
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    // fetchAddress(lat, lng);
    fetchAddress(lat, lng, zipCode, cityText);
   
  };
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={placeholderText}
        onPress={onPressAddress}
        fetchDetails={true}
        query={{
          key: "AIzaSyCBvt54W7Mta-p7V-1eopesIe2GLz5j1qc",
          language: "vi",
        }}
        styles={{
          textInputContainer: styles.containerStyle,
          textInput: styles.textInputStyle,
        }}
        disableScroll={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerStyle: {
    backgroundColor: "white",
  },
  textInputStyle: {
    height: 48,
    color: "black",
    fontSize: 16,
    backgroundColor: "#F3F3F3",
  },
});

export default AddressPickup;
