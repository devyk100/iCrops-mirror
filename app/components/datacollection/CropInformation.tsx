import {Text, TextInput, View} from 'react-native';
import CustomModal from '../CustomModal';
import {
  cropGrowthStageData,
  cropIntensityData,
  croppingPatternData,
  cropsData,
  livestockData,
  waterSourceData,
} from '../../data';
import {useDispatch} from 'react-redux';
import {
  setCropGrowthStage,
  setCropIntensity,
  setCropRemarks,
  setCroppingPattern,
  setLandCoverType,
  setLiveStock,
  setPrimaryCrop,
  setSecondaryCrop,
  setWaterSource,
} from '../../features/DataCollectionSlice';
import SeasonSelection from './SeasonSelection';

export default function () {
  const dispatch = useDispatch();
  return (
    <>
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
          Crop Information
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
            Water Source
          </Text>
          <CustomModal
            data={waterSourceData}
            action={payload => dispatch(setWaterSource(payload))}></CustomModal>
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
            Crop Intensity
          </Text>

          <CustomModal
            data={cropIntensityData}
            action={payload =>
              dispatch(setCropIntensity(payload))
            }></CustomModal>
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
            Live Stock
          </Text>

          <CustomModal
            data={livestockData}
            action={payload => dispatch(setLiveStock(payload))}></CustomModal>
        </View>

            <SeasonSelection></SeasonSelection>

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
            Cropping Pattern
          </Text>

          <CustomModal
            data={croppingPatternData}
            action={payload =>
              dispatch(setCroppingPattern(payload))
            }></CustomModal>
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
            Crop Growth Stage
          </Text>

          <CustomModal
            data={cropGrowthStageData}
            action={payload =>
              dispatch(setCropGrowthStage(payload))
            }></CustomModal>
        </View>

        <View
          style={{
            flexDirection: 'column',
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
              textAlign: 'left',
              width: '100%',
              // padding:5
            }}>
            Remarks and notes:
          </Text>
          <TextInput multiline={true} numberOfLines={3} style={{
            backgroundColor:"#eef7eb",
            width:"100%",
            padding:10,
            textAlignVertical:"top",
            borderWidth:1,
            color:'black',
            borderColor:"grey",
            borderRadius:10,
            marginTop:5
          }}
          onChangeText={(value) => {
            dispatch(setCropRemarks(value))
          }}
          ></TextInput>
        </View>
      </View>
    </>
  );
}
