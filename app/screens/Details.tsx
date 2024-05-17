import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { db } from '../../firebaseConfig';
import { ref, onValue, set } from 'firebase/database';
import ToggleSwitch from 'toggle-switch-react-native';
import Colors from '../../assets/Shared/Colors';

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
        <SafeAreaView style={styles.container}>
            {/* <View style={styles.tempWrapper}> */}
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginTop: 30 }}>
                    <Image source={{ uri: 'https://nashvillesevereweather.com/wp-content/uploads/2020/01/19_mostlysunny.gif' }}
                        style={{
                            width: 160,
                            height: 160,

                        }}
                    />
                </View>

                <View>
                    <Text style={styles.text}>{temperature !== null ? `${temperature.value}°` : 'Loading...'}</Text>
                </View>

            </View>





            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <View>
                    <Text>Your Rooms</Text>
                    <Text>+ Add</Text>
                </View>

                <View style={{
                    backgroundColor: Colors.primary,
                    width: 370,
                    height: 100,
                    borderRadius: 12
                }}>
                    <ToggleSwitch
                        isOn={isLed1On}
                        onColor={isLed1On ? "green" : "red"}
                        offColor={isLed1On ? "green" : "red"}
                        //  label={isLed1On ? "Led1 ON" : "Led1 OFF"}
                        labelStyle={{ color: isLed1On ? "black" : "black", fontWeight: "900" }}
                        size="small"
                        onToggle={handleToggleLed1}
                    />
                </View>

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
        </SafeAreaView>
    );
};

export default Details;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 100,
        backgroundColor: 'grey'
    },
    tempWrapper: {
        display: 'flex',
        justifyContent: "center",
    },
    text: {
        fontSize: 70,
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
