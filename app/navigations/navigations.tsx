
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from '../../firebaseConfig';

import Home from '../screens/Home';
import Details from '../screens/Details';
import Login from '../screens/Login';
import OnboardingScreen from '../screens/OnboardingScreen';


const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
    return (
        <InsideStack.Navigator>
            <InsideStack.Screen name="OnboardingScreen" component={OnboardingScreen} />
            <InsideStack.Screen name="Home" component={Home} />
            <InsideStack.Screen name="Details" component={Details} />
        </InsideStack.Navigator>
    );
}

export default function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            //  console.log('user', user);
            setUser(user);

        })
    }, [])
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='onboardingScreen'>
                <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
                {user ? (
                    <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }} />
                ) : (
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
