import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function SelectLocationScreen({ navigation }: { navigation: any }) {
  const [region, setRegion] = useState('Central');
  const [city, setCity] = useState('Kampala');
  const [area, setArea] = useState('Mbuya');
  const [street, setStreet] = useState('Port Bell Road');

  const handleContinue = () => {
    const locationData = { region, city, area, street };
    navigation.replace('Main', {
  screen: 'Home',
  params: { location: locationData },
});
  };

  return (
    <ScrollView className="flex-1  bg-white px-6 pt-20">
      <Text className="text-blue-950 text-3xl font-bold text-center mb-2">
        Where will you park today
      </Text>
      <Text className="text-center text-gray-600 mb-6">
        Choose your region, city, area, and street to find nearby parking.
      </Text>

      {/* REGION */}
      <Text className="text-blue-950 font-semibold mb-1">Region</Text>
      <View className="border border-blue-950 rounded-lg mb-4 overflow-hidden">
        <Picker selectedValue={region} onValueChange={setRegion}>
          <Picker.Item label="Central" value="Central" />
          <Picker.Item label="Western" value="Western" />
          <Picker.Item label="Eastern" value="Eastern" />
          <Picker.Item label="Northern" value="Northern" />
        </Picker>
      </View>

      {/* CITY */}
      <Text className="text-blue-950 font-semibold mb-1">City</Text>
      <View className="border border-blue-950 rounded-lg mb-4 overflow-hidden">
        <Picker selectedValue={city} onValueChange={setCity}>
          <Picker.Item label="Kampala" value="Kampala" />
          <Picker.Item label="Entebbe" value="Entebbe" />
          <Picker.Item label="Jinja" value="Jinja" />
        </Picker>
      </View>

      {/* AREA */}
      <Text className="text-blue-950 font-semibold mb-1">Area</Text>
      <View className="border border-blue-950 rounded-lg mb-4 overflow-hidden">
        <Picker selectedValue={area} onValueChange={setArea}>
          <Picker.Item label="Nakawa" value="Nakawa" />
          <Picker.Item label="Mbuya" value="Mbuya" />
          <Picker.Item label="Mutungo" value="Mutungo" />
          <Picker.Item label="Lugogo" value="Lugogo" />
        </Picker>
      </View>

      {/* STREET */}
      <Text className="text-blue-950 font-semibold mb-1">Street</Text>
      <View className="border border-blue-950 rounded-lg mb-6 overflow-hidden">
        <Picker selectedValue={street} onValueChange={setStreet}>
          <Picker.Item label="Port Bell Road" value="Port Bell Road" />
          <Picker.Item label="Jinja Road" value="Jinja Road" />
          <Picker.Item label="Spring Road" value="Spring Road" />
          <Picker.Item label="Lugogo Bypass" value="Lugogo Bypass" />
        </Picker>
      </View>

      {/* CONTINUE */}
      <TouchableOpacity
        onPress={handleContinue}
        className="bg-blue-950 py-4 rounded-full items-center"
      >
        <Text className="text-white text-lg font-bold">Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MapView')} className="mt-6 mb-12 py-3 border border-blue-950 rounded-full items-center">
              <Text className="text-blue-950 font-semibold">View on Map 🗺️</Text>
            </TouchableOpacity>
    </ScrollView>
  );
}
