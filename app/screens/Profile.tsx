import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'

import Colors from '../../assets/Shared/Colors';

const { width } = Dimensions.get('window');

export default function Profile() {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://media4.giphy.com/media/anwzK42TsSAd4Ad76M/giphy.gif?cid=6c09b9524iiw1h2i5j29pameq8jimgwjiovep7f48ylj35qw&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s' }}
                style={styles.Image}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    },
    Image: {
        width: 400,
        height: 400,
    }
})