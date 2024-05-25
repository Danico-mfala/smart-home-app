import { View, Text, FlatList, Image, Dimensions } from 'react-native'
import React from 'react'

export default function Slider() {
    const sliderList = [
        {
            id: 1,
            name: 'Home',
            imageUrl: 'https://www.glitched.online/wp-content/uploads/2022/02/Glitched-Smart-Home-Wishlist-15.jpg'
        },
        {
            id: 2,
            name: 'Room',
            imageUrl: 'https://cdn.builtin.com/cdn-cgi/image/f=auto,fit=cover,w=1200,h=635,q=80/https://builtin.com/sites/www.builtin.com/files/2023-06/smart%20home%20technology.jpg'
        },
    ]

    return (
        <View style={{ marginTop: 30 }}>
            <FlatList
                data={sliderList}
                horizontal={true}
                showsVerticalScrollIndicator={false}

                renderItem={({ item }) => (
                    <Image source={{ uri: item.imageUrl }}
                        style={{
                            width: Dimensions.get('window').width * 0.9,
                            height: 175,
                            borderRadius: 10,
                            margin: 2
                        }}
                    />
                )}
            />
        </View>
    )
}