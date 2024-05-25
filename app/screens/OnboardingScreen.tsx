import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');

const OnboardingScreen: React.FC = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(false); // Simulating initialization completion
    }, []);

    const handleDone = () => {
        navigation.navigate('Login');
    };

    if (isLoading) {
        return null; // or render a loading indicator
    }

    return (
        <View style={styles.container}>
            <Onboarding
                onDone={handleDone}
                onSkip={handleDone}
                containerStyles={{ paddingHorizontal: 15 }}
                pages={[
                    {
                        backgroundColor: '#a7f3d0',
                        image: (
                            <View style={styles.LottieView}>
                                <Lottie
                                    source={require('../../assets/annimation/Animation1.json')}
                                    autoPlay
                                    loop
                                    style={styles.lottie}
                                />
                            </View>
                        ),
                        title: 'Control Your Home',
                        subtitle: 'Manage your home\'s IoT devices with ease.',
                    },
                    {
                        backgroundColor: 'white',
                        image: (
                            <View style={styles.LottieView}>
                                <Lottie
                                    source={require('../../assets/annimation/Animation4.json')}
                                    autoPlay
                                    loop
                                    style={styles.lottie}
                                />
                            </View>
                        ),
                        title: 'Sustainability First',
                        subtitle: 'Reduce energy consumption and promote sustainability.',
                    },
                    {
                        backgroundColor: '#a78bfa',
                        image: (
                            <View style={styles.LottieView}>
                                <Lottie
                                    source={require('../../assets/annimation/Animation3.json')}
                                    autoPlay
                                    loop
                                    style={styles.lottie}
                                />
                            </View>
                        ),
                        title: 'Smart Living',
                        subtitle: 'Experience the convenience of smart living solutions.',
                    },
                ]}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    lottieContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    LottieView: {
        width: width * 0.9,
        height: width,
    },
    lottie: {
        width: width * 0.9,
        height: width,
    },
});

export default OnboardingScreen;
