import Geolocation from '@react-native-community/geolocation';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import MapView, {
  Callout,
  MapPressEvent,
  Marker,
  MarkerDragStartEndEvent,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {Position, PositionError} from '../types';
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

export default () => {
  const [region, setRegion] = useState<Region>({
    longitude: 0,
    latitude: 0,
    latitudeDelta: 0.0015,
    longitudeDelta: 0.0015,
  });
  const ref = useRef<MapView>()
  const mapPointHandler = useCallback(() => {

  }, [])

  return (
    <View style={styles.container}>
      <MapView
        mapType="standard"
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={region}
        loadingEnabled={true}
        loadingIndicatorColor={'grey'}
        showsUserLocation={true}
        showsMyLocationButton={true}
        // onPress={(event: MapPressEvent) => {
        //   const coordinates = event.nativeEvent.coordinate;
        //   setRegion({
        //     latitude: coordinates.latitude,
        //     longitude: coordinates.longitude,
        //     latitudeDelta: 0.0015,
        //     longitudeDelta: 0.0015
        //   })
        // }}
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
            },
            (error: PositionError) => console.log(error),
            {},
          );
        }}>
        <Marker
          coordinate={region}
          draggable
          tappable
          onDragEnd={(event: MarkerDragStartEndEvent) => {
            console.log(event.nativeEvent);
          }}
        >
           <Callout tooltip={false} style={{borderRadius:10}}>
            <Text style={{color:"blue"}}>Place this to the position you want to mark.</Text>

           </Callout>
        </Marker>
      </MapView>
    </View>
  );
};
