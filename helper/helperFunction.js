import { showMessage } from 'react-native-flash-message';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const getCurrentLocation =  () => {

    Geolocation.getCurrentPosition((position) => {
        console.log(position)
    }, error => {
        console.log(error)
    })
};

export const locationPermission = async () => {
  if (Platform.OS === 'ios') {
    try {
      const permissionStatus = await Geolocation.requestAuthorization('whenInUse');
      if (permissionStatus === 'granted') {
        return 'granted';
      } else {
        return 'Permission not granted';
      }
    } catch (error) {
      return error;
    }
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return 'granted';
      } else {
        return 'Location Permission denied';
      }
    } catch (error) {
      console.log('Ask Location permission error: ', error);
      return error;
    }
  }
};


const showError = (message) => {
  showMessage({
    message,
    type: 'danger',
    icon: 'danger',
  });
};

const showSuccess = (message) => {
  showMessage({
    message,
    type: 'success',
    icon: 'success',
  });
};

export { showError, showSuccess };
