import React, { Component } from 'react'
import { Text, View, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native'
import Button from '../component/Button'

import { COLORS, FONTS } from '../constants/theme'
const { width, height } = Dimensions.get('window')

export default function RenderFood ({navigation, Foods}) {
     _RenderItem = ({item}) =>{
       return(
        <TouchableOpacity 
        activeOpacity = {0.9}
        onPress = {()=>{       
            navigation.navigate('FoodDetail', {'food': item})   
        }}>
        <View style={{
                   flex: 1,
                   flexDirection: 'row',
                   width: 420,
                   height: 100,
                   backgroundColor: '#ffff',
                   alignItems: 'center',
                   borderWidth: 2,
                   padding: 4,
                   marginVertical: 2,
                   alignItems: 'center',
                   borderRadius: 6,
                   borderColor: '#ffff',
                   elevation: 1
    }}>
        {/* image */}
        <View style={{  }}>
            <Image source={{uri: item.value.FoodImage}} style={{ width: 90, height: 90, borderRadius: 6,  }} resizeMode="cover" />
        </View>
        <View style={{ marginHorizontal: 4, flex: 1 , }}>
            {/* title and price */}
            <View style={{                             
                height: 25,               
            }}>                
                    <Text numberOfLines ={2} style={{ fontSize: 20, flex: 1, elevation: 4 }}>{item.value.FoodName}</Text>               
            </View >
            {/* Description hay cai gi do */}
            <View style={{ height: 30, flex: 1, marginTop: 6 }}>
            <Text numberOfLines={1} style={{ ...FONTS.h3, color: 'gray' }}>{item.value.FoodDescription}</Text>
            </View>
            {/* Price && Buttons */}
            <View style={{
                flexDirection: 'row', flex: 1, marginHorizontal: 4, justifyContent: 'flex-end',
                alignItems: 'flex-end'
            }}>
                {/* price */}
                <Text style={{ ...FONTS.h2, color: 'gray', alignItems: 'center', flex: 1, alignItems: 'flex-start' }}>$ {item.value.FoodPrice}</Text>
                {/* Button Add to cart */}
                <TouchableOpacity activeOpacity = {0.9}>
                    <View style={{
                        width: 90, height: 25, backgroundColor: 'tomato', alignItems: 'center',
                        borderRadius: 4, marginHorizontal: 8
                    }}>
                        <Text style={{ ...FONTS.h3, color: 'white' }}>Add to cart</Text>
                    </View>
                </TouchableOpacity>
                {/* Button Order now */}
                <TouchableOpacity activeOpacity = {0.9}>
                    <View style={{
                        width: 90, height: 25, backgroundColor: 'tomato', alignItems: 'center',
                        borderRadius: 4, 
                    }}>
                        <Text style={{ ...FONTS.h3, color: 'white' }}>Oder now</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>                
    </View>
    {/* line */}
    {/* <View style = {{alignItems:'flex-end', }}>
    <View style = {{width: width - 130, height: 1, backgroundColor: 'tomato',  
    marginVertical: 8, }} />
    </View> */}
    </TouchableOpacity>
       )
    }   
    return (  
        <FlatList data = {Foods}
        renderItem = {_RenderItem}
        showsVerticalScrollIndicator = {false}
        extraData = {Foods}
        >            
        </FlatList>
    )   
}


