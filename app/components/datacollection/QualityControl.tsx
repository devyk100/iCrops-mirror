import {Alert, Button, Image, Text, View} from 'react-native';
import {saveToLocalStorage, storage} from '../../localStorage';
import store from '../../store';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    resetState,
  selectDataCollection,
  selectIsCCECaptured,
  selectIsCCEGoingToBeCaptured,
  setLandCoverType,
  setLocationData,
} from '../../features/DataCollectionSlice';
// @ts-ignore
import CorrectIcon from './../../assets/correct-icon.png';
// @ts-ignore
import WrongIcon from './../../assets/wrong-icon.png';
import { selectLocation } from '../../features/LocationSlice';
function CorrectWrongIcon({
  isCorrect,
}: {
  isCorrect: boolean;
}): React.JSX.Element {
  return (
    <Image
      source={isCorrect ? CorrectIcon : WrongIcon}
      style={{
        height: 30,
        width: 30,
      }}
    />
  );
}
export default function ({navigation, rerender} : {navigation: any;
    rerender: ()=>void
}) {
  const dataCollectionData = useSelector(selectDataCollection);
  const [isSavable, setIsSavable] = useState(false);
  const [photoCaptured, setPhotoCaptured] = useState(false);
  const [locationCaptured, setLocationCaptured] = useState(false);
  const [bearingToCenterCaptured, setBearingToCenterCaptured] = useState(false);
  const [distanceToCenterCaptured, setDistanceToCenterCaptured] =
    useState(false);
  const [landCoverTypeCaptured, setLandCoverTypeCaptured] = useState(false);
  const [cropInformationCaptured, setCropInformationCaptured] = useState(false);
  const CCECaptured = useSelector(selectIsCCECaptured)

  const CCEGonnaBeCaptured = useSelector(selectIsCCEGoingToBeCaptured)
  // const [CCECaptured, setCCECaptured] = useState(false);
  const locationData = useSelector(selectLocation);
const dispatch = useDispatch();

useEffect(() => {
    if(CCEGonnaBeCaptured){
      if(dataCollectionData.landCoverType == "Cropland"){
        setIsSavable(bearingToCenterCaptured && distanceToCenterCaptured && landCoverTypeCaptured && CCECaptured && cropInformationCaptured)
      }
      else{
        setIsSavable(bearingToCenterCaptured && distanceToCenterCaptured && landCoverTypeCaptured &&  CCECaptured);
      }
    }
    else{
      if(dataCollectionData.landCoverType == "Cropland"){
        setIsSavable(bearingToCenterCaptured && distanceToCenterCaptured && landCoverTypeCaptured && cropInformationCaptured)
      }
      else{
        setIsSavable(bearingToCenterCaptured && distanceToCenterCaptured && landCoverTypeCaptured);
      }

    }
}, [bearingToCenterCaptured, locationCaptured, distanceToCenterCaptured, landCoverTypeCaptured, cropInformationCaptured, CCECaptured, CCEGonnaBeCaptured, dataCollectionData])

useEffect(() => {
    dispatch(setLocationData(locationData));
}, [locationData])


  useEffect(() => {
    setLocationCaptured(
      dataCollectionData.latitude != null &&
        dataCollectionData.accuracyCorrection != null,
    );
    setDistanceToCenterCaptured(dataCollectionData.distanceToCenter != null)
    setBearingToCenterCaptured(dataCollectionData.bearingToCenter != null);
    setLandCoverTypeCaptured(dataCollectionData.landCoverType != null);
    
    if (dataCollectionData.landCoverType == 'Cropland') {
      let cropLandCondition =
        // dataCollectionData.cropInformation.isCaptured == true && // set this sometime
        dataCollectionData.cropInformation.waterSource != null &&
        dataCollectionData.cropInformation.cropIntensity != null &&
        dataCollectionData.cropInformation.primarySeason.cropName != null &&
        dataCollectionData.cropInformation.secondarySeason.cropName != null &&
        dataCollectionData.cropInformation.liveStock != null &&
        dataCollectionData.cropInformation.croppingPattern != null;
      setCropInformationCaptured(cropLandCondition);
      console.log(cropLandCondition, "crop")
    }

    setPhotoCaptured(dataCollectionData.images?.length >= 2);
  }, [dataCollectionData]);
  const saveToLocalStorageHandler = useCallback(() => {
    saveToLocalStorage(dataCollectionData);
  }, [dataCollectionData]);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingHorizontal: 25,
          padding: 4,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
          }}>
          Capture a photo of the area
        </Text>
        <CorrectWrongIcon isCorrect={photoCaptured} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingHorizontal: 25,
          padding: 4,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
          }}>
          Collect sufficient GPS points
        </Text>
        <CorrectWrongIcon isCorrect={locationCaptured} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingHorizontal: 25,
          padding: 4,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
          }}>
          Captured bearing to center
        </Text>
        <CorrectWrongIcon isCorrect={bearingToCenterCaptured} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingHorizontal: 25,
          padding: 4,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
          }}>
          Captured distance to center
        </Text>
        <CorrectWrongIcon isCorrect={distanceToCenterCaptured} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingHorizontal: 25,
          padding: 4,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
          }}>
          Land cover type captured
        </Text>
        <CorrectWrongIcon isCorrect={landCoverTypeCaptured} />
      </View>
      {dataCollectionData.landCoverType == 'Cropland' ? (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: 25,
            padding: 4,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'black',
            }}>
            Crop information captured
          </Text>
          <CorrectWrongIcon isCorrect={cropInformationCaptured} />
        </View>
      ) : null}
      {CCEGonnaBeCaptured == true ? (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: 25,
            padding: 4,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'black',
            }}>
            CCE captured
          </Text>
          <CorrectWrongIcon isCorrect={CCECaptured} />
        </View>
      ) : (
        false
      )}

      <View
        style={{
          marginHorizontal: 25,
          margin:5
        }}>
        <Button title="submit" onPress={() => {
          if(isSavable){
            saveToLocalStorageHandler()
            dispatch(resetState());
            rerender()
            navigation.goBack();
          }
          else{
            Alert.alert("Make sure you have filled the entries properly", "Make sure to fill all the important fields before saving")
          }
        }}></Button>
      </View>
      <View
        style={{
          marginHorizontal: 25,
          margin:5
        }}>
        <Button title="Cancel" onPress={() => {
            dispatch(resetState())
            rerender();
            console.log(storage.getAllKeys())
            navigation.goBack()
        }}></Button>
      </View>
    </>
  );
}
