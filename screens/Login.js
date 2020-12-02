import React, { Component } from 'react'
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { COLORS, FONTS } from '../constants/theme'
const { width, height } = Dimensions.get('window')
export class Login extends Component {
    render() {
        return (
            <ImageBackground source={require('../assets/bg.jpg')}
                style={{ flex: 1, alignItems: 'center' }}>
                <Image source={require('../assets/logo-ifood.png')} style = {{marginVertical: 32}} />
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: 250,
                    height: 38,
                    borderWidth: 2,
                    borderRadius: 4,
                    borderColor: 'tomato',
                    elevation: 1
                }}>
                    <FontAwesome name='envelope-square' size={32} color='tomato' style={{ marginStart: 6 }} />
                    <TextInput placeholder='Enter User name or Email' height={40} onChangeText={() => { }} />
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: 250,
                    height: 38,
                    borderWidth: 2,
                    borderRadius: 4,
                    borderColor: 'tomato',
                    elevation: 1,
                    marginTop: 8
                }}>
                    <FontAwesome name='lock' size={32} color='tomato' style={{ marginStart: 6 }} />
                    <TextInput placeholder='  Enter Password' height={40} secureTextEntry onChangeText={() => { }} />
                </View>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <TouchableOpacity style={{ width: 70, height: 40, alignItems: 'center', backgroundColor: 'tomato', borderRadius: 8, elevation: 4, marginHorizontal: 4 }}>
                        <Text style={{ ...FONTS.h2, color: 'white' }} >Login</Text>
                    </TouchableOpacity>
                    {/*  */}
                </View>
                <Text style={{ ...FONTS.h3, color: 'tomato' }}>Foget Passord? </Text>
            </ImageBackground>

        )
    }
}

export default Login
