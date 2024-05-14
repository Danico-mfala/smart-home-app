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
                        title: 'Onboarding 1',
                        subtitle: 'This is the first onboarding screen',
                    },
                    {
                        backgroundColor: '#fef3c7',
                        image: (
                            <View style={styles.LottieView}>
                                <Lottie
                                    source={require('../../assets/annimation/Animation2.json')}
                                    autoPlay
                                    loop
                                    style={styles.lottie}
                                />
                            </View>
                        ),
                        title: 'Onboarding 2',
                        subtitle: 'This is the second onboarding screen',
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
                        title: 'Onboarding 3',
                        subtitle: 'This is the third onboarding screen',
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
