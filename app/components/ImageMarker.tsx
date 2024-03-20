import {useCallback, useEffect, useMemo, useState} from 'react';
// import React, { useMemo, useState } from 'react';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Marker, {
  ImageFormat,
  Position,
  TextBackgroundType,
} from 'react-native-image-marker';
// import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import {PermissionsAndroid} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {useDispatch, useSelector} from 'react-redux';
import {addImage, selectLandCoverType} from '../features/DataCollectionSlice';
import {LatLng} from 'react-native-maps';
import {selectLocation} from '../features/LocationSlice';
import MapChooseLocation from './MapChooseLocation';
import Geolocation from '@react-native-community/geolocation';
import {Position as MapPosition} from '../types';

async function hasAndroidPermission() {
  const getCheckPermissionPromise = () => {
    // @ts-ignore
    if (Platform.Version >= 33) {
      return Promise.all([
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        ),
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ),
      ]).then(
        ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
          hasReadMediaImagesPermission && hasReadMediaVideoPermission,
      );
    } else {
      return PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }
  };

  const hasPermission = await getCheckPermissionPromise();
  if (hasPermission) {
    return true;
  }
  const getRequestPermissionPromise = () => {
    // @ts-ignore
    if (Platform.Version >= 33) {
      return PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]).then(
        statuses =>
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
            PermissionsAndroid.RESULTS.GRANTED,
      );
    } else {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
    }
  };

  return await getRequestPermissionPromise();
}

async function imageProcessing(
  imageUri: string,
  cropName: string,
  latitude: number,
  longitude: number,
  username: string,
  landType: string,
  setLoader: () => void
) {
  if (!cropName || cropName == '') {
    Alert.alert('Enter the crop name', "Type 0 to confirm if there's no crop to put in the field");
    return null;
  }
  if(!latitude){
    Alert.alert("The location wasn't set, please set it.", "Set the location");
    return null;
  }
  const options = {
    // background image
    backgroundImage: {
      src: {uri: imageUri},
      scale: 1,
    },
    watermarkTexts: [
      {
        text: cropName != "0"
          ? `Latitude: ${latitude} \nLatitude: ${longitude}\nCrop: ${cropName}\nBy ${username}\n${new Date()}`
          : `Latitude: ${latitude} \nLatitude: ${longitude}\nBy ${username}\n${new Date()}`,
        position: {
          position: Position.topLeft,
        },
        style: {
          color: '#ffffff',
          fontSize: 30,
          fontName: 'Arial',
          shadowStyle: {
            dx: 0,
            dy: 0,
            radius: 15,
            color: '#000000',
          },
          textBackgroundStyle: {
            padding: '0% 1%',
            type: TextBackgroundType.none,
            color: '#000000',
          },
        },
      },
    ],
    scale: 1,
    quality: 100,
    filename: cropName != "0"
      ? `crop: ${cropName} ${landType} by ${username}`
      : `${landType} by ${username}`,
    saveFormat: ImageFormat.png,
  };
  const permimssionPass = await hasAndroidPermission();
  console.log(permimssionPass);
  setLoader();
  const path = await Marker.markText(options);
  const resUri = 'file:' + path;
  const newUri = await CameraRoll.saveAsset(resUri, {
    type: 'auto',
    album: 'geotagged photos',
  });
  return newUri.node.image.uri;
}

