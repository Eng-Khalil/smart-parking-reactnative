import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import MainTabs from './navigation/MainTabs';
import "./global.css" 
import RegisterScreen from 'screens/RegisterScreen';
import GetStartedScreen from 'screens/GetStartedScreen';
import SelectLocationScreen from 'screens/SelectLocationScreen';
import MapViewScreen from 'screens/MapViewScreen';
import BookingScreen from 'screens/BookingScreen';
import LotDetailsScreen from 'screens/LotDetailScreen';
import HomeScreen from 'screens/HomeScreen';
import ForgotPasswordScreen from 'screens/ForgotPasswordScreen';
import UserProfileScreen from 'screens/UserProfileScreen';
import { TamaguiProvider } from '@tamagui/core'
import config from './tamagui.config'
import EditProfileScreen from 'screens/EditProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <TamaguiProvider config={config}>
        <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="SelectLocation" component={SelectLocationScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="MapView" component={MapViewScreen} />
        <Stack.Screen name="LotDetail" component={LotDetailsScreen} />
        <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
      
    </TamaguiProvider>
    
  );
}
