import {
  Text,
  BackHandler,
  Modal,
  View,
  TouchableOpacity,
  Image,
  Alert,
  PermissionsAndroid,
  Button,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {useCallback, useEffect, useRef, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  addImage,
  removeImage,
  selectDataCollection,
  selectImagesList,
  selectLandCoverType,
  selectPrimaryCrop,
  selectSecondaryCrop,
} from '../features/DataCollectionSlice';
import {ScrollView} from 'react-native-gesture-handler';
import Marker, {
  ImageFormat,
  Position,
  TextBackgroundType,
} from 'react-native-image-marker';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {
  clearLocation,
  selectLocation,
  setLocation,
} from '../features/LocationSlice';

async function hasAndroidPermission() {
  const getCheckPermissionPromise = () => {
    // @ts-ignore
    if (Platform.Version >= 30) {
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

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'The app needs the permissions to access your camera',
        message:
          'The camera permission is required to be able to click the photo ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const imageProcessing = async (
  imageUri: string,
  primaryCrop: string,
  secondaryCrop: string,
  latitude: number,
  longitude: number,
  username: string,
  landType: string,
  completedTask: (newUri: string) => void,
) => {
  // if (!cropName || cropName == '') {
  //   Alert.alert(
  //     'Enter the crop name',
  //     "Type 0 to confirm if there's no crop to put in the field",
  //   );
  //   return null;
  // }
  // console.log(cropDetails);
  console.log('inside of image processor');
  // let finalCropsNamesString = "";
  if (landType == 'Cropland') {
    primaryCrop = primaryCrop.trim();
    secondaryCrop = secondaryCrop.trim();
  }
  // for(let a of cropDetails){
  //   finalCropsNamesString += `${a.name}:${a.crop}, `;
  // }
  // finalCropsNamesString = finalCropsNamesString.substring(0, finalCropsNamesString.length - 2);

  const options = {
    // background image
    backgroundImage: {
      src: {uri: imageUri},
      scale: 1,
    },
    watermarkTexts: [
      {
        text:
          landType == 'Cropland'
            ? `Latitude: ${latitude} \nLatitude: ${longitude}\nSeason 1: ${primaryCrop}\nSeason 2: ${secondaryCrop}\n${new Date()}`
            : `Latitude: ${latitude} \nLatitude: ${longitude}\nLand Cover Type: ${landType}\n${new Date()}`,
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
    filename: `${username}-${landType}-${new Date()}`,
    saveFormat: ImageFormat.png,
  };
  const permimssionPass = await hasAndroidPermission();
  console.log(permimssionPass);
  const path = await Marker.markText(options);
  const resUri = 'file:' + path;
  const newUri = await CameraRoll.saveAsset(resUri, {
    type: 'auto',
    album: 'geotagged photos',
  });
  completedTask(newUri.node.image.uri);
};
export default function () {
  const imageList = useSelector(selectImagesList);
  const dispatch = useDispatch();
  const locationData = useSelector(selectLocation);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const landCoverType = useSelector(selectLandCoverType);
  const wholeData = useSelector(selectDataCollection);
  const primaryCrop = useSelector(selectPrimaryCrop);
  const secondaryCrop = useSelector(selectSecondaryCrop);
  //retrieve the actual username from here
  const username = 'dummy';
  useEffect(() => {
    console.log(locationData);
  }, [locationData, username, landCoverType]);
  const openCamera = useCallback(async () => {
    if (!locationData.latitude || !landCoverType) {
      Alert.alert(
        'Fill the previous fields of location beforehand',
        "Make sure you've filled land cover type, crop name(if applicable), and you've captured the location.",
      );
      return;
    }
    await requestCameraPermission();
    if (
      landCoverType == 'Cropland' &&
      (primaryCrop == null || secondaryCrop == null)
    ) {
      Alert.alert("the crops weren't set");
      return null;
    }
    if (!locationData.latitude) {
      Alert.alert(
        "The location wasn't set, please set it.",
        'Set the location',
      );
      return null;
    }
    const result = await launchCamera({mediaType: 'photo'}, (res: any) => {
      // let cropDetails:Object[] = []
      // if(wholeData.landCoverType == "Cropland"){
      //   console.log(wholeData)
      //   cropDetails.push({
      //     name: "Primary Crop",
      //     crop: wholeData.cropInformation.primaryCrop
      //   })
      //   cropDetails.push({
      //     name: "Secondary Crop",
      //     crop: wholeData.cropInformation.secondaryCrop
      //   })
      //   cropDetails = [...cropDetails, ...(wholeData.cropInformation.additionalSeasons.filter((value: any) => {
      //     if(value.name == null) return false;
      //     return true;
      //   }))];
      // }
      try {
        console.log(locationData);

        imageProcessing(
          res.assets[0].uri,
          primaryCrop,
          secondaryCrop,
          locationData.latitude,
          locationData.longitude,
          username,
          landCoverType,
          newUri => {
            setIsProcessingImage(false);
            dispatch(addImage(newUri));
          },
        );
        setIsProcessingImage(true);
      } catch (e) {
        console.log('Image saving rejected', e);
      }
    });
  }, [locationData, wholeData, username, landCoverType]);
  return (
    <>
      <View
        style={{
          marginTop: 10,
        }}>
        <ScrollView horizontal={true}>
          {imageList.map((value: string) => {
            if (value == null) return null;
            return (
              <View>
                <Image
                  source={{uri: value}}
                  style={{
                    width: 150,
                    height: 150,
                    resizeMode: 'contain',
                    marginRight: 5,
                  }}></Image>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    backgroundColor: 'white',
                    width: 20,
                    padding: 4,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    Alert.alert(
                      'Are you sure you want to delete this image?',
                      "Once deleted you can't recover it.",
                      [
                        {
                          text: 'Cancel',
                          onPress: () => {
                            console.log('delete operation canceled.');
                          },
                          //   style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () => dispatch(removeImage(value)),
                        },
                      ],
                    );
                  }}>
                  <Text
                    style={{color: 'red', width: '100%', textAlign: 'center'}}>
                    X
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            // paddingHorizontal: 20,
            // marginVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 7,
          }}>
          {/* <TouchableOpacity
            onPress={() => {
              openCamera();
            }}
            style={{
              flex: 3,
              marginRight: 2,
              backgroundColor: 'grey',
              padding: 10,
              borderRadius: 20,
            }}>
            <Text>TAKE PICTURE</Text>
          </TouchableOpacity> */}
          <Button
            title="Take Picture"
            onPress={() => {
              openCamera();
            }}></Button>

          {/* The processing modal */}
          <Modal
            visible={isProcessingImage}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'white',
              zIndex: 10,
              position: 'absolute',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}>
              <ActivityIndicator
                style={{
                  height: 100,
                  width: 100,
                  flex: 1,
                }}
                color={'lightgreen'}
                size={'large'}
              />
              <Text
                // @ts-ignore
                style={{
                  color: 'black',
                  // width:"100%",
                  fontSize: 18,
                  fontWeight: 700,
                  flex: 3,
                }}>
                Applying the tag...
              </Text>
            </View>
          </Modal>
        </View>
      </View>
    </>
  );
}
