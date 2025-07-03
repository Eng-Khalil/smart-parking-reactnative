import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Street = {
  id: string;
  name: string;
};

type Area = {
  id: string;
  name: string;
  streets: Street[];
};

type City = {
  id: string;
  name: string;
  areas: Area[];
};

type Region = {
  id: string;
  name: string;
  cities: City[];
};

export default function SelectLocationScreen({ navigation }: { navigation: any }) {
  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [streets, setStreets] = useState<Street[]>([]);

  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [street, setStreet] = useState('');

  const [hasSavedLocation, setHasSavedLocation] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch('https://smart-parking-api-production.up.railway.app/api/v1/regions');
        const data = await response.json();
        setRegions(data);

        if (data.length > 0) {
          const firstRegion = data[0];
          setRegion(firstRegion.id);
          setCities(firstRegion.cities);
        }
      } catch (error) {
        console.error('Failed to fetch regions:', error);
      } finally {
        setLoading(false);
      }
    };

    const checkSavedLocation = async () => {
      const saved = await AsyncStorage.getItem('lastLocation');
      if (saved) setHasSavedLocation(true);
    };

    fetchRegions();
    checkSavedLocation();
  }, []);

  useEffect(() => {
    const selectedRegion = regions.find(r => r.id === region);
    if (selectedRegion) {
      const regionCities = selectedRegion.cities || [];
      setCities(regionCities);
      if (regionCities.length > 0) {
        setCity(regionCities[0].id);
      } else {
        setCity('');
      }
    }
  }, [region]);

  useEffect(() => {
    const selectedCity = cities.find(c => c.id === city);
    if (selectedCity) {
      const cityAreas = selectedCity.areas || [];
      setAreas(cityAreas);
      if (cityAreas.length > 0) {
        setArea(cityAreas[0].id);
      } else {
        setArea('');
      }
    }
  }, [city]);

  useEffect(() => {
    const selectedArea = areas.find(a => a.id === area);
    if (selectedArea) {
      const areaStreets = selectedArea.streets || [];
      setStreets(areaStreets);
      if (areaStreets.length > 0) {
        setStreet(areaStreets[0].id);
      } else {
        setStreet('');
      }
    }
  }, [area]);

  const handleContinue = async () => {
    const selectedStreet = streets.find(s => s.id === street);
    const selectedRegion = regions.find(r => r.id === region);
    const selectedCity = cities.find(c => c.id === city);
    const selectedArea = areas.find(a => a.id === area);

    const locationData = {
      region: selectedRegion?.name,
      city: selectedCity?.name,
      area: selectedArea?.name,
      street: selectedStreet?.name,
      streetId: selectedStreet?.id,
    };

    await AsyncStorage.setItem('lastLocation', JSON.stringify(locationData));
    navigation.replace('Main', { location: locationData });
  };

  const handleUseSaved = async () => {
    const saved = await AsyncStorage.getItem('lastLocation');
    if (saved) {
      const parsed = JSON.parse(saved);
      navigation.replace('Main', { location: parsed });
    } else {
      Alert.alert('No saved location found.');
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#1E3A8A" />
        <Text className="text-blue-950 mt-4">Loading locations...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className="bg-white">
      <View className="items-center px-6">
        <Text className="text-blue-950 text-3xl font-bold text-center mb-4">Select Location</Text>

        {hasSavedLocation && (
          <TouchableOpacity onPress={handleUseSaved} className="bg-blue-100 border border-blue-950 py-3 px-4 mb-6 rounded-lg w-full">
            <Text className="text-blue-950 font-semibold text-center">
              Continue with Last Selected Location
            </Text>
          </TouchableOpacity>
        )}

        {/* Region Picker */}
        <Text className="text-blue-950 font-semibold mb-1 self-start">Region</Text>
        <View className="border border-blue-950 rounded-lg mb-4 overflow-hidden w-full">
          <Picker selectedValue={region} onValueChange={setRegion}>
            {regions.map(r => (
              <Picker.Item key={r.id} label={r.name} value={r.id} />
            ))}
          </Picker>
        </View>

        {/* City Picker */}
        <Text className="text-blue-950 font-semibold mb-1 self-start">City</Text>
        <View className="border border-blue-950 rounded-lg mb-4 overflow-hidden w-full">
          <Picker selectedValue={city} onValueChange={setCity}>
            {cities.map(c => (
              <Picker.Item key={c.id} label={c.name} value={c.id} />
            ))}
          </Picker>
        </View>

        {/* Area Picker */}
        <Text className="text-blue-950 font-semibold mb-1 self-start">Area</Text>
        <View className="border border-blue-950 rounded-lg mb-4 overflow-hidden w-full">
          <Picker selectedValue={area} onValueChange={setArea}>
            {areas.map(a => (
              <Picker.Item key={a.id} label={a.name} value={a.id} />
            ))}
          </Picker>
        </View>

        {/* Street Picker */}
        <Text className="text-blue-950 font-semibold mb-1 self-start">Street</Text>
        <View className="border border-blue-950 rounded-lg mb-6 overflow-hidden w-full">
          <Picker selectedValue={street} onValueChange={setStreet}>
            {streets.map(s => (
              <Picker.Item key={s.id} label={s.name} value={s.id} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity onPress={handleContinue} className="bg-blue-950 py-4 rounded-full items-center w-full">
          <Text className="text-white text-lg font-bold">Continue </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}






// import React, { useEffect, useState } from 'react'
// import { Alert, ActivityIndicator } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import {
//   YStack,
//   Text,
//   Button,
//   Select,
// } from 'tamagui'

// type Street = { id: string; name: string }
// type Area = { id: string; name: string; streets: Street[] }
// type City = { id: string; name: string; areas: Area[] }
// type Region = { id: string; name: string; cities: City[] }

// export default function SelectLocationScreen({ navigation }: { navigation: any }) {
//   const [regions, setRegions] = useState<Region[]>([])
//   const [cities, setCities] = useState<City[]>([])
//   const [areas, setAreas] = useState<Area[]>([])
//   const [streets, setStreets] = useState<Street[]>([])

//   const [region, setRegion] = useState('')
//   const [city, setCity] = useState('')
//   const [area, setArea] = useState('')
//   const [street, setStreet] = useState('')

//   const [hasSavedLocation, setHasSavedLocation] = useState(false)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchRegions = async () => {
//       try {
//         const response = await fetch('https://smart-parking-api-production.up.railway.app/api/v1/regions')
//         const data = await response.json()
//         setRegions(data)

//         if (data.length > 0) {
//           const firstRegion = data[0]
//           setRegion(firstRegion.id)
//           setCities(firstRegion.cities)
//         }
//       } catch (error) {
//         console.error('Failed to fetch regions:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     const checkSavedLocation = async () => {
//       const saved = await AsyncStorage.getItem('lastLocation')
//       if (saved) setHasSavedLocation(true)
//     }

//     fetchRegions()
//     checkSavedLocation()
//   }, [])

//   useEffect(() => {
//     const selectedRegion = regions.find(r => r.id === region)
//     if (selectedRegion) {
//       const regionCities = selectedRegion.cities || []
//       setCities(regionCities)
//       setCity(regionCities[0]?.id || '')
//     }
//   }, [region])

//   useEffect(() => {
//     const selectedCity = cities.find(c => c.id === city)
//     if (selectedCity) {
//       const cityAreas = selectedCity.areas || []
//       setAreas(cityAreas)
//       setArea(cityAreas[0]?.id || '')
//     }
//   }, [city])

//   useEffect(() => {
//     const selectedArea = areas.find(a => a.id === area)
//     if (selectedArea) {
//       const areaStreets = selectedArea.streets || []
//       setStreets(areaStreets)
//       setStreet(areaStreets[0]?.id || '')
//     }
//   }, [area])

//   const handleContinue = async () => {
//     const selectedStreet = streets.find(s => s.id === street)
//     const selectedRegion = regions.find(r => r.id === region)
//     const selectedCity = cities.find(c => c.id === city)
//     const selectedArea = areas.find(a => a.id === area)

//     const locationData = {
//       region: selectedRegion?.name,
//       city: selectedCity?.name,
//       area: selectedArea?.name,
//       street: selectedStreet?.name,
//       streetId: selectedStreet?.id,
//     }

//     await AsyncStorage.setItem('lastLocation', JSON.stringify(locationData))
//     navigation.replace('Main', { location: locationData })
//   }

//   const handleUseSaved = async () => {
//     const saved = await AsyncStorage.getItem('lastLocation')
//     if (saved) {
//       const parsed = JSON.parse(saved)
//       navigation.replace('Main', { location: parsed })
//     } else {
//       Alert.alert('No saved location found.')
//     }
//   }

//   if (loading) {
//     return (
//       <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="white">
//         <ActivityIndicator size="large" color="#1E3A8A" />
//         <Text color="#1E3A8A" marginTop="$4">Loading locations...</Text>
//       </YStack>
//     )
//   }

//   return (
//     // <YStack flex={1} padding="$4" backgroundColor="white" justifyContent="center">
//     //   <Text fontSize="$8" fontWeight="bold" color="#1E3A8A" textAlign="center" marginBottom="$4">
//     //     Select Location
//     //   </Text>

//     //   {hasSavedLocation && (
//     //     <Button theme="blue" variant="outlined" marginBottom="$4" onPress={handleUseSaved}>
//     //       Continue with Last Selected Location
//     //     </Button>
//     //   )}

//     //   {/* Region Select */}
//     //   <Text color="#1E3A8A" fontWeight="600" marginBottom="$2">Region</Text>
//     //   <Select value={region} onValueChange={setRegion}>
//     //     <Select.Trigger />
//     //     <Select.Content>
//     //       {regions.map((r, i) => (
//     //         <Select.Item key={r.id} index={i} value={r.id}>
//     //           <Select.ItemText>{r.name}</Select.ItemText>
//     //         </Select.Item>
//     //       ))}
//     //     </Select.Content>
//     //   </Select>

//     //   {/* City Select */}
//     //   <Text color="#1E3A8A" fontWeight="600" marginTop="$4" marginBottom="$2">City</Text>
//     //   <Select value={city} onValueChange={setCity}>
//     //     <Select.Trigger />
//     //     <Select.Content>
//     //       {cities.map((c, i) => (
//     //         <Select.Item key={c.id} index={i} value={c.id}>
//     //           <Select.ItemText>{c.name}</Select.ItemText>
//     //         </Select.Item>
//     //       ))}
//     //     </Select.Content>
//     //   </Select>

//     //   {/* Area Select */}
//     //   <Text color="#1E3A8A" fontWeight="600" marginTop="$4" marginBottom="$2">Area</Text>
//     //   <Select value={area} onValueChange={setArea}>
//     //     <Select.Trigger />
//     //     <Select.Content>
//     //       {areas.map((a, i) => (
//     //         <Select.Item key={a.id} index={i} value={a.id}>
//     //           <Select.ItemText>{a.name}</Select.ItemText>
//     //         </Select.Item>
//     //       ))}
//     //     </Select.Content>
//     //   </Select>

//     //   {/* Street Select */}
//     //   <Text color="#1E3A8A" fontWeight="600" marginTop="$4" marginBottom="$2">Street</Text>
//     //   <Select value={street} onValueChange={setStreet}>
//     //     <Select.Trigger />
//     //     <Select.Content>
//     //       {streets.map((s, i) => (
//     //         <Select.Item key={s.id} index={i} value={s.id}>
//     //           <Select.ItemText>{s.name}</Select.ItemText>
//     //         </Select.Item>
//     //       ))}
//     //     </Select.Content>
//     //   </Select>

//     //   <Button theme="blue" size="$5" marginTop="$6" onPress={handleContinue}>
//     //     Continue
//     //   </Button>
//     // </YStack>
//     <YStack flex={1} padding="$4" backgroundColor="white" justifyContent="center">
//   <Text fontSize="$8" fontWeight="bold" color="#1E3A8A" textAlign="center" marginBottom="$4">
//     Select Location
//   </Text>

//   {hasSavedLocation && (
//     <Button
//       backgroundColor="#EFF6FF"
//       borderColor="#1E3A8A"
//       borderWidth={1}
//       borderRadius="$4"
//       marginBottom="$4"
//       onPress={handleUseSaved}
//     >
//       <Text color="#1E3A8A">Continue with Last Selected Location</Text>
//     </Button>
//   )}

//   {/* Dropdown Group */}
//   {[
//     { label: 'Region', value: region, setter: setRegion, options: regions },
//     { label: 'City', value: city, setter: setCity, options: cities },
//     { label: 'Area', value: area, setter: setArea, options: areas },
//     { label: 'Street', value: street, setter: setStreet, options: streets },
//   ].map(({ label, value, setter, options }, index) => (
//     <YStack key={label} marginBottom="$4">
//       <Text color="#1E3A8A" fontWeight="600" marginBottom="$2">{label}</Text>
//       <Select
//         value={value}
//         onValueChange={setter}
//         size="$4"
//       >
//         <Select.Trigger
//           borderWidth={1}
//           borderColor="#CBD5E1"
//           backgroundColor="#F8FAFC"
//           borderRadius="$4"
//           paddingHorizontal="$3"
//           height={48}
//         />
//         <Select.Content zIndex={1000}>
//           {options.map((option, i) => (
//             <Select.Item key={option.id} index={i} value={option.id}>
//               <Select.ItemText>{option.name}</Select.ItemText>
//             </Select.Item>
//           ))}
//         </Select.Content>
//       </Select>
//     </YStack>
//   ))}

//   <Button
//     backgroundColor="#1E3A8A"
//     borderRadius="$10"
//     height={48}
//     onPress={handleContinue}
//   >
//     <Text color="white" fontWeight="600">Continue</Text>
//   </Button>
// </YStack>

//   )
// }






