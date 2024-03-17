import { Pressable, TouchableOpacity, Text, View } from "react-native";
import Button from "./Button";
import { ScrollView } from "react-native-gesture-handler";
import SmallDrawer from "./SmallDrawer";
import { useSelector } from "react-redux";
import { selectWaterSourceType } from "../features/DataCollectionSlice";
// import { TouchableOpacity } from "react-native-gesture-handler";

export default function HomeScreen({ navigation }: {
    navigation: any
  }) {
    const waterSource = useSelector(selectWaterSourceType);
    console.log(waterSource)
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
                    value: 0,
                    title: "Not Synced"
                }
            ]}></SmallDrawer>
      </ScrollView>
    );
  }