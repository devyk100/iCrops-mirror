import {useEffect, useState} from 'react';
import {
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
import {addImage} from '../features/DataCollectionSlice';
import { LatLng } from 'react-native-maps';
import { selectLocation } from '../features/LocationSlice';
import MapChooseLocation from './MapChooseLocation';

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
  const landType = 'cropland';
  const cropName = 'rice'; // or null

  const [currentImageUri, setCurrentImageUri] = useState(imageUri);
  const [isRendered, setIsRendered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const locationData = useSelector(selectLocation);

  const [coordinates, setCoordinates] = useState<LatLng>();
  // const [cropName, setCropName] = useState<string | null>(null);
  // const dispatch = useDispatch();
  // async function executer(mode: string) {
  //   if(mode == "form"){
  //     //access the redux state and fix it through that.
  //     setCoordinates({
  //       longitude: locationData.longitude,
  //       latitude: locationData.latitude
  //     })
  //   }
  //   else if(mode == "map"){
  //     // open up the map, and pass in a suitable handler, and dont set the coordinates here, it'll be set by the handler of the map, just open the map suitably
  //   }
  //   else{
  //     //directly take them from the coordinates I passed into this component.
  //   }
  //   const options = {
  //     // background image
  //     backgroundImage: {
  //       src: {uri: imageUri},
  //       scale: 1,
  //     },
  //     watermarkTexts: [
  //       {
  //         text: cropName
  //           ? `Latitude: ${latitude} \nLatitude: ${longitude}\nCrop: ${cropName}\nBy ${username}\n${new Date()}`
  //           : `Latitude: ${latitude} \nLatitude: ${longitude}\nBy ${username}\n${new Date()}`,
  //         position: {
  //           position: Position.topLeft,
  //         },
  //         style: {
  //           color: '#ffffff',
  //           fontSize: 20,
  //           fontName: 'Arial',
  //           shadowStyle: {
  //             dx: 0,
  //             dy: 0,
  //             radius: 15,
  //             color: '#000000',
  //           },
  //           textBackgroundStyle: {
  //             padding: '0% 1%',
  //             type: TextBackgroundType.none,
  //             color: '#000000',
  //           },
  //         },
  //       },
  //     ],
  //     scale: 1,
  //     quality: 100,
  //     filename: cropName
  //       ? `${landType} crop: ${cropName} by ${username}`
  //       : `${landType} by ${username}`,
  //     saveFormat: ImageFormat.png,
  //   };
  //   const permimssionPass = await hasAndroidPermission();
  //   console.log(permimssionPass);
  //   const path = await Marker.markText(options);
  //   const resUri = 'file:' + path;
  //   const newUri = await CameraRoll.saveAsset(resUri, {
  //     type: 'auto',
  //     album: 'geotagged photos',
  //   });
  //   setCurrentImageUri(newUri.node.image.uri);
  //   dispatch(addImage(newUri.node.image.uri));
  //   setIsModalOpen(false);
  //   closer() // sets the toRender to false from the parent component
  // }
  useEffect(() => {
    console.log("mounted")
  })
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
              width:"100%",
              bottom:0
            }}>
            <View style={{
              flexDirection:"row",
              width:"100%",
              padding:4,
              alignItems:"center",
              justifyContent:"center"
            }}>
              <TextInput style={{
                flex:4,
                borderRadius:10,
                padding:6,
                backgroundColor:"white",
                color:"black"
              }} value={'something'} />
              <TouchableOpacity style={{
                backgroundColor:"lightgreen",
                padding:12,
                marginLeft:2,
                borderRadius:20
              }}>
                <Text style={{color: 'red'}}>Set Crop</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width:"100%",
                justifyContent:"space-evenly",
                marginBottom:2
                
              }}>
              <TouchableOpacity style={{backgroundColor:'lightblue', padding:10, borderRadius:10}}>
                <Text style={{color: 'red'}}>Set from Map</Text>
              </TouchableOpacity>
              <Modal style={{height: "100%", width:"100%", backgroundColor:"white"}} visible={false}>
                <MapChooseLocation closer={() => {
                  //handle this modal close
                }} handler={(latitude, longitude) => {
                  //set this in the coordinate, and close the map, and process the image
                }}></MapChooseLocation>
              </Modal>
              <TouchableOpacity style={{backgroundColor:'lightblue', padding:10, borderRadius:10}}>
                <Text style={{color: 'red'}}>GPS Autoset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor:'lightblue', padding:10, borderRadius:10}}>
                <Text style={{color: 'red'}}>Set from form</Text>
              </TouchableOpacity>
            </View>
            <Text style={{
              backgroundColor:"white",
              color:"black",
              width:"auto",
              textAlign:"center"
            }}>Latitude: {}</Text>
            <Text style={{
              backgroundColor:"white",
              color:"black",
              width:"auto",
              textAlign:"center"
            }}>Longitude: {}</Text>
          </View>
        </Modal>
      </>
    );
  else return null;
}
