import { View, Text, StyleSheet, SafeAreaView, Dimensions, Platform, Image } from 'react-native';
import React, {
  Component,
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
} from 'react';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import FlashMessage from 'react-native-flash-message';
import {
  locationPermission,
  getCurrentLocation,
} from '../helper/helperFunction';
import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = () => {
  const navigation = useNavigation();
  
  const mapRef = useRef();
  const markerRef = useRef();
  const [state, setState] = useState({
    curLoc: {
      latitude: 10.79629,
      longitude: 106.71049,
    },
    destinationCords: {},
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: 10.79629,
      longitude: 106.71049,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    time: 0,
    distance: 0,
    heading: 0
  });

  const { curLoc, destinationCords, time, distance, isLoading, coordinate, heading } = state;

  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS == "android") {
        if (markerRef.current) {
            markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
        }
    } else {
        coordinate.timing(newCoordinate).start();
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      //console.log(location);
      setState({
        ...state,
        curLoc: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        coordinate: new AnimatedRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }),
      });
      //console.log(state);
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        //console.log(location);
        animate(location.coords.latitude, location.coords.longitude);
        setState({
          ...state,
          curLoc: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          coordinate: new AnimatedRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }),
          heading: location?.coords?.heading,
        });
       // console.log(state);
      })();
    }, 6000);
    return () => clearInterval(interval);
  });

  const onPressLocation = () => {
    navigation.navigate('ChooseLocation', { getCoordinates: fetchValues });
  };

  const fetchValues = (data) => {
    //console.log(data);
    setState({
      ...state,
      destinationCords: {
        latitude: data.destinationCords.latitude,
        longitude: data.destinationCords.longitude,
      },
    });
  };

  const onDone = () => {
    navigation.goBack();
  };

  const onCenter = () => {
    mapRef.current.animateToRegion({
        latitude: curLoc.latitude,
        longitude: curLoc.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });
}

  const fetchTime = (d,t) =>{
    setState(state=>({...state, distance: d, time: t}))
  }

  return (
    <SafeAreaView style={styles.container} className="relative">
      <TouchableOpacity
        onPress={() => onDone()}
        className="absolute top-[50px] left-5 w-10 h-10 rounded-md items-center justify-center bg-white z-30"
      >
        <FontAwesome5 name="chevron-left" size={24} color="#06B2BE" />
      </TouchableOpacity>
      {distance !== 0 && time !== 0 && (
        <View className='flex justify-center items-center p-4 absolute top-4 left-0 right-0 z-30 mx-[80px] my-5 bg-white rounded-[8px]' style={{ marginVertical: 16 }}>
          <Text>Time left: {Math.floor(time)} hour</Text>
          <Text>Distance left: {Math.floor(distance)} km</Text>
        </View>
      )}
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={{
            ...curLoc,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <Marker.Animated 
            coordinate={coordinate} 
            ref={markerRef} 
          >
            <Image 
              source={require("../assets/bike.png")}
              style={{
                width: 40,
                height: 40,
                transform: [{rotate: `${heading}deg`}]
              }}
              resizeMode="contain"
            />
          </Marker.Animated>
            
          {Object.keys(destinationCords).length > 0 && (
            <Marker coordinate={destinationCords} />
          )}

          {Object.keys(destinationCords).length > 0 && (
            <MapViewDirections
              origin={curLoc}
              destination={destinationCords}
              strokeWidth={3}
              optimizeWaypoints={true}
              apikey={"AIzaSyCBvt54W7Mta-p7V-1eopesIe2GLz5j1qc"}
              onReady={(result) => {
                fetchTime(result.distance, result.duration),
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: 30,
                    bottom: 300,
                    left: 30,
                    top: 100,
                  },
                  animated: true,
                });
              }}
              onError={(errorMessage) => console.log("Error")}
            />
          )}
        </MapView>
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
          onPress={onCenter}
        >
          <Image source={require("../assets/greenIndicator.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomcard}>
        <Text>Where are you going...?</Text>
        <TouchableOpacity style={styles.inputStyle} onPress={onPressLocation}>
          <Text>Choose your location</Text>
        </TouchableOpacity>
      </View>
      <FlashMessage position="top" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomcard: {
    backgroundColor: 'white',
    width: '100%',
    padding: 30,
    borderTopEndRadius: 24,
    borderTopLeftRadius: 24,
  },
  inputStyle: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginTop: 16,
  },
});

export default Map;
