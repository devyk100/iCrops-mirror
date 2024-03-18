import Geolocation from '@react-native-community/geolocation';
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';
import MapView, {
  Callout,
  LatLng,
  MapPressEvent,
  Marker,
  MarkerDragStartEndEvent,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {Position, PositionError} from '../types';
import { useNetInfo } from "@react-native-community/netinfo";



// import {  } from 'react-native-gesture-handler';
// import {  } from 'react-native-reanimated/lib/typescript/Animated';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const MapChooser = ({handler}: {handler: (latitude: number, longitude: number) => void}) => {
  const [region, setRegion] = useState<Region>({
    longitude: 0,
    latitude: 0,
    latitudeDelta: 0.0015,
    longitudeDelta: 0.0015,
  });
  const [mapCoordinates, setMapCoordinates] = useState<LatLng>({
    latitude: region.latitude,
    longitude: region.longitude,
  });
  const ref = useRef<MapView>();

  return (
    <View style={styles.container}>
      <MapView
        mapType="satellite"
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={region}
        loadingEnabled={true}
        loadingIndicatorColor={'grey'}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onPress={(event: MapPressEvent) => {
          const coordinates = event.nativeEvent.coordinate;
          setMapCoordinates({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          });
        }}
        onMapReady={() => {
          Geolocation.setRNConfiguration({
            skipPermissionRequests: false,
            authorizationLevel: 'auto',
            enableBackgroundLocationUpdates: true,
            locationProvider: 'auto',
          });
          Geolocation.getCurrentPosition(
            (position: Position) => {
              console.log(position);
              setRegion({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0015,
                longitudeDelta: 0.0015,
              });
              setMapCoordinates({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (error: PositionError) => console.log(error),
            {},
          );
        }}>
        <Marker
          coordinate={mapCoordinates}
          draggable
          tappable
          onDragEnd={(event: MarkerDragStartEndEvent) => {
            const coordinates = event.nativeEvent.coordinate;
            setMapCoordinates({
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
            });
          }}>
          <Callout tooltip={false} style={{borderRadius: 10}}>
            <Text style={{color: 'blue'}}>
              Place this to the position you want to mark.
            </Text>
          </Callout>
        </Marker>
      </MapView>
      <View
      style={{
        position: 'absolute',
        width: '100%',
        height: 'auto'
      }}
      >
        <View style={{flexDirection: 'row', margin:10, justifyContent:"flex-end"}}>
          <TouchableOpacity
          onPress={() => {
            handler(mapCoordinates.latitude, mapCoordinates.longitude)
          }}
            style={{backgroundColor: 'green', padding: 10, paddingHorizontal:15, borderRadius: 15}}>
            <Text
            // @ts-ignore
              style={{
                fontSize: 18,
                fontWeight: 900,
              }}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: 'turquoise',
            padding: 10,
            borderRadius: 20,
          }}>
          <Text
            style={{
              color: 'black',
              margin: 10,
              fontSize: 14,
              textAlign: 'center',
            }}>
            Tap at any location, or hold and drag the marker above to mark and
            get the coordinates of the position
          </Text>
          <Text
            style={{color: 'red', textAlign: 'center', marginHorizontal: 10}}>
            Latitude: {mapCoordinates.latitude}
          </Text>
          <Text
            style={{color: 'red', textAlign: 'center', marginHorizontal: 10}}>
            Longitude: {mapCoordinates.longitude}
          </Text>
        </View>
      </View>
    </View>
  );
};
// handler is for successful operations and closer for cleaning up things that shouldn't have been happening
export default function ({handler, closer}: {handler: (latitude: number, longitude: number) => void,  closer: () => void}) {
  const [isRendered, setIsRendered] = useState(false);
  const { type, isConnected } = useNetInfo();
  useEffect(() => {
    if(type != "none" && isConnected == true){
      setIsRendered(true);
    }
    if(type == "none" || isConnected == false){
      Alert.alert("You're not connected to the Internet.", "Connect to the internet to use the maps functionality")
      if(isRendered == false){
        closer()
      }
    }
    console.log(type, isConnected);
  }, [type, isConnected]);
  if (isRendered)
    return (
      <>
        <MapChooser handler={handler} />
      </>
    );
  return null;
}
