// import React from 'react';
// import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

// export default function GetStartedScreen({ navigation }: { navigation: any }) {
//   return (
//     <ScrollView className="flex-1 bg-white px-6 pt-20">
//       <View className="items-center mb-8">
//         <Image
//           source={require('../assets/logo-dark.png')}
//           className="w-28 h-28 mb-4 rounded-full border border-white"
//           resizeMode="contain"
//         />
//         <Text className="text-blue-950 text-3xl font-bold text-center">
//           Welcome to Smart Parking
//         </Text>
//         <Text className="text-gray-600 text-center mt-2">
//           Your smart solution for easy, fast, and secure parking.
//         </Text>
//       </View>

//       <View className="space-y-8">
//         <FeatureItem
//           title="🚗 Real-time Spot Availability"
//           description="Find open parking spots instantly around you."
//         />
//         <Text></Text>
//         <FeatureItem
//           title="📍 Smart Navigation"
//           description="Get guided directions to your reserved spot."
//         />
//         <Text></Text>
//         <FeatureItem
//           title="🔒 Secure & Cashless Payments"
//           description="Pay digitally with ease and safety."
//         />
//         <Text></Text>
//         <FeatureItem
//           title="📱 Manage Everything in One Place"
//           description="Book, cancel, and view parking history with a tap."
//         />
//       </View>

//       <TouchableOpacity
//         onPress={() => navigation.replace('Main', { screen: 'Home' })}
//         className="mt-10 bg-blue-950 rounded-full py-4 items-center"
//       >
//         <Text className="text-white text-lg font-bold">Get Started</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// function FeatureItem({ title, description }: { title: string; description: string }) {
//   return (
//     <View className="bg-blue-100 rounded-xl p-4 shadow-sm">
//       <Text className="text-blue-950 font-bold text-lg mb-1">{title}</Text>
//       <Text className="text-blue-950 text-sm">{description}</Text>
//     </View>
//   );
// }






// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context'; // Make sure this is installed

// export default function GetStartedScreen({ navigation }: { navigation: any }) {
//   return (
//     <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
//       <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 pt-20">
//         <View className="items-center mb-8">
//           <Image
//             source={require('../assets/logo-dark.png')}
//             className="w-28 h-28 mb-4 rounded-full border border-white"
//             resizeMode="contain"
//           />
//           <Text className="text-blue-950 text-3xl font-bold text-center">
//             Welcome to Smart Parking
//           </Text>
//           <Text className="text-gray-600 text-center mt-2">
//             Your smart solution for easy, fast, and secure parking.
//           </Text>
//         </View>

//         <View className="space-y-8">
//           <FeatureItem
//             title="🚗 Real-time Spot Availability"
//             description="Find open parking spots instantly around you."
//           />
//           <FeatureItem
//             title="📍 Smart Navigation"
//             description="Get guided directions to your reserved spot."
//           />
//           <FeatureItem
//             title="🔒 Secure & Cashless Payments"
//             description="Pay digitally with ease and safety."
//           />
//           <FeatureItem
//             title="📱 Manage Everything in One Place"
//             description="Book, cancel, and view parking history with a tap."
//           />
//         </View>

//         <TouchableOpacity
//           onPress={() => navigation.replace('Main', { screen: 'Home' })}
//           className="mt-10 bg-blue-950 rounded-full py-4 items-center"
//         >
//           <Text className="text-white text-lg font-bold">Get Started</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// function FeatureItem({ title, description }: { title: string; description: string }) {
//   return (
//     <View className="bg-blue-100 rounded-xl p-4 shadow-sm">
//       <Text className="text-blue-950 font-bold text-lg mb-1">{title}</Text>
//       <Text className="text-blue-950 text-sm">{description}</Text>
//     </View>
//   );
// }










import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function GetStartedScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingTop: 80,
            paddingBottom: insets.bottom + 40, // Ensure bottom padding
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="items-center mb-8">
            <Image
              source={require('../assets/logo-dark.png')}
              className="w-28 h-28 mb-4 rounded-full border border-white"
              resizeMode="contain"
            />
            <Text className="text-blue-950 text-3xl font-bold text-center">
              Welcome to Smart Parking
            </Text>
            <Text className="text-gray-600 text-center mt-2">
              Your smart solution for easy, fast, and secure parking.
            </Text>
          </View>

          <View className="space-y-8">
            <FeatureItem
              title="🚗 Real-time Spot Availability"
              description="Find open parking spots instantly around you."
            />
            <FeatureItem
              title="📍 Smart Navigation"
              description="Get guided directions to your reserved spot."
            />
            <FeatureItem
              title="🔒 Secure & Cashless Payments"
              description="Pay digitally with ease and safety."
            />
            <FeatureItem
              title="📱 Manage Everything in One Place"
              description="Book, cancel, and view parking history with a tap."
            />
          </View>

          <View style={{ marginTop: 40 }}>
            <TouchableOpacity
              onPress={() => navigation.replace('Main', { screen: 'Home' })}
              className="bg-blue-950 rounded-full py-4 items-center"
            >
              <Text className="text-white text-lg font-bold">Get Started</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <View className="bg-blue-100 rounded-xl p-4 shadow-sm">
      <Text className="text-blue-950 font-bold text-lg mb-1">{title}</Text>
      <Text className="text-blue-950 text-sm">{description}</Text>
    </View>
  );
}