export default function ({
  // latitude,
  // longitude,
  imageUri,
  toRender,
  closer,
}: {
  // latitude: string;
  // longitude: string;
  imageUri: string;
  toRender: boolean;
  closer: () => void;
}) {
  //for now username is something, retrieve this from the redux state
  // retrieve this from the redux state
  const username = 'mowegmogmw';
  const landType = useSelector(selectLandCoverType);
  const [cropName, setCropName] = useState<string>("")
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const locationData = useSelector(selectLocation);
  const [coordinates, setCoordinates] = useState<LatLng>({
    longitude: locationData?.longitude,
    latitude: locationData?.latitude,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    locationFromFormHandler();
  }, [toRender]);

  const [selectedId, setSelectedId] = useState<string | undefined>('2');
  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: '1',
        label: 'Set from Map',
        value: 'map',
        containerStyle: {},
      },
      {
        id: '2',
        label: 'Set from form',
        value: 'form',
      },
      {
        id: '3',
        label: 'GPS Autoset',
        value: 'GPS',
      },
    ],
    [],
  );

  const getNewLocationHandler = useCallback(() => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: true,
      authorizationLevel: 'auto',
      enableBackgroundLocationUpdates: 'true',
      locationProvider: 'auto',
    });
    Geolocation.getCurrentPosition(
      (pos: MapPosition) => {
        console.log(pos, 'hey');
        setCoordinates({
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude,
        });
      },
      (error: any) =>
        Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
        {
          enableHighAccuracy: true
        },
      // {}
    );
  }, [selectedId]);

  const locationFromFormHandler = useCallback(() => {
    if(!toRender || !locationData.latitude) return;
    console.log('locationFromHandler called');
    setCoordinates({
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    });
    console.log(locationData);
  }, [locationData, toRender]);

  const locationFromMapHandler = useCallback(() => {
    setIsMapModalOpen(true);
  }, [selectedId]);

  const radioButtonHandler = useCallback((id: string) => {
    if (id == '3') {
      getNewLocationHandler();
      console.log('radio button 1');
    } else if (id == '2') {
      //form
      locationFromFormHandler();
      console.log('radio buttons working');
    } else {
      locationFromMapHandler();
      console.log();
    }
  }, []);

  if (imageUri && toRender)
    return (
      <>
        <Modal
          visible={toRender}
          onRequestClose={() => closer()}
          animationType="fade"
          style={{
            backgroundColor: 'white',
            width: '100%',
            height: '100%',
          }}>
          <Image
            source={{uri: imageUri}}
            style={{
              padding: 10,
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
              marginRight: 5,
            }}></Image>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              bottom: 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                padding: 4,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextInput
                style={{
                  flex: 4,
                  borderRadius: 10,
                  padding: 6,
                  backgroundColor: 'white',
                  color: 'black',
                  borderColor:"grey",
                  borderWidth:1
                }}
                placeholderTextColor="#AAA"
                placeholder='Eg., Rice'
                value={cropName}
                onChange={(event) => {
                  setCropName(event.nativeEvent.text)
                  console.log(event.nativeEvent.text)
                }}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: 'lightgreen',
                  padding: 12,
                  marginLeft: 2,
                  borderRadius: 20,
                }}
                onPress={() => {
                  imageProcessing(imageUri, cropName, (coordinates.latitude), coordinates.longitude, username, landType, () => {
                    setLoading(true)
                    
                  })
                  .then((uri:any) => {
                    if(uri == null) return;
                    dispatch(addImage(uri));
                    setLoading(false);
                    closer();
                  })
                }}
                >
                <Text style={{color: 'red'}}>Apply</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'column',
                width: '100%',
                justifyContent: 'space-evenly',
                marginBottom: 4,
                backgroundColor: 'white',
                borderRadius: 20,
              }}>
              <Text
                // @ts-ignore
                style={{
                  color: 'black',
                  fontSize: 17,
                  fontWeight: 800,
                  textAlign: 'center',
                }}>
                Location Method:
              </Text>
              <RadioGroup
                layout="column"
                labelStyle={{
                  color: 'black',
                }}
                radioButtons={radioButtons}
                onPress={id => {
                  setSelectedId(id);
                  radioButtonHandler(id);
                  console.log('inside the radio buttons', id);
                }}
                selectedId={selectedId}
                containerStyle={{
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              />
            </View>
            <Text
              style={{
                backgroundColor: 'white',
                color: 'black',
                width: 'auto',
                textAlign: 'center',
              }}>
              Latitude: {coordinates?.latitude}
            </Text>
            <Text
              style={{
                backgroundColor: 'white',
                color: 'black',
                width: 'auto',
                textAlign: 'center',
              }}>
              Longitude: {coordinates?.longitude}
            </Text>
            <Modal visible={isMapModalOpen}>
              <MapChooseLocation
                handler={(longitude, latitude) => {
                  setCoordinates({
                    longitude: longitude,
                    latitude: latitude,
                  });
                  setIsMapModalOpen(false);
                }}
                closer={() => {
                  setIsMapModalOpen(false);
                }}
              />
            </Modal>
          </View>
        </Modal>
            <Modal visible={loading} style={{
              width: "100%",
              height: "100%",
              backgroundColor:"white",
              zIndex: 10,
              position: "absolute",
              flexDirection:"column",
              alignItems: "center",
              justifyContent:"center"
            }}
            >
              <View style={{
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center",
                width:"100%",
                height:"100%",
              }}>

            <ActivityIndicator style={{
              height:100,
              width:100,
              flex:1
            }}
            color={"lightgreen"}
            size={"large"}
            />
            <Text 
            // @ts-ignore
            style={{
              color:"black",
              // width:"100%",
              fontSize:18,
              fontWeight:700,
              flex:3,
              // textAlign:"center"
            }}>Applying the tag...</Text>
            </View>
            </Modal>
      </>
    );
  else return null;
}
