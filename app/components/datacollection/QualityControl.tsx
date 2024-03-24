import {Button, Image, Text, View} from 'react-native';
import {saveToLocalStorage, storage} from '../../localStorage';
import store from '../../store';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    resetState,
  selectDataCollection,
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
  const [CCECaptured, setCCECaptured] = useState(false);
  const locationData = useSelector(selectLocation);
const dispatch = useDispatch();
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
        dataCollectionData.cropInformation.isCaptured == true &&
        dataCollectionData.cropInformation.waterSource != null &&
        dataCollectionData.cropInformation.cropIntensity != null &&
        dataCollectionData.cropInformation.primaryCrop != null &&
        dataCollectionData.cropInformation.secondaryCrop != null &&
        dataCollectionData.cropInformation.liveStock != null &&
        dataCollectionData.cropInformation.croppingPattern != null;
      //checking the list of seasons
      setCropInformationCaptured(cropLandCondition);
      console.log(cropInformationCaptured, "crop")
    }

    if (dataCollectionData.CCE.isCaptured == true) {
      let CCECondition =
        dataCollectionData.CCE.sampleSize != null &&
        dataCollectionData.CCE.grainWeight != null &&
        dataCollectionData.CCE.biomassWeight != null &&
        dataCollectionData.CCE.cultivar != null &&
        dataCollectionData.CCE.sowDate != null &&
        dataCollectionData.CCE.harvestDate != null;
        setCCECaptured(CCECondition);
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
      {dataCollectionData.CCE.isCaptured == true ? (
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
            saveToLocalStorageHandler()
            dispatch(resetState());
            rerender()
            navigation.goBack();
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
