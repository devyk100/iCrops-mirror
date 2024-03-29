import {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { selectResetter } from '../features/LocationSlice';

type dataType = {
  value: number;
  title: string;
};

export default function ({
  data,
  action,
}: {
  data: dataType[];
  action: (payload: any) => any;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState(1);
  const [newCropToBeAdded, setNewCropToBeAdded] = useState(false);
  const [newCropValue, setNewCropValue] = useState<string>('');
  const resetterValue = useSelector(selectResetter);
    useEffect(() => {
      setModalValue(1)
      console.log(resetterValue)
    }, [resetterValue])
  return (
    <>
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
            padding: 10,
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
              borderRadius: 40,
            }}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text
              style={{
                color: 'black',
              }}>
              Close
            </Text>
          </TouchableOpacity>
          <ScrollView
            style={{
              width: '65%',
              margin: 10,
            }}>
              {newCropToBeAdded ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    style={{
                      padding: 5,
                      margin: 5,
                      fontSize: 18,
                      borderBottomWidth: 1,
                      borderBottomColor: 'green',
                      flex: 3,
                      color: "blue"
                    }}
                    value={newCropValue}
                    onChangeText={setNewCropValue}></TextInput>
                  <Button
                    title="done"
                    color={'grey'}
                    onPress={() => {
                      action(newCropValue);
                      setModalVisible(t => !t);
                    }}></Button>
                </View>
              ) : null}
  
              {!newCropToBeAdded ? (
                <TouchableOpacity
                  onPress={e => {
                    setNewCropToBeAdded(true);
                  }}
                  style={{
                    // padding: 5,
                    // margin: 5,
                    // borderBottomWidth: 1,
                    // borderBottomColor: 'grey',
                    backgroundColor: "lightgreen",
                    alignItems:"center",
                    borderRadius: 25,
                    padding: 10,
                    flexDirection: "row"
                  }}>
                  <Text
                    // @ts-ignore
                    style={{color: 'black',flex:6, textAlign:"center", fontSize: 18}}>
                    Add crop
                  </Text>
                  <Text 
                  //@ts-ignore
                  style={{
                    fontSize:20,
                    fontWeight:1000
                  }}>+</Text>
                </TouchableOpacity>
              ) : null}
            {data.map((value: any) => {
              return (
                <TouchableOpacity
                  onPress={e => {
                    setModalValue(value.value);
                    setModalVisible(t => !t);
                    action(value.title);
                  }}
                  key={value.title}
                  style={{
                    padding: 5,
                    margin: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: 'grey',
                  }}>
                  {modalValue != value.value ? (
                    <Text style={{color: 'black', fontSize: 18}}>
                      {value.title}
                    </Text>
                  ) : (
                    <Text style={{color: 'blue', fontSize: 18}}>
                      {value.title}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
      {/* <TouchableOpacity
                style={{
                  backgroundColor: '#d4d4d4',
                  padding: 10,
                  marginTop: 0,
                }}
                onPress={() => setModalVisible(t => !t)}>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  {data[modalValue-1]?.title}
                </Text>
              </TouchableOpacity> */}
      <View
        style={{
        //   marginHorizontal: 3,
          flexDirection: 'column',
        //   alignItems: 'center',
          flex: 5
        }}>
        <Button
          title={
            newCropValue == '' ? data[modalValue - 1]?.title : newCropValue
          }
          onPress={() => setModalVisible(t => !t)}
          color={'green'}></Button>
        <Text
          style={{
            color: 'black',
            fontSize: 12,
          }}>
          Select Crop
        </Text>
      </View>
    </>
  );
}
