
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';


type FilterKey = 'region' | 'city' | 'area' | 'street';

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [location, setLocation] = useState<any>(null);
  const [parkingLots, setParkingLots] = useState<any[]>([]);
  const [filteredLots, setFilteredLots] = useState<any[]>([]);
  const [filters, setFilters] = useState<{ [key in FilterKey]: string }>({
    region: '',
    city: '',
    area: '',
    street: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocationAndLots = async () => {
      try {
        const savedLocation = await AsyncStorage.getItem('lastLocation');
        if (savedLocation) {
          const locationData = JSON.parse(savedLocation);
          setLocation(locationData);

          const response = await fetch(
            'https://smart-parking-api-production.up.railway.app/api/v1/parking-lots'
          );
          const data = await response.json();
          setParkingLots(data);

          const filtered = data.filter(
            (lot: any) => lot.streetId === locationData.streetId
          );
          setFilteredLots(filtered);
        }
      } catch (error) {
        console.error('Error loading location or parking lots:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationAndLots();
  }, []);

  useEffect(() => {
    const results = parkingLots.filter((lot) => {
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        const field = lot[key as FilterKey];
        const name = typeof field === 'object' ? field?.name : field;
        return value === '' || name?.toLowerCase() === value.toLowerCase();
      });

      const matchesSearch = lot.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesFilters && matchesSearch;
    });
    setFilteredLots(results);
  }, [filters, searchTerm, parkingLots]);

  const updateFilter = (key: FilterKey, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: prev[key] === value ? '' : value }));
  };

  const uniqueValues = (key: FilterKey) => {
    const values = parkingLots
      .map((lot) => lot[key]?.name ?? '')
      .filter((name) => !!name);
    return Array.from(new Set(values));
  };

  if (loading) {
    return (
      <View className="flex-1 mb-8 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#1E3A8A" />
        <Text className="text-blue-950 mt-4">Loading parking lots...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-8">
       <View style={{ height: 300, borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 0.3162,
          longitude: 32.5825,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
        showsMyLocationButton
        showsTraffic
        showsBuildings
        showsCompass
        showsScale
      >
        {parkingLots.map((lot) => (
          <Marker
            key={lot.id}
            coordinate={{ latitude: lot.latitude, longitude: lot.longitude }}
            title={lot.name}
            description="Tap to Book"
          >
            <Callout>
              <View>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                  {lot.name}
                </Text>
                <Text>Tap to book</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
      <TextInput
        placeholder="Search by name..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        className="border border-blue-200 rounded-full px-4 py-2 mb-4 text-blue-950"
      />

      {/* Filters */}
      {(['region', 'city', 'area', 'street'] as FilterKey[]).map((key) => (
        <ScrollView
          horizontal
          key={key}
          className="mb-2"
          showsHorizontalScrollIndicator={false}
        >
          {uniqueValues(key).map((value) => (
            <TouchableOpacity
              key={value}
              onPress={() => updateFilter(key, value)}
              className={`px-3 py-1 rounded-full mr-2 ${
                filters[key] === value ? 'bg-blue-700' : 'bg-blue-100'
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  filters[key] === value ? 'text-white' : 'text-blue-950'
                }`}
              >
                {value}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ))}

      {/* Parking List */}
      {filteredLots.length > 0 ? (
        filteredLots.map((lot) => (
          <View
            key={lot.id}
            className="bg-white rounded-xl shadow-md p-4 mb-4 border border-blue-100"
          >
            <Text className="text-lg font-bold text-blue-950">{lot.name}</Text>
            <Text className="text-sm text-blue-800">
              Address: {lot.region?.name}, {lot.city?.name}, {lot.area?.name}
            </Text>
            <Text className="text-xs text-gray-500">
              Parking Capacity {lot.capacity}
            </Text>
            <View className="flex-row justify-between items-center mt-2">
              <Text className="text-blue-950 font-semibold">
                {lot.pricePerHour ?? 0} UGX/hr
              </Text>
              {/* <Text>{lot.parkingSpot.length}</Text> */}
              {/* <Text
                className={`text-xs font-semibold ${
                  lot.availableSpots > 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {lot.availableSpots > 0
                  ? `${lot.availableSpots}/${lot.capacity} Available`
                  : 'Full'}
              </Text> */}
            </View>
            <View className="flex-row justify-between items-center mt-2">
              <Text className="text-blue-950 font-semibold">
                Opening Hours: {lot.openingHour}
              </Text>
              <Text className="text-blue-950 font-semibold">
                Closing Hours: {lot.closingHour}
              </Text>
            </View>
            <TouchableOpacity
              className="bg-blue-950 mt-3 px-4 py-2 rounded-full"
              onPress={() => navigation.navigate('LotDetail', { lot })}
            >
              <Text className="text-white text-center font-bold">View Slots</Text>
            </TouchableOpacity>
            <Text></Text>
            <Text></Text>
          </View>
        ))
      ) : (
        <Text className="text-blue-800 text-center mt-4">
          No parking lots found.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});