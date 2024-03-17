import {
  Text,
  BackHandler,
  Modal,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {useCallback, useEffect, useRef, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {addImage, removeImage, selectImagesList} from '../features/DataCollectionSlice';
import {ScrollView} from 'react-native-gesture-handler';

export default function () {
  const imageList = useSelector(selectImagesList);
  const dispatch = useDispatch();
  // const [imageUri, setImageUri] = useState("file:///data/user/0/com.icrops/cache/rn_image_picker_lib_temp_803e2e1a-f692-42ab-800b-9c828e869acb.jpg");
  const openGallery = useCallback(async () => {
    const result = await launchImageLibrary(
      {mediaType: 'photo'},
      (res: any) => {
        try {
          dispatch(addImage(res.assets[0].uri));
        } catch (e) {
          console.log('Image saving rejected');
        }
      },
    );
    console.log(result);
  }, []);
  const openCamera = useCallback(async () => {
    const result = await launchCamera({mediaType: 'photo'}, (res: any) => {
      try {
        dispatch(addImage(res.assets[0].uri));
      } catch (e) {
        console.log('Image saving rejected');
      }
    });
  }, []);
  return (
    <>
      <View
        style={{
          marginTop: 10,
        }}>
        <ScrollView horizontal={true}>
          {imageList.map((value: string) => {
            if (value == 'null') return null;
            return (
              <View>
                <Image
                  source={{uri: value}}
                  style={{
                    width: 150, // Adjust width as needed
                    height: 150, // Adjust height as needed
                    resizeMode: 'contain', // You can adjust resizeMode as per your requirement
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
                    Alert.alert('Are you sure you want to delete this image?', "Once deleted you can't recover it.", [
                        {
                          text: 'Cancel',
                          onPress: () => {console.log("delete operation canceled.")}
                        //   style: 'cancel',
                        },
                        {text: 'OK', onPress: () => dispatch(removeImage(value))},
                      ]);
                  }}
                  >
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
            width: '100%',
            flexDirection: 'row',
            paddingHorizontal: 20,
            marginVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
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
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              openGallery();
            }}
            style={{
              flex: 1,
              backgroundColor: 'grey',
              padding: 10,
              borderRadius: 20,
            }}>
            <Text>Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
