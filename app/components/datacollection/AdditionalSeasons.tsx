import {Button, Modal, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import CustomModal from '../CustomModal';
import {cropsData, seasonData} from '../../data';
import {useDispatch, useSelector} from 'react-redux';
import {addSeason, deleteSeason, selectAdditionalSeasons, setCropForAdditionalSeason} from '../../features/DataCollectionSlice';
import { useState } from 'react';

export default function () {
  const dispatch = useDispatch();
  const additionalSeasonsMapping = useSelector(selectAdditionalSeasons);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState(1);
  return (
    <>
      <View style={{borderRadius: 20, marginHorizontal: 25, margin: 5}}>

        <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                //   Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: '100%',
                    padding:10,
                    borderTopColor: 'red',
                    borderTopWidth: 3,
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      flex: 1,
                      backgroundColor: 'grey',
                      height: 40,
                      borderRadius:40
                      
                    }}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={{
                      color:"black"
                    }}>Close</Text>
                  </TouchableOpacity>
                  <ScrollView
                    style={{
                      width:"65%",
                      margin: 10,
                    }}>
                        {
                            seasonData.map((value: any) => {
                                return (
                                <TouchableOpacity onPress={(e) => {
                                    setModalValue(value.value)
                                    setModalVisible(t => !t)
                                    dispatch(addSeason(value.title))
                                }} key={value.title} style={{
                                    padding:5,
                                    margin:5,
                                    borderBottomWidth:1,
                                    borderBottomColor: "grey"
                                }}>
                                    {modalValue != value.value ? <Text style={{color:"black", fontSize:18}}>{value.title}</Text> : <Text style={{color:"blue", fontSize:18}}>{value.title}</Text>}
                                </TouchableOpacity>
                                )
                            })
                        }
                  </ScrollView>
                </View>
              </Modal>
              <Button title={"Add seasons"} color={"green"} onPress={() => setModalVisible(t => !t)}></Button>
      </View>
      {additionalSeasonsMapping.map((value:any, index:number) => {
        if(value.name == null) return null;
        
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
                {value.name}
              </Text>
              <CustomModal
                data={cropsData}
                action={payload => {dispatch(setCropForAdditionalSeason({
                  index: index,
                  crop: payload
                }))
                console.log(payload, "additional season", index);
              }
                }></CustomModal>
                <Button title='-' color={"red"} onPress={() => {
                    dispatch(deleteSeason(index))
                }}>
                </Button>
            </View>
          </>
        );
      })}
    </>
  );
}
