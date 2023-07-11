import { View, Text, StyleSheet } from "react-native";
import React, { Component, useState, useRef, useLayoutEffect } from "react";
import MapView, {Marker} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useNavigation } from "@react-navigation/native";

const Map = () => {
    const navigation = useNavigation();
    const [state, setState] = useState({
        pickupCords: {
            latitude: 30.7046,
            longitude: 76.7179,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        },
        droplocationCords: {
            latitude: 30.7333,
            longitude: 76.7179,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.041,
        }
    });

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerShown: false,
    //     });
    // }, []);

    const mapRef = useRef();
    const { pickupCords, droplocationCords } = state;
    
    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={StyleSheet.absoluteFill}
                initialRegion={pickupCords}
            >
                <Marker coordinate={pickupCords}/>
                <Marker coordinate={droplocationCords}/>
                <MapViewDirections origin={pickupCords} destination={droplocationCords} strokeWidth={3} optimizeWaypoints={true} apikey={"AIzaSyCBvt54W7Mta-p7V-1eopesIe2GLz5j1qc"} onReady={result => {
                    mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 30,
                  bottom: 300,
                  left: 30,
                  top: 100,
                }
              });
                }}/>

            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default Map;