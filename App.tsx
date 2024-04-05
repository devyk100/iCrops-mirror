import * as React from 'react';
import {Button, Image, Text, View} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {NavigationContainer, NavigationState} from '@react-navigation/native';
import LandingPage from './app/components/LandingPage';
import DataCollection from './app/components/datacollection/Main';
import {Provider, useSelector} from 'react-redux';
import store from './app/store';
import {selectDegreesToNorth, selectLocation} from './app/features/LocationSlice';
// @ts-ignore
import compassImage from './app/assets/compass.png';
import Login from './app/auth/Login';
import MainAuth from './app/auth/MainAuth';
import { useMMKVString } from 'react-native-mmkv';

function NotificationsScreen({navigation}: {navigation: any}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function DataCollectionHeader() {
  const locationData = useSelector(selectLocation);
  const degreesToNorth = useSelector(selectDegreesToNorth);
  return (
    <>
      {/* <View style={{
      height:"20%",
      width:"100%",
      backgroundColor:"red"
    }}> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}>
        <Text
            // @ts-ignore
          style={{
            color: 'red',
            fontSize:20,
            fontWeight:600
          }}>
          Data Collection
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={compassImage}
            style={{
              height: 40,
              width: 40,
              transform:[{rotate:`${-(40+ (degreesToNorth))}deg`}]
            }}></Image>
          <Text
            style={{
              color: 'blue',
            }}>
            {locationData.accuracy
              ? Math.round(locationData.accuracy) + ' m'
              : null}
          </Text>
        </View>
      </View>
      {/* </View> */}
    </>
  );
}

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const [email, setEmail] = useMMKVString('user.email');
  const [jwt, setJwt] = useMMKVString('user.jwt');
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={'Hi '+email}
        onPress={() => console.log('does something')}
        // @ts-ignore
        labelStyle={{
          fontSize: 18,
          fontWeight: 300,
        }}
      />
      <DrawerItemList {...props} />
      <DrawerItem label={"Logout"}  onPress={() => {
           setEmail(undefined)
           setJwt(undefined)
      }} labelStyle={{}}/>
    </DrawerContentScrollView>
  );
}

export default function App() {
  const [email, setEmail] = useMMKVString("user.email")
    const [jwt, setJwt] = useMMKVString("user.jwt")
    if(jwt == undefined)  return (
      <MainAuth />
    )
    else return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="ICRISAT iCrops"
          screenOptions={{
            headerStyle: {backgroundColor: '#90EE90', borderColor: 'red'},
            drawerContentStyle: {
              backgroundColor: 'white',
            },
          }}
          drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen
            name="ICRISAT iCrops"
            options={{
              drawerStatusBarAnimation: 'slide',
              // overlayColor: "yellow"
            }}
            component={LandingPage}
          />
          <Drawer.Screen
            name="datacollection"
            options={{
              headerTitle: () => <DataCollectionHeader />,
              title: 'Data Collection',
            }}
            component={DataCollection}
          />
        </Drawer.Navigator>
      </NavigationContainer>
      {/* <ImageMarker></ImageMarker> */}
      {/* <MapChooseLocation></MapChooseLocation> */}
    </Provider>
    
  );
}
