import { Pressable, TouchableOpacity, Text, View } from "react-native";
import Button from "./Button";
import { ScrollView } from "react-native-gesture-handler";
import SmallDrawer from "./SmallDrawer";
import { useSelector } from "react-redux";
import { selectWaterSourceType } from "../features/DataCollectionSlice";
import { useEffect, useState } from "react";
import { storage } from "../localStorage";
import { useMMKVListener } from "react-native-mmkv";
// import { TouchableOpacity } from "react-native-gesture-handler";

export default function HomeScreen({ navigation }: {
    navigation: any
  }) {

    // at any saving of the  data, and not the initial one.
    useMMKVListener((key) => {
      const keys = storage.getAllKeys()
      setUnsynced(storage.getNumber("counter") || 0)
      let obj = []
      for(let a of keys){
        obj.push(storage.getString(a));
      }
      setData(obj)
      console.log(`Value for "${key}" changed!`)
    })
    const waterSource = useSelector(selectWaterSourceType);
    console.log(waterSource)
    const [data, setData] = useState<any>([])
    const [unsynced, setUnsynced] = useState<any>();

    // at first mount
    useEffect(()=> {
      const keys = storage.getAllKeys()
      setUnsynced(storage.getNumber("counter") || 0)
      let obj = []
      for(let a of keys){
        obj.push(storage.getString(a));
      }
      setData(obj)
    }, [])
    // put this inside of the form
    return (
      <ScrollView style={{ flex: 1, flexDirection:"column", marginTop:10}}>
            <Button handler={() => navigation.navigate("datacollection")}>COLLECT DATA</Button>
            <Button>SYNC DATA</Button>
            <SmallDrawer title={"Sync Data"} data={[
                {
                    value: 0,
                    title: "Synced"
                },
                {
                    value: unsynced,
                    title: "Not Synced"
                }
            ]}></SmallDrawer>

              <Text style={{
                paddingHorizontal :25
              }}>

              Will be removed later, just for testing purposes:
              </Text>
              {data.map((value:any) => {
                return <ScrollView>
                  <Text style={{
                    margin:10,
                    padding:10,
                    color:"blue"
                  }}>{JSON.stringify(value)}</Text>
                </ScrollView>
              })}
            {/* </Text> */}
      </ScrollView>
    );
  }