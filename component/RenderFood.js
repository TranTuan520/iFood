import React, { Component } from 'react'
import { Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'

import { COLORS, FONTS } from '../constants/theme'
const { width, height } = Dimensions.get('window')

 export default function RenderFood ({navigation}) {
  
    return (
        <TouchableOpacity onPress = {()=>navigation.navigate("FoodDetail")}>
            <View style={{
            flex: 1, flexDirection: 'row', width: width, height: 130, backgroundColor: '#fffff', alignItems: 'center'
        }}>
            {/* image */}
            <View style={{ marginStart: 8, elevation: 4, }}>
                <Image source={require('../assets/food1.jpg')} style={{ width: 120, height: 130, borderRadius: 4 }} resizeMode="cover" />
            </View>

            <View style={{ marginHorizontal: 4, flex: 1 }}>
                {/* title and price */}
                <View style={{
                    flexDirection: 'row',
                    flex: 1
                }}>
                    <View style={{
                        marginRight: 4,
                    }}>
                        <Text style={{ ...FONTS.h2, flex: 1, elevation: 4 }}>Đùi gà chiên   </Text>
                    </View>
                </View >
                {/* Description hay cai gi do */}
                <View style={{ height: 60 }}>
                    <Text numberOfLines={2} style={{ ...FONTS.h3, }}>Ga chien ngon vcl cac ban ah  </Text>
                </View>
                {/* Price && Buttons */}
                <View style={{
                    flexDirection: 'row', flex: 1, marginHorizontal: 4, justifyContent: 'flex-end',
                    alignItems: 'flex-end'
                }}>
                    {/* price */}
                    <Text style={{ ...FONTS.h2, color: 'gray', alignItems: 'center', flex: 1, alignItems: 'flex-start' }}>$ 69.0</Text>
                    {/* Button Add to cart */}
                    <TouchableOpacity >
                        <View style={{
                            width: 90, height: 30, backgroundColor: 'tomato', alignItems: 'center',
                            borderRadius: 4,
                            marginHorizontal: 6,
                        }}>
                            <Text style={{ ...FONTS.h3, color: 'white' }}>Add to cart</Text>
                        </View>
                    </TouchableOpacity>
                    {/* Button Order now */}
                    <TouchableOpacity >
                        <View style={{
                            width: 90, height: 30, backgroundColor: 'tomato', alignItems: 'center',
                            borderRadius: 4, 
                        }}>
                            <Text style={{ ...FONTS.h3, color: 'white' }}>Oder now</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
                    
        </View>

        {/* line */}
        <View style = {{alignItems:'flex-end', }}>
        <View style = {{width: width - 130, height: 1, backgroundColor: 'gray',  
        marginVertical: 8, }} />
        </View>
        </TouchableOpacity>
        
    )   
}


