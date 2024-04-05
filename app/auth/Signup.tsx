import {useCallback, useState} from 'react';
import {Alert, Button, ScrollView, Text, TextInput, View} from 'react-native';
import {BACKEND_URL} from '../networking';
import axios from 'axios';

export default function ({navigation}: {navigation:any}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [designation, setDesignation] = useState('');
  const [institute, setInstitute] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('');
  const signup = useCallback(async () => {
    if (
      email == '' ||
      password == '' ||
      designation == '' ||
      institute == '' ||
      province == '' ||
      country == ''
    ) {
      Alert.alert(
        'All credentials are required',
        'Do not leave any field empty',
      );
      return;
    }
    if (password.length < 8) {
      Alert.alert('The password must be a minimum of 8 characters');
      return;
    }

    try {
      const response = await axios.post(BACKEND_URL + 'api/v1/user/signup', {
        email: email,
        password: password,
        Designation: designation,
        Country: country,
        Institute: institute,
        Province: province,
      });
      if(response.data.success){
        Alert.alert("Signed Up successfully", "Now proceed to login");
        navigation.jumpTo("Login")
      }
      else{
        throw Error();
      }
    } catch {
      Alert.alert('Some error occured');
    }
  }, [email, password, designation, institute, province, country]);
  return (
    <>
      <ScrollView>
        <Text
          style={{
            fontSize: 24,
            flex: 1,
            textAlign: 'center',
            marginTop: 20,
          }}>
          Sign Up to the iCrops App
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              flex: 1,
              textAlign: 'left',
              width: '80%',
            }}>
            Email ID
          </Text>
          <TextInput
            style={{
              backgroundColor: 'white',
              borderBlockColor: 'grey',
              borderWidth: 1,
              width: '80%',
              borderRadius: 10,
              fontSize: 18,
            }}
            value={email}
            onChangeText={setEmail}></TextInput>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 6,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              flex: 1,
              textAlign: 'left',
              width: '80%',
            }}>
            Password
          </Text>
          <TextInput
            secureTextEntry={true}
            style={{
              backgroundColor: 'white',
              borderBlockColor: 'grey',
              borderWidth: 1,
              width: '80%',
              borderRadius: 10,
              fontSize: 18,
            }}
            value={password}
            onChangeText={setPassword}></TextInput>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 6,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              flex: 1,
              textAlign: 'left',
              width: '80%',
            }}>
            Designation
          </Text>
          <TextInput
            style={{
              backgroundColor: 'white',
              borderBlockColor: 'grey',
              borderWidth: 1,
              width: '80%',
              borderRadius: 10,
              fontSize: 18,
            }}
            value={designation}
            onChangeText={setDesignation}></TextInput>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 6,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              flex: 1,
              textAlign: 'left',
              width: '80%',
            }}>
            Institute
          </Text>
          <TextInput
            style={{
              backgroundColor: 'white',
              borderBlockColor: 'grey',
              borderWidth: 1,
              width: '80%',
              borderRadius: 10,
              fontSize: 18,
            }}
            value={institute}
            onChangeText={setInstitute}></TextInput>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 6,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              flex: 1,
              textAlign: 'left',
              width: '80%',
            }}>
            Province
          </Text>
          <TextInput
            style={{
              backgroundColor: 'white',
              borderBlockColor: 'grey',
              borderWidth: 1,
              width: '80%',
              borderRadius: 10,
              fontSize: 18,
            }}
            value={province}
            onChangeText={setProvince}></TextInput>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 6,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              flex: 1,
              textAlign: 'left',
              width: '80%',
            }}>
            Country
          </Text>
          <TextInput
            style={{
              backgroundColor: 'white',
              borderBlockColor: 'grey',
              borderWidth: 1,
              width: '80%',
              borderRadius: 10,
              fontSize: 18,
            }}
            value={country}
            onChangeText={setCountry}></TextInput>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginBottom: 10,
          }}>
          <View
            style={{
              width: '80%',
            }}>
            <Button onPress={() => signup()} title="Sign up"></Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
