import { Slider } from "@miblanchard/react-native-slider";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function(){

  const [distanceToCenter, setDistanceToCenter] = useState(70);
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
                Bearing to Center:
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#d4d4d4',
                  padding: 10,
                  marginTop: 0,
                }}>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  CAPTURE
                </Text>
              </TouchableOpacity>
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
                onValueChange={value => setDistanceToCenter(value)}
                containerStyle={{
                  marginHorizontal: 20,
                }}
              />
            </View>
          </View>
        </>
    )
}