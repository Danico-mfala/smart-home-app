import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Profile from '../screens/Profile';
import { NavigationProp } from '@react-navigation/native';
import Colors from '../../assets/Shared/Colors';
import { FIREBASE_AUTH } from '../../firebaseConfig';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

export default function Header({ navigation }: RouterProps) {


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
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <View>
                    <Image source={{ uri: 'https://i.pinimg.com/564x/de/6e/8d/de6e8d53598eecfb6a2d86919b267791.jpg' }}
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 50,
                        }}
                    />
                </View>
                <View>
                    <Text>Hello,👋🏼</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Danico</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={handleLogout}>
                    <AntDesign name='setting' size={30} color={Colors.light_gray} />
                </TouchableOpacity>
            </View>
        </View>

    )
}