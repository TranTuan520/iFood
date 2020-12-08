import React, { Component } from 'react'
import { Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { COLORS, FONTS } from '../constants/theme'
const { width, height } = Dimensions.get('window')


const RenderFoodCartScreen = ({navigation}) => {
    return (
        <TouchableOpacity  activeOpacity = {0.9} onPress = {()=>navigation.navigate("FoodDetail")}>
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
            <View style={{ marginStart: 8, elevation: 4, }}>
                <Image source={require('../assets/food1.jpg')} style={{ width: 90, height: 90, borderRadius: 6,  }}  resizeMode="cover" />
            </View>

            <View style={{ marginHorizontal: 4, flex: 1 }}>
                {/* title and price */}
               
                    <View style={{
                        height: 50,       
                    }}>
                        <Text numberOfLines = {2} style={{ fontSize: 20, flex: 1, elevation: 4  }}>dfcdfdf edf</Text>
                
                </View >               
                {/* Price && Buttons */}
                <View style={{
                     flexDirection: 'row', flex: 1, marginHorizontal: 4, justifyContent: 'flex-end',
                     alignItems: 'flex-end'
                }}>
                    {/* price */}
                    <Text style={{ ...FONTS.h2, color: 'gray', alignItems: 'center', flex: 1, alignItems: 'flex-start' }}>$ 69.0</Text>
                    {/* Button Add to cart */}
                    <View >
                        <View style={{
                            width: 120, height: 25, backgroundColor: 'tomato', alignItems: 'center',
                            borderRadius: 4,
                            marginHorizontal: 12,
                            flexDirection:'row',
                            justifyContent:'space-between',
                            padding: 4
                            
                        }}>
                            <FontAwesome name = 'minus-circle' color = 'white' size = {22} onPress = {()=>{alert('-')}}/>
                            <Text style = {{...FONTS.h2, color :'white'}}>1</Text>
                            <FontAwesome name = 'plus-circle' color = 'white' size = {22}  onPress = {()=>{}}/>
                        </View>
                    </View>
                    {/* Button Order now */}
                    <TouchableOpacity  activeOpacity = {0.9} >
                        <View style={{
                            width: 30, height: 25, backgroundColor: 'tomato', alignItems: 'center',
                            borderRadius: 4, justifyContent:'center'
                        }}>
                             <FontAwesome name = 'trash' color = 'white' size = {22} />
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

export default RenderFoodCartScreen
