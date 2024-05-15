import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
// import FontAwesome6Brands from '@expo/vector-icons/FontAwesome6Brands';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import Details from './Details';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Profile from '../screens/Profile';
import Header from '../Components/Header';
import Slider from '../Components/Slider';
import Categories from '../Components/Categories';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: RouterProps) => {




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



    <View style={{ padding: 10, margin: 10, marginTop: 50 }}>
      <Header navigation={undefined} />
      {/* <Text>Hello!</Text> */}

      <Slider />

      <Categories />

      <Button onPress={() => navigation.navigate('Details')} title="Details page" />
      <Button onPress={handleLogout} title="Logout" />



    </View>
  );
};

const Tab = createBottomTabNavigator();

const HomeWithTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#075eec',
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
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='select1' size={size} color={color} />
          )
        }}

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
