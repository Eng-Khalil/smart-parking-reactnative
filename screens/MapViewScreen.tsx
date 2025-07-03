

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function MapViewScreen() {
    const [parkingLots, setParkingLots] = useState<any[]>([]);
      const [loading, setLoading] = useState(true);
    

      useEffect(() => {
    const fetchLocationAndLots = async () => {
      try {
          const response = await fetch(
            'https://smart-parking-api-production.up.railway.app/api/v1/parking-lots'
          );
          const data = await response.json();
          setParkingLots(data);
      } catch (error) {
        console.error('Error loading location or parking lots:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationAndLots();
  }, []);
  
  // const parkingLots = [
  //   { id: 1, name: 'Shell Parking', lat: 0.3162, lng: 32.5825 },
  //   { id: 2, name: 'Capital Shoppers Lot', lat: 0.3182, lng: 32.5861 },
  //   { id: 3, name: 'Kireka Namugongo Rd', lat: 0.3674, lng: 32.6449 },
  // ];

  return (
    <View style={styles.container}>
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
