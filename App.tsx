import * as React from 'react';
import {Button, View} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {NavigationContainer, NavigationState} from '@react-navigation/native';
import LandingPage from './app/components/LandingPage';
import DataCollection from './app/components/DataCollection';
import {Provider} from 'react-redux';
import store from './app/store';
import MapChooseLocation from './app/components/MapChooseLocation';

function NotificationsScreen({navigation}: {navigation: any}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={'Hi example@gmail.com'}
        onPress={() => console.log('does something')}
        labelStyle={{
          fontSize: 18,
          fontWeight: 300,
        }}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
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
            options={{title: 'Data Collection'}}
            component={DataCollection}
          />
        </Drawer.Navigator>
      </NavigationContainer>
      {/* <MapChooseLocation></MapChooseLocation> */}
      </Provider>
  );
}
