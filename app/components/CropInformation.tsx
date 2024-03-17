import {Text, View} from 'react-native';
import CustomModal from './CustomModal';
import {cropIntensityData, cropsData, livestockData, waterSourceData} from '../data';
import {useDispatch} from 'react-redux';
import {setCropIntensity, setLandCoverType, setLiveStock, setPrimaryCrop, setSecondaryCrop, setWaterSource} from '../features/DataCollectionSlice';

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
            action={payload =>
              dispatch(setWaterSource(payload))
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
            Primary Crop
          </Text>

          <CustomModal
            data={cropsData}
            action={payload =>
              dispatch(setPrimaryCrop(payload))
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
            Secondary Crop
          </Text>

          <CustomModal
            data={cropsData}
            action={payload =>
              dispatch(setSecondaryCrop(payload))
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
            action={payload =>
              dispatch(setLiveStock(payload))
            }></CustomModal>
          
        </View>

      </View>
    </>
  );
}
