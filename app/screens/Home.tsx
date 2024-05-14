import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import Details from './Details';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Profile from '../screens/Profile';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: RouterProps) => {
  const [user, setUser] = useState<any>(null); // State to store user information

  useEffect(() => {
    // Fetch user information when component mounts
    const fetchUserData = async () => {
      try {
        const currentUser = FIREBASE_AUTH.currentUser;
        if (currentUser) {
          // User is logged in
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();

    // Cleanup function
    return () => {
      // Perform any cleanup if needed
    };
  }, []);

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      // Navigate to the login screen or any other appropriate screen after logout
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user && (
        <>
          <View>
            {/* Removed the top title */}
            {/* <Text>Welcome to the home screen, {user.displayName}!</Text> */}
            {user.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={{ width: 100, height: 100, borderRadius: 50 }} />
            ) : (
              <Text>No photo available</Text>
            )}
          </View>
          <Button onPress={() => navigation.navigate('Details')} title="Details page" />
          <Button onPress={handleLogout} title="Logout" />
        </>
      )}
      {!user && <Text>Loading user data...</Text>}
    </View>
  );
};

const Tab = createBottomTabNavigator();

const HomeWithTabs = () => {
  return (
    <Tab.Navigator

      // screenOptions={({ route }) => ({
      //   tabBarIcon: ({ color, size }) => {
      //     let iconName;

      //     if (route.name === 'HomeScreen') {
      //       iconName = 'home';
      //     } else if (route.name === 'Details') {
      //       iconName = 'infocirlceo';
      //     }

      //     // You can add more conditions for other screens if needed

      //     return <AntDesign name={iconName} size={size} color={color} />;
      //   },
      // })}

      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      }}




    >
      <Tab.Screen name="home" component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='home' size={size} color={color} />
          )
        }}
      />
      <Tab.Screen name="Details" component={Details}


      />
      <Tab.Screen name="Profile" component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='user' size={size} color={color} />
          )
        }}
      />
      {/* Add additional screens here */}
    </Tab.Navigator >
  );
};

export default HomeWithTabs;
