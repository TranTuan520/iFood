import React, { Component } from 'react'
import { Text, View, TextInput, Dimensions, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Swiper from 'react-native-swiper'
import { COLORS, FONTS } from '../constants/theme'
const { width, height } = Dimensions.get('window')

const RecommendItem = () => {
    return (
        <TouchableOpacity 
        activeOpacity = {0.9}
        style={{
            width: 300, height: 200,
            backgroundColor: '#ffff',
            elevation: 4,
            borderRadius: 6,
            marginVertical: 6,
            marginHorizontal: 4,
            borderColor: '#f5f5f5',           
        }}>
            <View style={{
                width: 300,
                height: 120,
                
            }}>
                <Image source={require('../assets/food0.jpg')} style={{ width: 300, height: 120, borderRadius: 6 }}
                    resizeMode='cover' />
            </View>
            <View style={{ marginStart: 8 }}>
                <Text style={{ ...FONTS.h2 }}>Thịt chó luộc cơm mẻ</Text>               
            </View>

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Text style={{ ...FONTS.h2, marginStart: 8, color:'gray' }}>$ 90.00</Text>
                {/* button */}
                <View style = {{flexDirection:'row'}}>
                    <TouchableOpacity style = {{marginStart: 20}} >
                        <View style={{
                            width: 90, height: 25, backgroundColor: 'tomato', alignItems: 'center',
                            borderRadius: 4,
                            marginHorizontal: 6,
                        }}>
                            <Text style={{ ...FONTS.h3, color: 'white' }}>Add to cart</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <View style={{
                            width: 90, height: 25, backgroundColor: 'tomato', alignItems: 'center',
                            borderRadius: 4,
                        }}>
                            <Text style={{ ...FONTS.h3, color: 'white' }}>Oder now</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default RecommendItem
