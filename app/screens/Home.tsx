import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import Details from './Details';
import Colors from '../../assets/Shared/Colors';
import Profile from '../screens/Profile';
import Header from '../Components/Header';
import Slider from '../Components/Slider';
import Categories from '../Components/Categories';
import SubHeadung from '../Components/SubHeadung';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Home: React.FC<RouterProps> = ({ navigation }) => {
  return (
    <View style={{ marginTop: 40, backgroundColor: 'transparent', height: 'auto' }}>
      <View style={{ padding: 10 }}>
        <Header navigation={navigation} />
        <Slider />
        <Categories />
        <SubHeadung />
        {/* <Button onPress={() => navigation.navigate('Details')} title="Details page" />
        <Button onPress={async () => {
          try {
            await FIREBASE_AUTH.signOut();
            navigation.navigate('Login');
          } catch (error) {
            console.error('Error signing out:', error);
          }
        }} title="Logout" /> */}
      </View>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const HomeWithTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#075eec',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='home' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={Details}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='select1' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='user' size={size} color={color} />
          ),
        }}
      />
      {/* Add additional screens here */}
    </Tab.Navigator>
  );
};

export default HomeWithTabs;
