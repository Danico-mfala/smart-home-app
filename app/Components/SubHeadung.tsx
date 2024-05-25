import { View, Text, FlatList, Image, Dimensions } from 'react-native'
import React from 'react'
import { FlashList } from '@shopify/flash-list'
import Colors from '../../assets/Shared/Colors'


export default function SubHeadung() {
    const sliderList = [
        {
            id: 1,
            name: 'Home',
            imageUrl: 'https://s.wsj.net/public/resources/images/OG-DK812_201911_M_20191112121209.gif'
        },
        {
            id: 2,
            name: 'Room',
            imageUrl: 'https://fs.npstatic.com/userfiles/7698413/image/Sans_titre__4-w782.png'
        },
        {
            id: 3,
            name: 'Home',
            imageUrl: 'https://i.pinimg.com/originals/63/1b/cf/631bcf97f3c3e8ca097790c9a800a78b.gif'
        },
        {
            id: 4,
            name: 'Room',
            imageUrl: 'https://www.gearpatrol.com/wp-content/uploads/sites/2/2019/10/Smart-Home-Rounup-gear-patrol-feature.gif'
        }
    ]

    return (
        <View style={{
            marginTop: 40,
        }}>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: Colors.primary,
                marginBottom: 15,
            }} >My Devices</Text>
            <FlatList
                data={sliderList}
                showsVerticalScrollIndicator={true}
                horizontal={true}

                renderItem={({ item }) => (
                    <Image source={{ uri: item.imageUrl }}
                        style={{
                            width: 170,
                            height: 190,
                            borderRadius: 8,
                            margin: 2,
                        }}
                    />
                )}
            />
        </ View>
    )
}