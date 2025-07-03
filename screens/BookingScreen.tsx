
// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView } from 'react-native';
// import { useUserStore } from 'store/userStore'; 
// import dayjs from 'dayjs';

// const BookingScreen = () => {
//   const { user } = useUserStore();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) return;

//     const fetchBookings = async () => {
//       try {
//         const response = await fetch(
//           'https://smart-parking-api-production.up.railway.app/api/v1/bookings'
//         );
//         const data = await response.json();

//         if (response.ok) {
//           // Only show bookings that belong to the logged-in user
//           const userBookings = data.filter(
//             (booking:any) => booking.userId === user.id
//           );
//           setBookings(userBookings);
//         } else {
//           console.error('Failed to fetch bookings:', data);
//         }
//       } catch (error) {
//         console.error('Error fetching bookings:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [user]);

//   if (!user) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <Text>Please log in to view your bookings.</Text>
//       </View>
//     );
//   }

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <Text>Loading your bookings...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView className="flex-1 p-4 bg-white">
//       <Text className="text-2xl font-bold text-blue-900 mb-4">My Bookings</Text>

//       {bookings.length > 0 ? (
//         bookings.map((booking:any) => (
//           <View
//             key={booking.id}
//             className="mb-4 p-4 bg-gray-100 rounded-xl border border-gray-300"
//           >
//             <Text className="text-lg font-bold text-blue-800">{booking.parkingLot.street.name}</Text>
//             <Text className="text-lg font-bold text-blue-800">{booking.parkingLot.address}</Text>
//             <Text className="text-gray-800">Spot No: {booking.parkingSpot.slotNumber}</Text>
//             <Text className="text-gray-800">Booking Status: {booking.bookingStatus}</Text>
//             <Text className="text-gray-800">
//               Start Time:{' '}
//               {new Date(booking.startTime).toLocaleString(undefined, {
//                 dateStyle: 'medium',
//                 timeStyle: 'short',
//               })}
//             </Text>              
//             <Text className="text-gray-800">Duration: {booking.hours} hour(s)</Text>
//             <Text className="text-gray-800">Payment: {booking.paymentMethod}</Text>
//             <Text>Date Booked: {dayjs(booking.createdAt).format('DD MMMM YYYY')}</Text>

//           </View>
//         ))
//       ) : (
//         <Text className="text-gray-500">You have no bookings yet.</Text>
//       )}
//     </ScrollView>
//   );
// };

// export default BookingScreen;









import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useUserStore } from 'store/userStore';
import dayjs from 'dayjs';

const BookingScreen = ({ navigation }: { navigation: any }) => {
  const { user } = useUserStore();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://smart-parking-api-production.up.railway.app/api/v1/bookings'
      );
      const data = await response.json();

      if (response.ok) {
        const userBookings = data.filter(
          (booking: any) => booking.userId === user?.id
        );
        setBookings(userBookings);
      } else {
        console.error('Failed to fetch bookings:', data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (user) {
        fetchBookings();
      }
    }, [user])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBookings();
  };

   useEffect(() => {
    if (!user) {
      Alert.alert("Sign in Required", "Please log in to view your bookings.", [
        {
          text: 'OK',
          onPress: () => navigation.replace('Login'),
        },
      ]);
    }
  }, [user]);

  // if (!user) {
  //    Alert.alert("Sign in or login to see your bookings");
  //       navigation.replace('Login');
  //   return (
  //     <View className="flex-1 justify-center items-center">
  //       <Text>Please log in to view your bookings.</Text>
  //     </View>
  //   );
  // }

  if (loading && !refreshing) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading your bookings...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 p-4 bg-white"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text className="text-2xl font-bold text-blue-900 mb-4">My Bookings</Text>

      {bookings.length > 0 ? (
        bookings.map((booking: any) => (
          <View
            key={booking.id}
            className="mb-4 p-4 bg-gray-100 rounded-xl border border-gray-300"
          >
            <Text className="text-lg font-bold text-blue-800">{booking.parkingLot.street.name}</Text>
            <Text className="text-lg font-bold text-blue-800">{booking.parkingLot.address}</Text>
            <Text className="text-gray-800">Spot No: {booking.parkingSpot.slotNumber}</Text>
            <Text className="text-gray-800">Booking Status: {booking.bookingStatus}</Text>
            <Text className="text-gray-800">
              Start Time:{' '}
              {new Date(booking.startTime).toLocaleString(undefined, {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </Text>
            <Text className="text-gray-800">Duration: {booking.hours} hour(s)</Text>
            <Text className="text-gray-800">Payment: {booking.paymentMethod}</Text>
            <Text className="text-gray-800">
              Date Booked: {dayjs(booking.createdAt).format('DD MMMM YYYY, HH:mm')}
            </Text>
          </View>
        ))
      ) : (
        <Text className="text-gray-500">You have no bookings yet.</Text>
      )}
    </ScrollView>
  );
};

export default BookingScreen;
