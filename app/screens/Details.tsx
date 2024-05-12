import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { db } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';

const Details = () => {
    const [flameStatus, setFlameStatus] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);

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

    return (
        <View style={styles.container}>
            <View style={styles.tempWrapper}>
                <Text style={styles.text}>{temperature !== null ? `${temperature.value}°` : 'Loading...'}</Text>
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
