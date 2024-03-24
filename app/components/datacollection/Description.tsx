import { Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { setLocationDescription } from "../../features/DataCollectionSlice";

export default function(){
  const dispatch = useDispatch()
    return (
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
              Description of location
            </Text>
        <TextInput style={{
            padding:10,
            margin:5,
            borderWidth:1,
            borderRadius:10,
            marginHorizontal:15,
            backgroundColor:"#eef7eb",
            color:"black",
            borderColor:"grey",
            fontSize:16,
            textAlignVertical:"top"
        }} multiline={true}
        onChangeText={(value) => {
            dispatch(setLocationDescription(value))
        }}
        numberOfLines={3}
        >

        </TextInput>
          </View>
    )
}