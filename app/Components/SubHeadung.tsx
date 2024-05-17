import { View, Text, FlatList, Image, Dimensions } from 'react-native'
import React from 'react'
import { FlashList } from '@shopify/flash-list'


export default function SubHeadung() {
    const sliderList = [
        {
            id: 1,
            name: 'Home',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwXs5ngv6cMdeN_Gpj9T86UE6F_PvH18ZejLQ_yY3G-351CAet8l1L_0IJPxEmrD2f4T8&usqp=CAU'
        },
        {
            id: 2,
            name: 'Room',
            imageUrl: 'https://rnb.scene7.com/is/image/roomandboard/homepageHero_freshFinds_1920?size=2400,2400&scl=1'
        }
    ]

    return (
        <View style={{ marginTop: 40 }}>
            <Text>SubHeadung</Text>
            <FlatList
                data={sliderList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Image source={{ uri: item.imageUrl }}
                        style={{
                            width: Dimensions.get('window').width * 0.9,
                            height: 170,
                            borderRadius: 10,
                            margin: 2
                        }}
                    />
                )}
            />
        </View>
    )
}