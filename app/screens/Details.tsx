import React, { FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Linking } from 'react-native';
import { db } from '../../firebaseConfig';
import { ref, onValue, set } from 'firebase/database';
import ToggleSwitch from 'toggle-switch-react-native';
import Colors from '../../assets/Shared/Colors';
import FireAlertModal from '../Components/FireAlertModal';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';

interface FirebaseData {
    FlameStatus: { value: string };
    Temperature: { value: number };
    Humidity: { value: number };
    LED1: number;
    LED2: number;
    Door: number;
}

interface ControlProps {
    isOn: boolean;
    onToggle: (isOn: boolean) => void;
    imageUri: string;
    label: string;
    backgroundColor: string;
}

const Details = () => {
    const [flameStatus, setFlameStatus] = useState<{ value: string } | null>(null);
    const [temperature, setTemperature] = useState<{ value: number } | null>(null);
    const [humidity, setHumidity] = useState<{ value: number } | null>(null);
    const [isLed1On, setIsLed1On] = useState(false);
    const [isLed2On, setIsLed2On] = useState(false);
    const [isLed3On, setIsLed3On] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const dataRef = ref(db);

        const fetchData = () => {
            onValue(dataRef, (snapshot) => {
                const data = snapshot.val() as FirebaseData; // Cast data to FirebaseData
                console.log("Fetched data:", data); // Log the fetched data
                if (data) {
                    setFlameStatus(data.FlameStatus);
                    setTemperature(data.Temperature);
                    setHumidity(data.Humidity);
                    setIsLed1On(data.LED1 === 1);
                    setIsLed2On(data.LED2 === 1);
                    setIsLed3On(data.Door === 1);

                    // Check if flame status is detected
                    if (data.FlameStatus !== null && data.FlameStatus.value === 'Detected') {
                        setModalVisible(true);
                    }
                }
            }, (error) => {
                console.error('Error fetching data:', error);
            });
        };

        fetchData();

        // Cleanup function
        return () => {
            // Cleanup any listeners if needed
        };
    }, []);


    const handleToggleLed1 = (isOn: boolean) => {
        setIsLed1On(isOn);
        const newValue = isOn ? 1 : 0;
        set(ref(db, 'LED1'), newValue);
    };

    const handleToggleLed2 = (isOn: boolean) => {
        setIsLed2On(isOn);
        const newValue = isOn ? 1 : 0;
        set(ref(db, 'LED2'), newValue);
    };

    const handleToggleLed3 = (isOn: boolean) => {
        setIsLed3On(isOn);
        const newValue = isOn ? 1 : 0;
        set(ref(db, 'Door'), newValue);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleCall911 = () => {
        Linking.openURL('tel:911');
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Hello, Danico👋🏼</Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoTextContainer}>
                    <View>
                        <Text style={styles.temperatureText}>
                            {temperature !== null ? `${temperature.value}°C` : <Image source={require('../../assets/Loading.gif')} style={styles.spinner} />}
                        </Text>
                    </View>
                    <View style={styles.locationContainer}>
                        <Text style={{
                            color: Colors.white,
                            fontSize: 15,
                            fontWeight: '600',
                        }}>Lefkosa, Nicosia</Text>
                        <Text style={{
                            color: Colors.white,
                            fontSize: 13,
                            fontWeight: '300',
                        }}>Home connected</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={styles.infoRow}>
                            <Text style={styles.title}>
                                Humidity :  <Ionicons name='water-outline' size={14} color={Colors.white} />
                            </Text>
                            <Text style={styles.title}>
                                {humidity !== null ? `${humidity.value}%`
                                    : <Image source={require('../../assets/Loading.gif')}
                                        style={styles.spinner} />}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.title}>
                                Fire House:
                            </Text>
                            <Text style={styles.title}>
                                {flameStatus !== null ? flameStatus.value
                                    :
                                    <Image source={require('../../assets/Loading.gif')}
                                        style={styles.spinner} />}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: 'https://media.baamboozle.com/uploads/images/451679/1644391448_7750.gif' }}
                        style={styles.weatherImage}
                    />
                </View>
            </View>
            <View style={styles.controlTitleContainer}>
                <Text style={styles.controlTitle}>Your Control</Text>
            </View>
            <View style={styles.controlsContainer}>
                <Control
                    isOn={isLed1On}
                    onToggle={handleToggleLed1}
                    imageUri='https://png.pngtree.com/png-vector/20230823/ourmid/pngtree-living-room-icon-with-chair-and-a-plant-vector-png-image_6857390.png'
                    label='  Smart Lights'
                    backgroundColor='#E1AFD1'
                />
                <Control
                    isOn={isLed2On}
                    onToggle={handleToggleLed2}
                    imageUri='https://as2.ftcdn.net/v2/jpg/03/27/42/59/1000_F_327425974_RXiDtQXQcIOOcTzqugp761O6Ke3237JK.jpg'
                    label='  Smart Lights'
                    backgroundColor='#4CCD99'
                />
                <Control
                    isOn={isLed3On}
                    onToggle={handleToggleLed3}
                    imageUri='https://us.123rf.com/450wm/pixelalex/pixelalex1708/pixelalex170800023/84176983-garage-flat-line-icon.jpg?ver=6'
                    label='  Smart Door'
                    backgroundColor='#FFCCCC'
                />
            </View>
            <FireAlertModal
                visible={modalVisible}
                onCancel={handleCancel}
                onCall911={handleCall911}
            />
        </SafeAreaView>
    );
};

const Control: FC<ControlProps> = ({ isOn, onToggle, imageUri, label, backgroundColor }) => (
    <View style={[styles.control, { backgroundColor }]}>
        <Image
            source={{ uri: imageUri }}
            style={styles.controlImage}
        />
        <View>
            <Text style={styles.dataText}>
                <Octicons name='light-bulb' size={20} color={Colors.white} />
                {label}
            </Text>

            <Text>
                <Ionicons name='water-outline' size={14} color={Colors.white} />
                Living Room
            </Text>
        </View>

        <ToggleSwitch
            isOn={isOn}
            onColor={isOn ? "green" : "red"}
            offColor={isOn ? "green" : "red"}
            size="small"
            onToggle={onToggle}
        />
    </View>

);

export default Details;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 100,
        margin: 10,
        marginTop: 50,
    },
    headerContainer: {
        marginTop: 10
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        fontWeight: '500'
    },

    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: 390,
        height: 190,
        backgroundColor: '#5AB2FF',

        borderRadius: 10,
        marginTop: 20,
        gap: 20
    },
    infoTextContainer: {
        margin: 15
    },
    temperatureText: {
        fontSize: 47,
        color: Colors.white,
        fontWeight: '600',
        fontFamily: 'Hiragino Mincho ProN'
    },
    locationContainer: {
        marginTop: 5
    },
    infoRow: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        marginTop: 7
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Helvetica'
    },
    spinner: {
        width: 15,
        height: 15
    },
    imageContainer: {

    },
    weatherImage: {
        width: 160,
        height: 160
    },
    controlTitleContainer: {
        marginTop: 40,
        marginLeft: 10
    },
    controlTitle: {
        fontSize: 20,
        color: Colors.black,
        fontWeight: '500'
    },
    controlsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    control: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ffb3ff',
        width: 360,
        height: 130,
        borderRadius: 12,
        gap: 28,
        borderColor: 'white',
        borderWidth: 1
    },
    controlImage: {
        width: 90,
        height: 90,
        backgroundColor: Colors.white,
        borderRadius: 90
    },
    dataText: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: '500',

    }
});
