import {useCallback, useState} from 'react';
import {
  Alert,
  Button,
  Modal,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearLocation,
  selectLocation,
  setLocation,
} from '../../features/LocationSlice';
import MapChooseLocation from '../MapChooseLocation';
import Geolocation from '@react-native-community/geolocation';
import {Position} from '../../types';
import { selectCapturedFromMap, setCapturedFromMap } from '../../features/DataCollectionSlice';

export default function () {
  const [isEnabled, setIsEnabled] = useState(false);
  const capturedFromMap = useSelector(selectCapturedFromMap);
  const locationData = useSelector(selectLocation);
  const dispatch = useDispatch();
  // const setCapturedFromMapBoolean = useCallback((bool: boolean) => {
  //   dispatch(setCapturedFromMap(bool))
  // }, [capturedFromMap]);
  const toggleSwitch = () => {
    setIsEnabled(t => {
      dispatch(setCapturedFromMap(!t));
      return !t
    });
  };

  const getCurrentPosition = useCallback(() => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'auto',
      enableBackgroundLocationUpdates: true,
      locationProvider: 'auto',
    });
    Geolocation.getCurrentPosition(
      (pos: Position) => {
        dispatch(setLocation(pos.coords));
        console.log(pos);
      },
      (error: any) =>
        Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {
        enableHighAccuracy: true, // don't worry, inside buildings
      },
    );
  }, []);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const locationSetter = () => {
    if (isEnabled == false) {
      // getLocation();
      getCurrentPosition();
    } else {
      setIsMapModalOpen(true);
    }
  };
  return (
    <>
      <Text
        style={{
          color: 'black',
          backgroundColor: '#888484',
          padding: 5,
          marginHorizontal: 20,
        }}>
        Location
      </Text>

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
        }}>
        <Text
          style={{
            color: 'black',
            flex: 5,
            margin: 5,
          }}>
          Capture Location using Maps?
        </Text>
        <Switch
          trackColor={{false: '#767577', true: 'pink'}}
          thumbColor={isEnabled ? 'violet' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            flex: 5,
            margin: 5,
          }}>
          Capture the location
        </Text>
        <Modal
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
          }}
          animationType="slide"
          onRequestClose={() => {
            setIsMapModalOpen(false);
          }}
          visible={isMapModalOpen}>
          <MapChooseLocation
            closer={() => {
              setIsMapModalOpen(false);
              if (!locationData.latitude) setIsEnabled(false); // in case the user opens the map after turning it on once, meaning the data is present from the past stuff.
            }}
            handler={(latitude, longitude) => {
              dispatch(
                setLocation({
                  latitude: latitude,
                  longitude: longitude,
                  accuracy: 10,
                }),
              );
              setIsMapModalOpen(false);
              setIsEnabled(true);
            }}
          />
        </Modal>
        <Button
          title="Capture Location"
          onPress={() => locationSetter()}></Button>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          //   width:"100%",
          marginHorizontal: 25,
          marginTop: 5,
        }}>
        <Text
          style={{
            color: 'black',
            flex: 6,
            // padding:5
          }}>
          Accuracy Correction: {locationData.accuracy}
        </Text>
        <Button
          title="Clear"
          onPress={() => {
            dispatch(clearLocation());
            setIsEnabled(false);
          }}></Button>
      </View>

      <View
        style={{
          flexDirection: 'column',
          marginHorizontal: 20,
        }}>
        <Text
          style={{
            color: 'black',
            flex: 5,
            margin: 5,
          }}>
          Lat: {locationData.latitude}
        </Text>
        <Text
          style={{
            color: 'black',
            flex: 5,
            margin: 5,
          }}>
          Lon: {locationData.longitude}
        </Text>
      </View>
    </>
  );
}
