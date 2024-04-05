import axios from 'axios';
import {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Button,
  ScrollView,
  Text,
  TextInput,
  TextInputComponent,
  TextInputProps,
  View,
} from 'react-native';
import {BACKEND_URL} from '../networking';
import {useMMKVString} from 'react-native-mmkv';
import {setJwtEmail} from '../localStorage';

export default function () {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const submit = useCallback(async () => {
    const response = await axios.post(BACKEND_URL + 'api/v1/user/login', {
      email,
      password,
    });
    if (response.data.success)
      setJwtEmail(response.data.jwt, response.data.email);
    else {
      Alert.alert('Login failed, check the password and email id');
    }
  }, [email, password]);
  return (
    <>
      <ScrollView
        style={{
          flexDirection: 'column',
          // alignItems: "center",
          // justifyContent: "center"
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 24,
              padding: 20,
            }}>
            Login to iCrops App
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
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
            style={{
              backgroundColor: 'white',
              borderBlockColor: 'grey',
              borderWidth: 1,
              width: '80%',
              borderRadius: 10,
              fontSize: 18,
            }}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}></TextInput>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <View
            style={{
              width: '80%',
            }}>
            <Button onPress={() => submit()} title="Submit"></Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
