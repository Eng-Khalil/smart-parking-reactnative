

import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useUserStore } from 'store/userStore';
// import { useUserStore } from '../store/useUserStore';

export default function UserProfileScreen({ navigation }: { navigation: any }) {
  const { user, logout } = useUserStore();

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        onPress: () => {
          logout();
          navigation.replace('Main', { screen: 'Home' });
        },
      },
    ]);
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
  //   Alert.alert("Sign in or login to manage settings");
  //   navigation.replace('Login');

  //   return (
  //     <View className="flex-1 justify-center items-center">
  //       <Text className="text-red-500 font-bold">No user found. Please log in.</Text>
  //     </View>
  //   );
  // }

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-6">
      <Text className="text-2xl font-bold text-blue-950 mb-6">👤 User Profile</Text>

      <View className="bg-gray-100 rounded-xl p-4 mb-4">
        <Text className="text-gray-600">Name</Text>
        <Text className="text-lg font-semibold text-blue-900">
          {user?.firstName} {user?.lastName}
        </Text>
      </View>

      <View className="bg-gray-100 rounded-xl p-4 mb-4">
        <Text className="text-gray-600">Email</Text>
        <Text className="text-lg font-semibold text-blue-900">{user?.email}</Text>
      </View>

      <View className="bg-gray-100 rounded-xl p-4 mb-6">
        <Text className="text-gray-600">Phone</Text>
        <Text className="text-lg font-semibold text-blue-900">{user?.phone || 'N/A'}</Text>
      </View>

      <TouchableOpacity 
        onPress={() => navigation.navigate('EditProfile')}
      className="bg-blue-950 py-3 rounded-full items-center mb-3">
        <Text className="text-white font-bold">Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogout}
        className="border border-red-500 py-3 rounded-full items-center"
      >
        <Text className="text-red-500 font-bold">Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
