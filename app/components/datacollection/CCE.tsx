import { useState } from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import CustomDatePicker from '../CustomDatePicker';





export default function () {
  const [sowDate, setSowDate] = useState(new Date());
  const [harvestDate, setHarvestDate] = useState(new Date());

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
          Sample Size (in metre):
        </Text>
        <TextInput
          allowFontScaling={true}
          blurOnSubmit={true}
          autoFocus={true}
          inputMode="decimal"
          style={{
            backgroundColor: 'white',
            flex: 1,
            paddingHorizontal: 10,
            color:"black",
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
            color:"black",
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
          Bio-Mass Weight (in kilograms):
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
            color:"black",
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
            color: "black",
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
          Sowing Date:
        </Text>
        <CustomDatePicker date={sowDate} setDate={setSowDate}/>
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
        <CustomDatePicker date={harvestDate} setDate={setHarvestDate}/>
      </View>
    </>
  );
}
