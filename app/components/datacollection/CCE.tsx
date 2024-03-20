import { Text, View } from "react-native";
import CustomModal from "../CustomModal";

export default function(){
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
                Land Cover Type:
              </Text>
              {/* <CustomModal
                data={landData}
                action={payload =>
                  dispatch(setLandCoverType(payload))
                }></CustomModal> */}
            </View>
        </>
    )
}