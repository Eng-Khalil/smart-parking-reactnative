// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from '../screens/HomeScreen';
// import SettingsScreen from 'screens/settingsScreen';
// import BookingScreen from 'screens/BookingScreen';

// const Tab = createBottomTabNavigator();

// export default function MainTabs() {
//   return (
//     <Tab.Navigator screenOptions={{ headerShown: true }}>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Bookings" component={BookingScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// }


import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons'; // ✅ correct import
import HomeScreen from '../screens/HomeScreen';
import BookingScreen from 'screens/BookingScreen';
import SettingsScreen from 'screens/settingsScreen';
import UserProfileScreen from 'screens/UserProfileScreen';
import MapViewScreen from 'screens/MapViewScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
    
      screenOptions={({ route }) => ({
        headerShown: true,
         headerStyle: {
      backgroundColor: '#ffffff',
        headerTintColor: '#ffffff',   // ⚪ Text and icon color (white)
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff',          // Explicitly set title text color to white
    },
    },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof FontAwesome.glyphMap;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Bookings') {
            iconName = 'calendar';
          } else if (route.name === 'Settings') {
            iconName = 'cog';
          } else if (route.name === 'MapView') {
            iconName = 'map';
          } 
          else {
            iconName = 'question'; // fallback
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1e3a8a',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bookings" component={BookingScreen} />
      <Tab.Screen name="Settings" component={UserProfileScreen} />
      <Tab.Screen name="MapView" component={MapViewScreen} />
      
    </Tab.Navigator>
  );
}
