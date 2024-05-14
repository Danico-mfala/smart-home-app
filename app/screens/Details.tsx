import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { db } from '../../firebaseConfig';
import { ref, onValue, set } from 'firebase/database';
import ToggleSwitch from 'toggle-switch-react-native';

const Details = () => {
    const [flameStatus, setFlameStatus] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [isLed1On, setIsLed1On] = useState(false);
    const [isLed2On, setIsLed2On] = useState(false);
    const [isLed3On, setIsLed3On] = useState(false);

    useEffect(() => {
        const dataRef = ref(db);

        const fetchData = () => {
            onValue(dataRef, (snapshot) => {
                const data = snapshot.val();
                console.log("Fetched data:", data); // Log the fetched data
                if (data) {
                    setFlameStatus(data.FlameStatus);
                    setTemperature(data.Temperature);
                    setHumidity(data.Humidity);
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

    const handleToggleLed1 = (isOn) => {
        setIsLed1On(isOn);
        const newValue = isOn ? 1 : 0;
        set(ref(db, 'LED1'), newValue);
    };

    const handleToggleLed2 = (isOn) => {
        setIsLed2On(isOn);
        const newValue = isOn ? 1 : 0;
        set(ref(db, 'LED2'), newValue);
    };
    const handleToggleLed3 = (isOn) => {
        setIsLed3On(isOn);
        const newValue = isOn ? 1 : 0;
        set(ref(db, 'Door'), newValue);
    };

    return (
        <View style={styles.container}>
            <View style={styles.tempWrapper}>
                <Text style={styles.text}>{temperature !== null ? `${temperature.value}°` : 'Loading...'}</Text>
            </View>
            <View>
                <ToggleSwitch
                    isOn={isLed1On}
                    onColor={isLed1On ? "green" : "red"}
                    offColor={isLed1On ? "green" : "red"}
                    label={isLed1On ? "Led1 ON" : "Led1 OFF"}
                    labelStyle={{ color: isLed1On ? "black" : "black", fontWeight: "900" }}
                    size="large"
                    onToggle={handleToggleLed1}
                />
                <ToggleSwitch
                    isOn={isLed2On}
                    onColor={isLed2On ? "green" : "red"}
                    offColor={isLed2On ? "green" : "red"}
                    label={isLed2On ? "Led2 ON" : "Led2 OFF"}
                    labelStyle={{ color: isLed2On ? "black" : "black", fontWeight: "900" }}
                    size="large"
                    onToggle={handleToggleLed2}
                />
                <ToggleSwitch
                    isOn={isLed3On}
                    onColor={isLed3On ? "green" : "red"}
                    offColor={isLed3On ? "green" : "red"}
                    label={isLed2On ? "Door ON" : "Door OFF"}
                    labelStyle={{ color: isLed3On ? "black" : "black", fontWeight: "900" }}
                    size="large"
                    onToggle={handleToggleLed3}
                />
            </View>
            <View style={styles.data}>
                <View style={styles.spacer}></View>
                <View style={styles.dataWrapper}>
                    <View style={styles.humid}>
                        <Text style={styles.dataText}>{humidity !== null ? `${humidity.value}%` : 'Loading...'}</Text>
                        <Text style={styles.title}>Humidity</Text>
                    </View>
                    <View style={styles.pressure}>
                        <Text style={styles.dataText}>{flameStatus !== null ? flameStatus.value : 'Loading...'}</Text>
                        <Text style={styles.title}>Flame Status</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Details;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'grey'
    },
    tempWrapper: {
        flex: 1,
        justifyContent: "center",
    },
    text: {
        fontSize: 150,
        fontWeight: "100",
        textAlign: "right",
        color: "white",
        paddingRight: 35,
    },
    data: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    spacer: {
        height: "30%",
    },
    dataWrapper: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        flexDirection: "row",
        height: "20%",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "white",
    },
    humid: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    pressure: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    dataText: {
        fontSize: 20,
        fontWeight: "200",
        color: "white",
        textAlign: "center",
        fontFamily: "Helvetica",
    },
    title: {
        fontSize: 12,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        fontFamily: "Helvetica",
    },
});
