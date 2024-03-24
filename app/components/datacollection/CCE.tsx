import {useEffect, useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import CustomDatePicker from '../CustomDatePicker';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectCCEData,
  setBiomassWeight,
  setCCECaptured,
  setCCEHarvestDate,
  setCCESowDate,
  setCultivar,
  setGrainWeight,
  setXSampleSize,
  setYSampleSize,
} from '../../features/DataCollectionSlice';

export default function () {
  const [sowDate, setSowDate] = useState(new Date());
  const [harvestDate, setHarvestDate] = useState(new Date());
  const dispatch = useDispatch();
  const CCEData: {
    isCaputred: boolean;
    sampleSize: {
      x: string;
      y: string;
    };
    grainWeight: string;
    biomassWeight: string;
    cultivar: string;
    sowDate: Date;
    harvestDate: Date;
  } = useSelector(selectCCEData);
  // being lazy in here, i am not propogating the changes in state indirectly, directly updating and fetching the redux state, i am sorry here.
  // if(CCEData == undefined) return null
  useEffect(() => {
    if (
      (CCEData.sampleSize.x != null) &&
      (CCEData.sampleSize.y != null) &&
      (CCEData.grainWeight != null) &&
      (CCEData.biomassWeight != null) &&
      (CCEData.cultivar != null) &&
      (CCEData.sowDate != null) &&
      (CCEData.harvestDate != null)
    ) {
      if (CCEData.isCaputred != true) {
        dispatch(setCCECaptured(true));
      }
    } else {
      dispatch(setCCECaptured(false));
    }
  }, [CCEData]);
  return (
    <>
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
          Sample Size (in metre X metre):
        </Text>
        <TextInput
          allowFontScaling={true}
          blurOnSubmit={true}
          autoFocus={true}
          inputMode="decimal"
          value={CCEData?.sampleSize.x}
          onChangeText={value => {
            dispatch(setXSampleSize(value));
          }}
          style={{
            backgroundColor: 'white',
            flex: 1,
            paddingHorizontal: 10,
            color: 'black',
            marginHorizontal: 5,
            borderWidth: 1,
            borderColor: 'grey',
            borderRadius: 14,
          }}></TextInput>
        <Text>X</Text>
        <TextInput
          allowFontScaling={true}
          blurOnSubmit={true}
          // autoFocus={true}
          inputMode="decimal"
          value={CCEData?.sampleSize.y}
          onChangeText={value => {
            dispatch(setYSampleSize(value));
          }}
          style={{
            backgroundColor: 'white',
            flex: 1,
            paddingHorizontal: 10,
            color: 'black',
            marginHorizontal: 5,
            borderWidth: 1,
            borderColor: 'grey',
            borderRadius: 14,
          }}></TextInput>
      </View>
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
          Grain Weight (in kilograms):
        </Text>

        <TextInput
          allowFontScaling={true}
          blurOnSubmit={true}
          inputMode="decimal"
          style={{
            backgroundColor: 'white',
            flex: 1,
            paddingHorizontal: 10,
            marginHorizontal: 5,
            borderWidth: 1,
            color: 'black',
            borderColor: 'grey',
            borderRadius: 14,
          }}
          value={CCEData.grainWeight}
          onChangeText={value => {
            dispatch(setGrainWeight(value));
          }}></TextInput>
      </View>
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
          Bio-Mass Weight (in kilograms):
        </Text>

        <TextInput
          allowFontScaling={true}
          blurOnSubmit={true}
          inputMode="decimal"
          value={CCEData.biomassWeight}
          onChangeText={value => {
            dispatch(setBiomassWeight(value));
          }}
          style={{
            backgroundColor: 'white',
            flex: 1,
            paddingHorizontal: 10,
            marginHorizontal: 5,
            borderWidth: 1,
            color: 'black',
            borderColor: 'grey',
            borderRadius: 14,
          }}></TextInput>
      </View>
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
          Cultivar:
        </Text>
        <TextInput
          allowFontScaling={true}
          blurOnSubmit={true}
          inputMode="text"
          style={{
            backgroundColor: 'white',
            flex: 3,
            paddingHorizontal: 10,
            marginHorizontal: 5,
            borderWidth: 1,
            color: 'black',
            borderColor: 'grey',
            borderRadius: 14,
          }}
          value={CCEData.cultivar}
          onChangeText={value => {
            dispatch(setCultivar(value));
          }}></TextInput>
      </View>
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
          Sowing Date:
        </Text>
        <CustomDatePicker
          date={sowDate}
          setDate={(date: Date) => {
            setSowDate(date);
            //also dispatch the state here, it is important for the redux state to stay null at first thats why
            dispatch(setCCESowDate(date.toString()));
          }}
        />
      </View>
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
          Harvest Date:
        </Text>
        <CustomDatePicker
          date={harvestDate}
          setDate={(date: Date) => {
            setHarvestDate(date);
            dispatch(setCCEHarvestDate(date.toString()));
          }}
        />
      </View>
    </>
  );
}
