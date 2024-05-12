import { View, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
    return (
        <View style={styles.container}>
            <Onboarding
                pages={[
                    {
                        backgroundColor: '#a7f3d0',
                        image: (
                            <View style={styles.lottieContainer}>
                                <LottieView
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
                            <View style={styles.lottieContainer}>
                                <LottieView
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
                            <View style={styles.lottieContainer}>
                                <LottieView
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    lottieContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottie: {
        width: width * 0.9,
        height: width * 0.9,
    },
});
