import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Login';
import Signup from './Signup';
import {NavigationContainer, NavigationState} from '@react-navigation/native';
const Tab = createBottomTabNavigator();


export default function MainAuth() {
    return (
      <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Sign Up" component={Signup} />
      </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
  