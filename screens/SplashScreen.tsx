import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';

export default function SplashScreen({ navigation }:{navigation:any}) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('GetStarted');
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-blue-950">
      <Image
        source={require('../assets/logo-light.png')}
        className="w-60 h-40 mb-5"
        resizeMode="contain"
      />
      <Text className="text-white text-xl  font-bold">Smart Parking, Smarter Cities</Text>
    </View>
  );
}
