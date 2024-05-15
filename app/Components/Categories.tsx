import { View, Text, FlatList, Image, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../../assets/Shared/Colors';


export default function Categories() {
    const catList = [
        {
            id: 1,
            name: 'water',
            imageUrl: 'https://cdn.icon-icons.com/icons2/2738/PNG/512/glass_fill_water_icon_175790.png'
        },
        {
            id: 2,
            name: 'Panosolar',
            imageUrl: 'https://as1.ftcdn.net/v2/jpg/05/50/51/74/1000_F_550517478_pqKOUpiR65GgyuCvld9Stag97lkPwjdA.jpg'
        }, {
            id: 3,
            name: 'Panosolar',
            imageUrl: 'https://as1.ftcdn.net/v2/jpg/05/50/51/74/1000_F_550517478_pqKOUpiR65GgyuCvld9Stag97lkPwjdA.jpg'
        }, {
            id: 4,
            name: 'Panosolar',
            imageUrl: 'https://as1.ftcdn.net/v2/jpg/05/50/51/74/1000_F_550517478_pqKOUpiR65GgyuCvld9Stag97lkPwjdA.jpg'
        }
    ]
    return (
        <View style={{ marginTop: 20 }}>
            <Text>Devices</Text>

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
                            backgroundColor: Colors.secondery,
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
                        <Text>{item.name}</Text>
                    </View>
                )
                }
            />
        </View >
    )
}