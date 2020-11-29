import React, { Component } from 'react'
import { Text, View, TextInput, Dimensions, ScrollView, Image, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Swiper from 'react-native-swiper'
import { COLORS, FONTS } from '../constants/theme'
const { width, height } = Dimensions.get('window')

const RecommendItem = () => {
    return (
        <View style={{
            width: 320, height: 250,
            backgroundColor: '#ffff',
            elevation: 8,
            borderRadius: 6,
            marginVertical: 8,
            marginHorizontal: 4,
            borderColor: '#f5f5f5',
            borderWidth: 1,
        }}>
            <View style={{
                width: 300,
                height: 130,
                margin: 8
            }}>
                <Image source={require('../assets/food0.jpg')} style={{ width: 300, height: 130, borderRadius: 6 }}
                    resizeMode='cover' />
            </View>
            <View style={{ marginStart: 8 }}>
                <Text style={{ ...FONTS.h2 }}>Thịt chó luộc cơm mẻ</Text>
                <View style={{ height: 2, width: 100, backgroundColor: 'gray', opacity: 0.5, marginVertical: 8, marginStart: 8 }}></View>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={{ ...FONTS.h2, marginStart: 8 }}>$ 90.00</Text>
                {/* button */}
                <View>
                    <View style={{
                        width: 95, height: 30, backgroundColor: 'white', marginStart: 64, borderRadius: 8,
                        elevation: 4, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
                    }}>
                        <FontAwesome name='plus-square' size={20} color='tomato' />
                        <Text style={{ ...FONTS.h4, marginStart: 4 }}>add to cart</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default RecommendItem
