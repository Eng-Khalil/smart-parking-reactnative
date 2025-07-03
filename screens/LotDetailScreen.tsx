
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from 'store/userStore';

// interface LotDetailScreenProps {
//   route: {
//     params: {
//       lot: any;
//     };
//   };
// }

const LotDetailScreen: React.FC<any> = ({ route }) => {
  const { user } = useUserStore();
  const navigation = useNavigation();
  const { lot } = route.params;

  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('Mobile Money');
  const [hours, setHours] = useState('1');
  const [startTime, setStartTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const parsedHours = Number(hours);
  const totalAmount = Number(lot.pricePerHour) * parsedHours;

  if (!user) {
    Alert.alert('Please log in to book a slot');
    // navigation.replace('Login'); // Uncomment if you want to auto-redirect
  }

  const confirmBooking = async () => {
  if (!selectedSlot) {
    Alert.alert('Please select a slot to book.');
    return;
  }

  const parsedHours = Number(hours);
  const pricePerHour = Number(lot.pricePerHour);
  const totalAmount = pricePerHour * parsedHours;

  if (!hours || isNaN(parsedHours) || parsedHours <= 0) {
    Alert.alert('Invalid hours', 'Please enter a valid number of hours.');
    return;
  }

  if (!totalAmount || isNaN(totalAmount)) {
    Alert.alert('Error', 'Invalid total amount calculated.');
    console.error('Invalid totalAmount', { pricePerHour, parsedHours, totalAmount });
    return;
  }

  console.log("user from store:", user);


  if (!selectedSlot) {
  Alert.alert('Please select a slot to book.');
  return;
}



  try {
    const response = await fetch(
      'https://smart-parking-api-production.up.railway.app/api/v1/bookings',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          parkingSpotId: selectedSlot?.id,
          parkingLotId:lot.id,
          // parkingLotId: lot.id,
          // parkingSpotId: selectedSlot.id,
          hours: parsedHours,
          startTime: startTime.toISOString(),
          totalAmount:totalAmount,
        }),
      }
    );

    const data = await response.json();

    console.log(data)

    if (response.ok) {
      Alert.alert(
        'Booking confirmed!',
        `Booked ${selectedSlot.slotCode} for ${parsedHours} hour(s) from ${startTime.toLocaleTimeString()}`
      );
      setShowModal(false);
    } else {
      console.error('Booking failed', data);
      Alert.alert('Booking failed', data.message || 'Something went wrong.');
    }
  } catch (err) {
    console.error('Error', err);
    Alert.alert('Error', 'Could not connect to server.');
  }
};

console.log("booking payload:", {
  userId: user?.id,
  parkingSpotId: selectedSlot?.id,
  parkingLotId:lot.id,
  startTime,
  hours,
  totalAmount,
  
});

  return (
    <ScrollView style={{ padding: 20 }} className="mb-24 mt-8">
      <Text className="text-blue-950 font-bold text-2xl mb-2 mt-8">{lot.name}</Text>
      <Text className="text-gray-500 mb-4">description</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {(lot.images || []).map((img: string, idx: number) => (
          <Image
            key={idx}
            source={{ uri: img }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 10,
              marginRight: 10,
              backgroundColor: '#eee',
            }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* Lot Info */}
      <View className="mt-6 space-y-4">
        <View className="flex-row justify-between">
          <View className="w-[48%]">
            <Text className="text-sm font-semibold text-blue-950">📍 Address</Text>
            <Text className="text-gray-700">{lot.address}</Text>
          </View>
        </View>

        <View className="flex-row justify-between mt-4">
          <View className="w-[48%]">
            <Text className="text-sm font-semibold text-blue-950">💰 Price/Hour</Text>
            <Text className="text-gray-700">{lot.pricePerHour} UGX</Text>
          </View>
          <View className="w-[48%]">
            <Text className="text-sm font-semibold text-blue-950">🚗 Capacity</Text>
            <Text className="text-gray-700">{lot.capacity}</Text>
          </View>
        </View>

        <View className="flex-row justify-between mt-4">
          <View className="w-[48%]">
            <Text className="text-sm font-semibold text-blue-950">⏰ Opening Hours</Text>
            <Text className="text-gray-700">{lot.openingHours}</Text>
          </View>
        </View>
      </View>

      {/* Slots */}
      <Text className="text-xl font-semibold text-gray-800 mb-2 mt-6">Available Slots</Text>
      {lot.spots?.length ? (
        lot.spots.map((spot: any, index: number) => (
          <View
            key={index}
            className="border border-gray-300 rounded-xl p-4 mb-3 bg-gray-50 flex flex-row justify-between items-center"
          >
            <View>
              <Text className="text-blue-800 font-semibold">Slot Code: {spot.slotCode}</Text>
              <Text className="text-gray-700">Number: {spot.slotNumber}</Text>
              <Text
                className={
                  spot.spotStatus === 'BOOKED' ? 'text-red-600' : 'text-green-700'
                }
              >
                Status: {spot.spotStatus}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setSelectedSlot(spot);
                setShowModal(true);
              }}
              disabled={spot.spotStatus === 'BOOKED'}
              style={{
                backgroundColor:
                spot.spotStatus === 'BOOKED' ? '#ccc' : '#1e3a8a',
                paddingVertical: 4,
                borderRadius: 999,
                alignItems: 'center',
                marginTop: 24,
              }}
            >
              <Text className="text-white px-3">
                {spot.spotStatus === 'BOOKED' ? 'Booked' : 'Book Now'}
              </Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text className="text-gray-500">No available slots at the moment.</Text>
      )}

      {/* Booking Modal */}
      <Modal visible={showModal} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 20,
              width: '90%',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
              Book Parking
            </Text>

            <Text style={{ fontWeight: '600', marginBottom: 4 }}>Payment Method</Text>
            <Text className='text-blue-950 font-bold'>CASH</Text>
            {/* <View
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              <Picker selectedValue={paymentMethod} onValueChange={setPaymentMethod}>
                {/* <Picker.Item label="Mobile Money" value="Mobile Money" />
                <Picker.Item label="Credit Card" value="Credit Card" /> */}
                {/* <Picker.Item label="Cash" value="Cash" />
              </Picker>
            </View> */} 

            <Text style={{ fontWeight: '600', marginBottom: 4 }}>Hours to Park</Text>
            <TextInput
              value={hours}
              onChangeText={setHours}
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 8,
                marginBottom: 16,
              }}
              placeholder="e.g., 2"
            />

            <Text style={{ fontWeight: '600', marginBottom: 4 }}>Start Time</Text>
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              style={{ marginBottom: 16 }}
            >
              <Text style={{ color: '#2563eb', textDecorationLine: 'underline' }}>
                {startTime.toLocaleTimeString()}
              </Text>
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={startTime}
                mode="time"
                is24Hour={true}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedTime) => {
                  setShowTimePicker(false);
                  if (selectedTime) setStartTime(selectedTime);
                }}
              />
            )}

          <Text style={{ fontWeight: '600', marginBottom: 4 }}>
          Total: {Number(lot.pricePerHour) * Number(hours)} UGX
        </Text>


            <TouchableOpacity
              onPress={confirmBooking}
              style={{
                backgroundColor: '#1e3a8a',
                paddingVertical: 12,
                borderRadius: 999,
                alignItems: 'center',
                marginTop: 8,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                Confirm Booking
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{ marginTop: 12, alignItems: 'center' }}
            >
              <Text style={{ color: 'red', fontWeight: 'bold' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default LotDetailScreen;
