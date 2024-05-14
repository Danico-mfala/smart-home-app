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

function InsideLayout() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
    );
}

export default function App() {
    const [user, setUser] = useState<User | null>(null);
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
            if (initializing) {
                setInitializing(false);
            }
        });

        return () => unsubscribe();
    }, [initializing]);

    if (initializing) {
        return null; // or render a loading indicator
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={user ? "Inside" : "OnboardingScreen"} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Details" component={Details} />
                <Stack.Screen name="Inside" component={InsideLayout} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
