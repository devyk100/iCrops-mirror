import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Login';
import Signup from './Signup';
import {NavigationContainer, NavigationState} from '@react-navigation/native';
const Tab = createBottomTabNavigator();
//@ts-ignore
import loginIcon from "../assets/login.png"
// @ts-ignore
import signupIcon from "../assets/signup.png"
import { Image } from 'react-native';

export default function MainAuth() {
    return (
      <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Login" component={Login} options={{
          tabBarIcon: () => <Image source={loginIcon} />
        }}/>
        <Tab.Screen name="Sign Up" component={Signup} options={{
          tabBarIcon: () => <Image source={signupIcon} />
        }}/>
      </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
  