import React, { Component } from 'react'
import { Text, View, TextInput, Dimensions, ScrollView, Image, StyleShee, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Swiper from 'react-native-swiper'
import { COLORS, FONTS } from '../constants/theme'
const { width, height } = Dimensions.get('window')

import RecommendItem from '../component/RecommendItem'
import RenderFood from '../component/RenderFood'
export class FoodDetail extends Component {
    Food = this.props.route.params.food;
    renderHeader() {
        return (
            <View style={{ height: 70, width: width,  marginStart: 16, flexDirection:'row', alignItems:'center' }}>
                <FontAwesome name='angle-left' size={50} color='black'
                    style={{ marginRight: 16 }} onPress={() => this.props.navigation.goBack()} />
                      <Text numberOfLines = {1} style={{ ...FONTS.h1, width:width - 70}}>{this.Food.value.FoodName}</Text>
            </View>
        )
    }
    renderFood() {
        return (
            <View style={{ alignItems: 'center' }}>                                          
                <Image source={{uri: this.Food.value.FoodImage}} style={{ width: 400, height: 200, borderRadius: 13, marginVertical: 16 }} resizeMode = 'contain' ></Image>              
            </View>
        )
    }

    renderDescription() {
        return (
            <View style={{ flex: 1, paddingBottom: 8, paddingHorizontal: 16 , marginTop: 6}} >
                    <Text style={{...FONTS.h1, color: 'black',}}>Description</Text>
                <ScrollView contentContainerStyle={{}} showsVerticalScrollIndicator={false} >
                    
                    <Text style={{ ...FONTS.body2, color: COLORS.lightGray, marginHorizontal: 18 }}>
                       {this.Food.value.FoodDescription}                        
                    </Text>
                </ScrollView>
            </View>
            
        )
    }
   
    renderFooter(){
        return(
          <View style = {{justifyContent:'center', marginBottom: 6, alignItems:'center'}}>
                <View style={{ flexDirection: 'row', height: 60, width: 400, backgroundColor: '#ff8a65', borderRadius: 8, elevation: 8 }}>
            <View style={{
                width: 90, flex: 1,
                
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{ ...FONTS.h3, color: 'white' }}>$ {this.Food.value.FoodPrice}</Text>
                <Text style={{ ...FONTS.h3, color: 'white' }}>Price</Text>
            </View>
            <View style = {{ width: 1, marginVertical: 16,  backgroundColor: 'white'}}></View>
            <View style={{
                width: 90, flex: 1,
               
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{ ...FONTS.h3, color: 'white' }}>{this.Food.value.FoodType}</Text>
                <Text style={{ ...FONTS.h3, color: 'white' }}>Type</Text>
            </View>

            <TouchableOpacity activeOpacity = {0.8} style={{
                 flex: 1,
               borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:'green', elevation: 8
            }}>
                <Text style={{ ...FONTS.h3, color: 'white' }}>Add to Cart</Text>                
            </TouchableOpacity>            
        </View>
          </View>
        )
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderHeader()}
                {this.renderFood()}                
                {this.renderDescription()}  
                {this.renderFooter()}             
            </View>
        )
    }






}

export default FoodDetail
