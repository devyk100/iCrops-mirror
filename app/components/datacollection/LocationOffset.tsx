import { Slider } from "@miblanchard/react-native-slider";
import { useCallback, useEffect, useState } from "react";
import { Button, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
// @ts-ignore
import CompassHeading from 'react-native-compass-heading';
import { useDispatch, useSelector } from "react-redux";
import { selectDegreesToNorth, setDegreesToNorth } from "../../features/LocationSlice";
import { hell, storage } from "../../localStorage";
import { selectCapturedFromMap, setBearingToCenterData, setDistanceToCenterData } from "../../features/DataCollectionSlice";
export default function(){

  const [distanceToCenter, setDistanceToCenter] = useState(70);

  const [bearingToCenter, setBearingToCenter] = useState<number | null>(null);
  // const [degreesToNorth, setDegreesToNorth] = useState(0);
  const degreesToNorth = useSelector(selectDegreesToNorth)
  const capturedFromMap = useSelector(selectCapturedFromMap);
  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Hold the phone steady for better accuracy',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };
  const findBearingToCenter = useCallback(() => {
    showToastWithGravityAndOffset()
    setTimeout(() => {
      setBearingToCenter(degreesToNorth)
      dispatch(setBearingToCenterData(degreesToNorth))
    }, 1750)
  }, [degreesToNorth])
  const dispatch = useDispatch();
  useEffect(() => {
    const degree_update_rate = 3;
    let timerId = setTimeout(() => console.log("testing"), 10);
    CompassHeading.start(degree_update_rate, ({heading, accuracy}: {
      heading: number;
      accuracy: number;
    }) => {
      // console.log('CompassHeading: ', heading, accuracy);
      // setDegreesToNorth(heading);
      // clearTimeout(timerId)
      // timerId = setTimeout(() => dispatch(setDegreesToNorth(heading)), 0);
      dispatch(setDegreesToNorth(heading))
    });
    
    
    return () => {
      CompassHeading.stop();
    };
  }, []);
  if(capturedFromMap) return null;
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
              Location Offset
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
                Bearing to Center: {bearingToCenter}
              </Text>
              {/* <TouchableOpacity
                style={{
                  backgroundColor: '#d4d4d4',
                  padding: 10,
                  marginTop: 4,
                }}>
                <Text
                  style={{
                    color: 'black',
                    // textAlign: 'center',
                  }}
                  onPress={() => findBearingToCenter()}
                  >
                  CAPTURE
                </Text>
              </TouchableOpacity> */}
              <Button title="Capture" onPress={() => findBearingToCenter()}></Button>
            </View>

            <View
              style={{
                flexDirection: 'column',
              }}>
              <Text
                style={{
                  color: 'black',
                  flex: 6,
                  marginHorizontal: 25,
                  marginTop: 10,
                  // padding:5
                }}>
                Distance to Center: {distanceToCenter} meters
              </Text>
              <Slider
                animateTransitions
                maximumValue={150}
                minimumValue={0}
                value={distanceToCenter}
                step={1}
                // @ts-ignore
                onValueChange={value => setDistanceToCenter(() => {
                  dispatch(setDistanceToCenterData(value))
                  return value
                })}
                containerStyle={{
                  marginHorizontal: 20,
                }}
              />
            </View>
          </View>
        </>
    )
}