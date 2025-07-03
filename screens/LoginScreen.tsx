

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useUserStore } from 'store/userStore';

type Props = {
  navigation: any;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const apiBaseUrl = "https://smart-parking-api-production.up.railway.app";

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        Alert.alert('Login Failed', result.error || 'Invalid credentials');
        setLoading(false);
        return;
      }

      const { accessToken, user } = result.data;

      useUserStore.getState().setUser({ ...user, token: accessToken });

      // // Store token and user info
      // await AsyncStorage.setItem('accessToken', accessToken);
      // await AsyncStorage.setItem('user', JSON.stringify(user));

      // Navigate to main screen
      navigation.replace('Main', { screen: 'Home' });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

//   const handleLogin = async () => {
//   if (!email || !password) {
//     Alert.alert('Error', 'Please enter both email and password.');
//     return;
//   }

//   setLoading(true);

//   try {
//     const response = await fetch(`${apiBaseUrl}/api/v1/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       Alert.alert('Login Failed', result.error || 'Invalid credentials');
//       setLoading(false);
//       return;
//     }

//     const { accessToken, user } = result.data;

//     // Store token and user info
//     await AsyncStorage.setItem('accessToken', accessToken);
//     await AsyncStorage.setItem('user', JSON.stringify(user));

//     // Fetch current user to verify token works
//     const meResponse = await fetch(`${apiBaseUrl}/api/v1/me`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     const meResult = await meResponse.json();

//     if (!meResponse.ok || !meResult.data) {
//       Alert.alert('Login Failed', 'Unable to verify user. Try again.');
//       setLoading(false);
//       return;
//     }

//     // Navigate to main screen after confirmation
//     navigation.replace('SelectLocation');

//   } catch (error) {
//     console.error(error);
//     Alert.alert('Error', 'Something went wrong. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };

// const handleLogin = async () => {
//   if (!email || !password) {
//     Alert.alert('Error', 'Please enter both email and password.');
//     return;
//   }

//   setLoading(true);

//   try {
//     const response = await fetch(`${apiBaseUrl}/api/v1/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       Alert.alert('Login Failed', result.error || 'Invalid credentials');
//       setLoading(false);
//       return;
//     }

//     const { accessToken, user } = result.data;

//     // Store token and user info
//     await AsyncStorage.setItem('accessToken', accessToken);
//     await AsyncStorage.setItem('user', JSON.stringify(user));

//     // Verify token with /me endpoint
//     const meResponse = await fetch(`${apiBaseUrl}/api/v1/me`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${accessToken}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     const meResult = await meResponse.json();

//     if (!meResponse.ok) {
//       // Handle error response (has 'error' field)
//       Alert.alert('Login Failed', meResult.error || 'Unable to verify user. Try again.');
//       setLoading(false);
//       return;
//     }

//     if (!meResult.data) {
//       // Handle unexpected response structure
//       Alert.alert('Login Failed', 'Invalid server response. Try again.');
//       setLoading(false);
//       return;
//     }

//     console.log('User verification successful:', meResult.data);

//     // Navigate to main screen
//     navigation.replace('SelectLocation');

//   } catch (error) {
//     console.error('Login error:', error);
//     Alert.alert('Error', 'Something went wrong. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };

  return (
    <View className="flex-1 bg-blue-950 justify-center items-center px-6">
      <Image
        source={require('../assets/logo-light.png')}
        className="w-24 h-24 mb-6"
        resizeMode="contain"
      />
      <Text className="text-white text-2xl font-semibold mb-6">Sign In to continue</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        className="w-full bg-white rounded-lg px-4 py-3 mb-4 text-black"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#ccc"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="w-full bg-white rounded-lg px-4 py-3 mb-6 text-black"
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPassword')}
        className="self-end mb-6"
      >
        <Text className="text-sm text-white underline">Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-white px-6 py-3 rounded-lg w-full items-center"
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#1e3a8a" />
        ) : (
          <Text className="text-blue-950 font-bold text-lg">Sign In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        className="mt-6"
      >
        <Text className="text-sm text-white underline">Not Registered? Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Main', { screen: 'Home' })}
        className="mt-6"
      >
        <Text className="text-sm text-white underline">Continue without signing in</Text>
      </TouchableOpacity>
    </View>
  );
}
