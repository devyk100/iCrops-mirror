import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {Alert, Button, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectLocation, setLatitude, setLocation} from '../features/LocationSlice';
import {setLongitude} from '../features/DataCollectionSlice';

// Geolocation.getCurrentPosition(info => console.log(info));

const something = {
  coords: {
    accuracy: 3.0999999046325684,
    altitude: 193.9,
    heading: 300.6000061035156,
    latitude: 17.983909999999998,
    longitude: 79.53571333333333,
    speed: 1.4607816934585571,
  },
  extras: {maxCn0: 41, meanCn0: 31, satellites: 21},
  mocked: false,
  timestamp: 1710641025000,
};

export default function () {
  const dispatch = useDispatch();
  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos: any) => {
        // setPosition(JSON.stringify(pos));
        dispatch(setLocation(pos.coords))
        // dispatch(setLatitude(pos.coords.latitude));
        // dispatch(setLongitude(pos.coords.longitude));
        // console.log(locationData);
        console.log(pos)
      },
      (error: any) =>
        Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {enableHighAccuracy: true},
    );
  };
  getCurrentPosition();
}

export function getImageLocation() {
  let position = null;
  Geolocation.getCurrentPosition(
    (pos: any) => {
      // setPosition(JSON.stringify(pos));
      // dispatch(setLatitude(pos.coords.latitude));
      // dispatch(setLongitude(pos.coords.longitude));
      // console.log(locationData);
      position = pos;
      console.log(pos)
    },
    (error: any) =>
      Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
    {enableHighAccuracy: true},
  );
  return position;
}
