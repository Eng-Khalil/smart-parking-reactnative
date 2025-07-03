// screens/ForgotPasswordScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';

export default function ForgotPasswordScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    Alert.alert('Reset Link Sent', `Password reset instructions sent to ${email}`);
  };

  return (
    <View className="flex-1 justify-center px-4 bg-white">
       <View className="ml-44">
          <Image
                source={require('../assets/logo-dark.png')}
                className="w-24 h-24 mb-6 rounded-full"
                resizeMode="contain"
              />

       </View>
      <Text className="text-2xl font-bold text-blue-950 mb-6 text-center">Forgot Password</Text>

      <Text className="text-gray-700 mb-2">Enter your email address:</Text>
      <TextInput
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
      />

      <TouchableOpacity onPress={handleReset} className="bg-blue-950 py-3 rounded-full items-center">
        <Text className="text-white font-bold">Send Reset Link</Text>
      </TouchableOpacity>
               <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              className="bg-white self-end px-6 py-3 rounded-lg w-full items-center"
            >
              <Text className="text-sm text-blue-950 underline">Remember Password? Login</Text>
            </TouchableOpacity>
               <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              className="bg-white self-end px-6 py-3 rounded-lg w-full items-center"
            >
              <Text className="text-sm text-blue-950 underline">Not Registered? Register</Text>
            </TouchableOpacity>
    </View>
  );
}
