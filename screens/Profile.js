import React, { Component } from 'react'
import { Text, View, TextInput, Dimensions, ScrollView, Image, StyleShee, TouchableOpacity, PermissionsAndroid , ToastAndroid} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Swiper from 'react-native-swiper'
import { COLORS, FONTS } from '../constants/theme'
const { width, height } = Dimensions.get('window')


export default class Profile extends Component {

    renderHeader = () => {
        return (
            <View style={{
                height: 200,
                backgroundColor: 'tomato',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomStartRadius: 18,
                borderBottomEndRadius: 18

            }}>
                {/* avatar */}
                <View style={{
                    height: 120,
                    width: 120,
                    borderRadius: 60,
                    elevation: 16,
                    

                }}>
                    <Image source={require('../assets/avt.jpg')}
                        style={{
                            height: 120,
                            width: 120,
                            borderRadius: 60,
                            borderWidth: 2,
                            borderColor: 'white'
                        }} />
                </View>
                
                <View style = {{position:'absolute', left:16, top: 8}}>
                <FontAwesome name='angle-left' size={50} style={{ marginEnd: 6 }} color='white' onPress={() => this.props.navigation.goBack()}/>
                </View>
                {/* name */}
               <View style = {{flexDirection:'row'}}>
               <Text style={{ ...FONTS.h1, marginStart: 32, color: 'black' }}>Tuan Chan </Text>               
               </View>
               
                <View style={{ flexDirection: 'row' }}>
                    
                    <Text style = {{color:'black'}}>Con meo ngu ngoc dang iu :3 </Text>
                </View>
            </View>
        )
    }
    renderInfo = () => {
        return (
            <ScrollView style={{ marginHorizontal: 16, marginTop: 16 }}>
                <View style={{
                    flexDirection: 'row',
                    marginVertical: 4,
                    alignItems: 'center',
                    backgroundColor: 'tomato',
                    width: 140,
                    justifyContent: 'center',
                    borderRadius: 8,
                    elevation: 4,
                    borderTopLeftRadius: 0
                }}>
                    <FontAwesome name='info' size={24} style={{ marginEnd: 6 }} color='white' />
                    <Text style={{ ...FONTS.h2, color: 'white' }}>Infomation</Text>
                </View>
                <View style={{ flexDirection: 'row', marginVertical: 4, marginStart: 32 }}>
                    <FontAwesome name='phone' size={22} style={{ width: 26, height: 22 }} />
                    <Text style={{ ...FONTS.h3 }}>0938661601</Text>
                </View>
                <View style={{ flexDirection: 'row', marginVertical: 4, marginStart: 32 }}>
                    <FontAwesome name='envelope' size={22} style={{ width: 26, height: 22 }} />
                    <Text style={{ ...FONTS.h3 }}>tranquangtuan.it@gmail.com</Text>
                </View>
                <View style={{ flexDirection: 'row', marginVertical: 4, marginStart: 32 }}>
                    <FontAwesome name='map-marker' size={22} style={{width: 26, height: 22, }} />
                    <Text style={{ ...FONTS.h3 }}>Pham Van Dong, Thu Duc, Ho Chi Minh</Text>
                </View>

                {/*  */}

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 16,
                    alignItems: 'center',
                    backgroundColor: 'tomato',
                    width: 100,
                    justifyContent: 'center',
                    borderRadius: 8,
                    elevation: 4,
                    borderTopLeftRadius: 0
                    
                }}>
                    <FontAwesome name='sliders' size={24} style={{ marginEnd: 6 }} color='white' />
                    <Text style={{ ...FONTS.h2, color: 'white' }}>Option</Text>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', marginVertical: 6, marginStart: 32,width: 130, elevation: 4}} onPress = {()=>this.props.navigation.navigate('ChangeInfo')}>
                    <FontAwesome name='cog' size={22} style={{ width: 26, height: 22 }} />
                    <Text style={{ ...FONTS.h3 }}>Change Info</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row', marginVertical: 6, marginStart: 32,width: 170, }}>
                    <FontAwesome name='question-circle' size={22} style={{ width: 26, height: 22 }} />
                    <Text style={{ ...FONTS.h3 }}>Help & Feedback</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row', marginVertical: 6, marginStart: 32,width: 120, }}>
                    <FontAwesome name='address-book' size={22} style={{ width: 26, height: 22}} />
                    <Text style={{ ...FONTS.h3 }}>Contact US</Text>
                </TouchableOpacity>  

                <TouchableOpacity style={{ flexDirection: 'row', marginVertical: 6, marginStart: 32,width: 120, }}
                onPress = {()=>this.logout()}>
                    <FontAwesome name='sign-out' size={22} style={{ width: 26, height: 22}} />
                    <Text style={{ ...FONTS.h3 }}>Logout</Text>
                </TouchableOpacity>            
            </ScrollView>
        )
    }

    logout = ()=>{
        ToastAndroid.show('Logout..... :(', ToastAndroid.LONG)
        setTimeout(()=>{            
            this.props.navigation.navigate('Login')
            }
            , 290000)
    }

    render() {
        return (
            <View style={{

                backgroundColor: '#fffff'
            }}>
                {this.renderHeader()}
                {this.renderInfo()}
            </View>
        )
    }
}
