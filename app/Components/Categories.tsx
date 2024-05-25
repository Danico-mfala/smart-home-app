import { View, Text, FlatList, Image, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../../assets/Shared/Colors';


export default function Categories() {
    const catList = [
        {
            id: 1,
            name: 'water',
            imageUrl: 'https://www.freeiconspng.com/thumbs/water-services-icon/water-services-icon-11.png'
        },
        {
            id: 2,
            name: 'Panosolar',
            imageUrl: 'https://as1.ftcdn.net/v2/jpg/05/50/51/74/1000_F_550517478_pqKOUpiR65GgyuCvld9Stag97lkPwjdA.jpg'
        }, {
            id: 3,
            name: 'Camera',
            imageUrl: 'https://img.myloview.com.br/posters/surveillance-camera-or-security-camera-icon-logo-design-black-symbol-isolated-on-white-background-vector-eps-10-700-199226731.jpg'
        }, {
            id: 4,
            name: 'Energy',
            imageUrl: 'https://static.thenounproject.com/png/528236-200.png'
        }
    ]
    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: Colors.primary,
                marginBottom: 5,

            }}>Controle</Text>

            <FlatList
                data={catList}
                style={{ marginTop: 10 }}
                columnWrapperStyle={{
                    flex: 1,
                    justifyContent: 'space-between'
                }}
                numColumns={4}
                showsVerticalScrollIndicator={true}
                renderItem={({ item }) => (
                    <View style={{ alignItems: 'center', gap: 5 }}>
                        <View style={{
                            backgroundColor: Colors.white,
                            borderRadius: 99,

                        }}>
                            <Image source={{ uri: item.imageUrl }}
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 99,
                                }}
                            />

                        </View>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: '500',
                            color: Colors.primary
                        }}>{item.name}</Text>
                    </View>
                )
                }
            />
        </View >
    )
}