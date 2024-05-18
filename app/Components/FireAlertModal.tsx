import React from 'react';
import { Modal, View, Text, Image, Button, StyleSheet } from 'react-native';

const FireAlertModal = ({ visible, onCancel, onCall911 }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Image
                        source={{ uri: 'https://community.wacom.com/en-de/wp-content/uploads/sites/20/2023/10/Flame_GIF_2.gif' }}
                        style={styles.alertImage}
                    />
                    <Text style={styles.modalText}>A fire has been detected. Do you want to call 911?</Text>
                    <View style={styles.buttonContainer}>
                        <Button title="Cancel" onPress={onCancel} />
                        <Button title="Call 911" onPress={onCall911} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    alertImage: {
        width: 100,
        height: 100,
        marginBottom: 15,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default FireAlertModal;
