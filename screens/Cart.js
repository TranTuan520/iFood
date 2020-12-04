import React, { Component } from 'react'
import { Text, View, TextInput, Dimensions, ScrollView, Image, StyleShee, TouchableOpacity, PermissionsAndroid } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Swiper from 'react-native-swiper'
import { COLORS, FONTS } from '../constants/theme'
const { width, height } = Dimensions.get('window')
import RenderFood from "../component/RenderFood";

import RenderItem from '../component/RenderFoodCartScreen'
export class Cart extends Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', marginTop: 4 }}>
                                <View style={{ flexDirection: 'row', height: 60, width: 400, backgroundColor: '#ff8a65', borderRadius: 8, elevation: 8, marginVertical: 2,  }}>
                    <View style={{
                        width: 90, flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{ ...FONTS.h3, color: 'white' }}>$ 69.00</Text>
                        <Text style={{ ...FONTS.h3, color: 'white' }}>Total Price</Text>
                    </View>


                    <TouchableOpacity style={{
                        flex: 1,
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'green', elevation: 8,

                    }}>
                        <Text style={{ ...FONTS.h2, color: 'white' }}>Check out</Text>

                    </TouchableOpacity>

                </View>
                    <ScrollView >
                        <RenderItem navigation={this.props.navigation} />
                        <RenderItem navigation={this.props.navigation} />     
                        <RenderItem navigation={this.props.navigation} />
                        <RenderItem navigation={this.props.navigation} />  
                        <RenderItem navigation={this.props.navigation} />
                        <RenderItem navigation={this.props.navigation} />                    
                    </ScrollView>
               

            </View>
        )
    }
}

export default Cart
