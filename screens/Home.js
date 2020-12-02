import React, { Component } from 'react'
import { Text, View, TextInput, Dimensions, ScrollView, Image, StyleShee, TouchableOpacity , PermissionsAndroid} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Swiper from 'react-native-swiper'
import { COLORS, FONTS } from '../constants/theme'
const { width, height } = Dimensions.get('window')

import RecommendItem from '../component/RecommendItem'
import RenderFood from '../component/RenderFood'




export default class Home extends Component {
    
    
    renderHeader1() {
        return (
            <View style={{
                height: 40,
                backgroundColor: "#f5f5f5",
                borderRadius: 4,
                borderRadius: 8,
                marginHorizontal: 12,
                marginBottom: 8,
                flexDirection: 'row',
                elevation: 8,
                margin: 16,

            }}>
                <TextInput
                    placeholderTextColor='gray'
                    placeholder="oppa Tuấn muốn ăn gì nè...." style={{
                        height: 40,
                        ...FONTS.h3
                    }} />
                <View style={{
                    position: 'absolute',
                    right: 0,
                    backgroundColor: 'tomato',
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}><FontAwesome name='search' size={24} color='#ffff' /></View>
            </View>
        )
    }
    renderHeader() {
        return (
            <View style={{
                height: 70,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: "tomato",
                //paddingVertical: 4
                alignItems: 'center',
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                elevation: 8

            }}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...FONTS.h2, color: 'white', marginHorizontal: 8, }}>Good Morning</Text>
                        {/* <FontAwesome name='coffee' size={24} color='white' /> */}
                    </View>
                    <Text style={{ ...FONTS.h1, color: 'white', marginLeft: 20, }}>Tuấn</Text>
                </View>
                {/* <View style={{
                    justifyContent: 'center', alignItems: 'center',
                    width: 64, height: 64, elevation: 16, backgroundColor: 'white',
                    shadowColor: 'black',
                    borderRadius: 32, margin: 16
                }}> */}
                <Image source={require('../assets/kt.jpg')} style={{ width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: 'white', marginEnd: 6 }} resizeMode="cover" />
                {/* </View> */}
            </View>
        )
    }

    renderBanners() {
        return (
            <View style={{ alignItems: 'center', elevation: 16 }}>
                <Swiper
                    style={{
                        height: width / 2,
                        marginHorizontal: 6
                    }} autoplay autoplayTimeout={3}
                    dotColor='gray'
                    activeDotColor='tomato'
                    horizontal
                    showsHorizontalScrollIndicator={false}>
                    <Image style={{
                        height: width / 2,
                        width: width - 6,
                        borderRadius: 6,

                    }} resizeMode="contain" source={require('../assets/banners/2.jpg')} />
                    <Image style={{

                        height: width / 2,
                        width: width - 6,
                        borderRadius: 6,

                    }} resizeMode="contain" source={require('../assets/banners/0.jpg')} />
                    <Image style={{

                        height: width / 2,
                        width: width - 6,
                        borderRadius: 2,

                    }} resizeMode="contain" source={require('../assets/banners/1.jpg')} />
                    <Image style={{

                        height: width / 2,
                        width: width - 6,
                        borderRadius: 6,

                    }} resizeMode="contain" source={require('../assets/banners/3.jpg')} />
                </Swiper>
            </View>
        )
    }

    // category
    renderCategory() {
        return (
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
                    elevation: 8
                }}>
                    <FontAwesome name='list-ul' size={16} color='white'
                        style={{ marginRight: 4 }} />
                    <Text style={{
                        ...FONTS.h2, color: 'white',

                    }}>Foods</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity 
                    onPress = {()=>this.props.navigation.navigate('FoodDetail')} style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 90,
                        height: 120,
                        backgroundColor: '#ffff',
                        borderRadius: 8,
                        marginHorizontal: 8,
                        marginTop: 4,
                        elevation: 8,
                        marginBottom: 4,
                    }}>
                        <Image style={{ ...FONTS.h4 }}
                            source={require('../assets/icons/hamburger.png')}
                            style={{ height: 60, width: 60 }} />
                        <Text style={{ ...FONTS.h4, fontWeight: 'bold', color: 'gray' }}>Hamburger</Text>
                        <FontAwesome name='chevron-circle-right' size={20} color='tomato' style={{ marginVertical: 4 }} />
                    </TouchableOpacity>
                    <View style={{
                        marginTop: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 90,
                        height: 120,
                        backgroundColor: '#ffff',
                        borderRadius: 8,
                        marginHorizontal: 8,
                        elevation: 8,
                        marginBottom: 4,
                    }}>
                        <Image style={{ ...FONTS.h4 }} source={require('../assets/icons/milktea.png')} style={{ height: 60, width: 60 }} />
                        <Text style={{ ...FONTS.h4, fontWeight: 'bold', color: 'gray' }}>Milk Tea</Text>
                        <FontAwesome name='chevron-circle-right' size={20} color='tomato' style={{ marginVertical: 4 }} />
                    </View>
                    <View style={{
                        marginTop: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 90,
                        height: 120,
                        backgroundColor: '#ffff',
                        borderRadius: 8,
                        marginHorizontal: 8,
                        elevation: 8,
                        marginBottom: 4,
                    }}>
                        <Image source={require('../assets/icons/pancake.png')} style={{ height: 60, width: 60 }} />
                        <Text style={{ ...FONTS.h4, fontWeight: 'bold', color: 'gray' }}>Pancake</Text>
                        <FontAwesome name='chevron-circle-right' size={20} color='tomato' style={{ marginVertical: 4 }} />
                    </View>
                    <View style={{
                        marginTop: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 90,
                        height: 120,
                        backgroundColor: '#ffff',
                        borderRadius: 8,
                        marginHorizontal: 8,
                        elevation: 8,
                        marginBottom: 4,

                    }}>
                        <Image source={require('../assets/icons/ice-cream.png')} style={{ height: 60, width: 60 }} />
                        <Text style={{ ...FONTS.h4, fontWeight: 'bold', color: 'gray' }}>Cream</Text>
                        <FontAwesome name='chevron-circle-right' size={20} color='tomato' style={{ marginVertical: 4 }} />
                    </View>

                </ScrollView>


            </View>
        )

    }

    renderRecommend() {
        return (
            <View style={{ marginHorizontal: 8 }}>
                <View style={{
                    backgroundColor: 'tomato',
                    width: 160,
                    alignItems: 'center',
                    paddingVertical: 2,
                    marginTop: 8,
                    marginBottom: 8,
                    borderRadius: 8,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    elevation: 4
                }}>
                    <FontAwesome name='list-ul' size={16} color='white'
                        style={{ marginRight: 4 }} />
                    <Text style={{
                        ...FONTS.h2, color: 'white',
                    }}>Recommend</Text>
                </View>
                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                        <RecommendItem />
                        <RecommendItem />
                        <RecommendItem />
                        <RecommendItem />
                    </ScrollView>
                </View>
            </View>
        )
    }

    renderAllFood() {
        return (
          <View>
               <RenderFood navigation ={this.props.navigation} />               
               <RenderFood navigation ={this.props.navigation}/>
               <RenderFood navigation ={this.props.navigation}/>
               <RenderFood navigation ={this.props.navigation}/>
               <RenderFood navigation ={this.props.navigation}/>
               <RenderFood navigation ={this.props.navigation}/>
               <RenderFood navigation ={this.props.navigation}/>
               <RenderFood navigation ={this.props.navigation}/>
               <RenderFood navigation ={this.props.navigation}/>
          </View>
           
        )
    }

    //main

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fffff' }}>
                {this.renderHeader()}
                <ScrollView style={{}}>
                    {this.renderHeader1()}
                    {this.renderBanners()}
                    {this.renderCategory()}                   
                    {this.renderRecommend()}
                    {this.renderRecommend()}                   
                    {this.renderAllFood()}
                </ScrollView>
            </View>
        )
    }
}
