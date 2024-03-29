import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Button from '../Button';
import {useCallback, useRef, useState} from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import CustomModal from '../CustomModal';
import {
  selectLandCoverType,
  setIsCapturedCCE,
  setLandCoverType,
} from '../../features/DataCollectionSlice';
import {useDispatch, useSelector} from 'react-redux';
import CropInformation from './CropInformation';
import {landData} from '../../data';
import FormCameraHandle from '../FormCameraHandle';
import {
  clearLocation,
  selectLocation,
  setLocation,
} from '../../features/LocationSlice';
import MapChooseLocation from '../MapChooseLocation';
import Geolocation from '@react-native-community/geolocation';
import CCE from './CCE';
import Location from './Location';
import LocationOffset from './LocationOffset';
import Description from './Description';
import QualityControl from './QualityControl';

export default function ({navigation}: {navigation: any}) {
  const locationData = useSelector(selectLocation);
  const [isCaptureCCE, setIsCaptureCCE] = useState(false);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const landCoverType = useSelector(selectLandCoverType);
  return (
    <>
      <ScrollView ref={scrollRef}>
        <View
          style={{
            marginTop: 5,
            flexDirection: 'column',
            // marginHorizontal: 20,
          }}>
          {/* The Location Section */}
          <Location />
          {/* Location Offset section */}
          <LocationOffset />
          {/* The location class section */}
          <View
            style={{
              marginTop: 15,
              flexDirection: 'column',
              // marginHorizontal: 20,
            }}>
            <Text
              style={{
                color: 'black',
                backgroundColor: '#888484',
                padding: 5,
                marginHorizontal: 20,
              }}>
              Location Class
            </Text>
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
                Land Cover Type:
              </Text>
              <CustomModal
                data={landData}
                action={payload =>
                  dispatch(setLandCoverType(payload))
                }></CustomModal>
            </View>
          </View>

          {landCoverType == 'Cropland' ? <CropInformation /> : null}

          {/* CCE */}
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              // marginHorizontal: 20,
            }}>
            <Text
              style={{
                flex: 4,
                color: 'black',
                backgroundColor: '#888484',
                padding: 5,
                marginLeft: 20,
              }}>
              {isCaptureCCE?"CCE Parameters": "Capture CCE?"}
            </Text>
            <Switch
              trackColor={{false: '#767577', true: 'pink'}}
              thumbColor={isCaptureCCE ? 'violet' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                setIsCaptureCCE(t => {
                  dispatch(setIsCapturedCCE(!t))
                  return !t
                })
              }}
              value={isCaptureCCE}
              style={{
                marginRight: 20,
              }}
            />
          </View>
            {isCaptureCCE ? <CCE /> : null}
            <Description />

            {/* Photo Section */}
            <View
            style={{
              marginTop: 15,
              flexDirection: 'column',
              // marginHorizontal: 20,
            }}>
            <Text
              style={{
                color: 'black',
                backgroundColor: '#888484',
                padding: 5,
                marginHorizontal: 20,
              }}>
              Photo 
            </Text>
          <FormCameraHandle />
          </View>
          <View
            style={{
              marginTop: 15,
              flexDirection: 'column',
              // marginHorizontal: 20,
            }}>
            <Text
              style={{
                color: 'black',
                backgroundColor: '#888484',
                padding: 5,
                marginHorizontal: 20,
              }}>
              Quality Control
            </Text>
          </View>
          <QualityControl navigation={navigation} scrollRef={scrollRef}></QualityControl>
        </View>
      </ScrollView>
    </>
  );
}
