import { Text, View } from "react-native"
import CustomModal from "../CustomModal2"
import { cropsData, seasonData } from "../../data"
import { useDispatch } from "react-redux"
import { setPrimaryCrop, setPrimarySeason, setSecondaryCrop, setSecondarySeason } from "../../features/DataCollectionSlice";
import CustomModalWithTextBox from "../CustomModalWithTextBox";

export default function(){
    const dispatch = useDispatch();

    return (<>
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
            Primary Crop (Kharif Crop)
          </Text>
            <CustomModal
            data={seasonData}
            action={payload => dispatch(setPrimarySeason(payload))}
            ></CustomModal>
            <CustomModalWithTextBox
            data={cropsData}
            action={payload => dispatch(setPrimaryCrop(payload))}
            ></CustomModalWithTextBox>
          {/* <CustomModal
            data={cropsData}
            action={payload => dispatch(setPrimaryCrop(payload))}></CustomModal> */}
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
            Secondary Crop (Rabi Season)
          </Text>

            <CustomModal
            data={seasonData}
            action={payload => {
                dispatch(setSecondarySeason(payload))
            }}
            ></CustomModal>
            <CustomModalWithTextBox
            data={cropsData}
            action={payload => {
                dispatch(setSecondaryCrop(payload))
            }}
            ></CustomModalWithTextBox>
          {/* <CustomModal
            data={cropsData}
            action={payload =>{
              dispatch(setSecondaryCrop(payload))
              console.log(payload)
            }
            }></CustomModal> */}
        </View>
    </>)
}