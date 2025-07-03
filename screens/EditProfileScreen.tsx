import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useUserStore } from 'store/userStore';

export default function EditProfileScreen({ navigation }: { navigation: any }) {
  const { user, updateUser } = useUserStore();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const handleSave = () => {
    if (!firstName || !lastName || !email) {
      Alert.alert('Error', 'First name, last name, and email are required.');
      return;
    }

    // Update in Zustand (you should also update backend here if connected)
    updateUser({ firstName, lastName, email, phone });

    Alert.alert('Success', 'Profile updated successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-32">
      <Text className="text-2xl font-bold text-blue-950 mb-6">✏️ Edit Profile</Text>

      <View className="space-y-4">
        <View>
          <Text className="text-gray-600 mb-1">First Name</Text>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            className="border border-gray-300 rounded-lg px-4 py-2 text-blue-900"
          />
        </View>

        <View>
          <Text className="text-gray-600 mb-1">Last Name</Text>
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            className="border border-gray-300 rounded-lg px-4 py-2 text-blue-900"
          />
        </View>

        <View>
          <Text className="text-gray-600 mb-1">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            className="border border-gray-300 rounded-lg px-4 py-2 text-blue-900"
          />
        </View>

        <View>
          <Text className="text-gray-600 mb-1">Phone</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            className="border border-gray-300 rounded-lg px-4 py-2 text-blue-900"
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={handleSave}
        className="bg-blue-950 mt-8 py-3 rounded-full items-center"
      >
        <Text className="text-white font-bold">Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
