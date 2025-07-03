
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';

export default function RegisterScreen({ navigation }: { navigation: any }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const apiBaseUrl = "https://smart-parking-api-production.up.railway.app";

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !phone || !password) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          password,
          role: 'USER', // default role
          image: '' // optional field
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        Alert.alert('Registration Failed', result.error || 'Please try again.');
        return;
      }

      Alert.alert('Success', 'Account created successfully. Please log in.');
      navigation.replace('Login');
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-blue-950 justify-center items-center px-6">
      <Image
        source={require('../assets/logo-light.png')}
        className="w-24 h-24 mb-6"
        resizeMode="contain"
      />

      <Text className="text-white text-3xl font-bold mb-6">Register</Text>

      <TextInput
        placeholder="First Name"
        placeholderTextColor="#ccc"
        value={firstName}
        onChangeText={setFirstName}
        className="w-full bg-white rounded-lg px-4 py-3 mb-4 text-black"
      />

      <TextInput
        placeholder="Last Name"
        placeholderTextColor="#ccc"
        value={lastName}
        onChangeText={setLastName}
        className="w-full bg-white rounded-lg px-4 py-3 mb-4 text-black"
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        className="w-full bg-white rounded-lg px-4 py-3 mb-4 text-black"
      />

      <TextInput
        placeholder="Phone"
        placeholderTextColor="#ccc"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        className="w-full bg-white rounded-lg px-4 py-3 mb-4 text-black"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="w-full bg-white rounded-lg px-4 py-3 mb-6 text-black"
      />

      <TouchableOpacity
        onPress={handleRegister}
        className="bg-white px-6 py-3 rounded-lg w-full items-center"
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#1e3a8a" />
        ) : (
          <Text className="text-blue-950 font-bold text-lg">Register</Text>
        )}
      </TouchableOpacity>

      <View className="flex-row mt-6">
        <Text className="text-white">Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-white underline font-semibold">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
