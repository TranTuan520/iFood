import React, { Component } from 'react'
import { Text, View, TextInput, Dimensions, ScrollView, Image, StyleShee, TouchableOpacity , PermissionsAndroid, FlatList} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Swiper from 'react-native-swiper'
import { COLORS, FONTS } from '../constants/theme'
const { width, height } = Dimensions.get('window')

//database
import database from "@react-native-firebase/database";

import RecommendItem from '../component/RecommendItem'
import RenderFood from '../component/RenderFood'

const RenderCategory = ({navigation, Categories}) => {
    _RenderItem = ({item}) =>{
    return(
        <TouchableOpacity  
         activeOpacity = {0.9}
        onPress = {()=>navigation.navigate('FoodByCategory', {CatId: item.value.CategoryName})} style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 90,
            height: 120,
            backgroundColor: '#ffff',
            borderRadius: 8,
            marginHorizontal: 8,
            marginTop: 4,
            elevation: 4,
            marginBottom: 4,
        }}>
            <Image style={{ ...FONTS.h4 }}
                source={{uri: item.value.CategoryImage}}
                style={{ height: 60, width: 60 }} />
            <Text style={{ ...FONTS.h4, fontWeight: 'bold', color: 'gray' }}>{item.value.CategoryName}</Text>
            <FontAwesome name='angle-double-right' size={24}  color='tomato' style={{ marginVertical: 4 }} />
        </TouchableOpacity>
    )
    }
return(
        <View style={{
            flex: 1,
            //backgroundColor: 'rgba(0,0,0,0.3)',             
            margin: 6,
            borderRadius: 10,
        }}>
            <View style={{
                backgroundColor: 'tomato',
                width: 100,
                alignItems: 'center',
                paddingVertical: 2,
                marginTop: 8,
                marginBottom: 4,
                borderRadius: 8,
                justifyContent: 'center',
                flexDirection: 'row',
                elevation: 8,
                borderTopLeftRadius: 0,                
            }}>
                <FontAwesome name='list-ul' size={16} color='white'
                    style={{ marginRight: 4 }} />
                <Text style={{
                    ...FONTS.h2, color: 'white',

                }}>Foods</Text>
            </View>
            <FlatList horizontal data = {Categories}
                extraData = {Categories}
                renderItem = {_RenderItem}
               // keyExtractor = {(item)=>console.log(item)}
                showsHorizontalScrollIndicator = {false}
            />


        </View>       
    )
}

export default RenderCategory
