import React, { Component } from 'react'
import { Text, View, TextInput, Dimensions, ScrollView, Image, StyleShee, TouchableOpacity , PermissionsAndroid, FlatList} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Swiper from 'react-native-swiper'
import { COLORS, FONTS } from '../constants/theme'
const { width, height } = Dimensions.get('window')

//database
import database from "@react-native-firebase/database";

import RecommendItem from '../component/RecommendItem'
import RenderCategory from "../component/RenderCategory";
import RenderFood from '../component/RenderFood'



export default class Home extends Component {
    state = {
        isFinish: false,
        Foods: [], 
        Categories: []
    }
    getAllFood = async ()=>{
        await database().ref('/Food/').once('value').then(snapshot=>{
         //console.log( snapshot.val())   
         const Food = []         
         snapshot.forEach((food)=>
         {         
            Food.push( food._snapshot)              
         })
         this.setState({Foods: Food})
       //  console.log(this.state.Foods)
      })
    }
    getAllCategory = async () =>{
        await database().ref('/Category/').once('value').then(snapshot=>{
            const Category = []
            snapshot.forEach((category)=>{
                Category.push(category._snapshot);
            })
            this.setState({Categories:Category})
           // console.log(Category)
         })                  
    }

    
    componentDidMount =  ()=>{        
        this.getAllFood()
        this.getAllCategory()
    }


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
                height: 55,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: "tomato",
                //paddingVertical: 4
                alignItems: 'center',
                // borderBottomLeftRadius: 8,
                // borderBottomRightRadius: 8,
                elevation: 8

            }}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...FONTS.h2, color: 'white', marginHorizontal: 8, }}>hi! Tuan Chan</Text>
                        {/* <FontAwesome name='coffee' size={24} color='white' /> */}
                    </View>
                    {/* <Text style={{ ...FONTS.h1, color: 'white', marginLeft: 20, }}>Tuấn</Text> */}
                </View>
                {/* <View style={{
                    justifyContent: 'center', alignItems: 'center',
                    width: 64, height: 64, elevation: 16, backgroundColor: 'white',
                    shadowColor: 'black',
                    borderRadius: 32, margin: 16
                }}> */}
               <TouchableOpacity  activeOpacity = {0.9} onPress = {()=>this.props.navigation.navigate('Profile')}>
               <Image source={require('../assets/avt.jpg')} style={{ width: 45, height: 45, borderRadius: 30, borderWidth: 2, borderColor: 'white', marginEnd: 6 }} resizeMode="cover"  />
               </TouchableOpacity>
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
       return(
       <View style = {{height: 190}}>
            <RenderCategory navigation = {this.props.navigation} Categories = {this.state.Categories} />
       </View>
       )

    }

    renderRecommend = () => {
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
                    elevation: 4,
                    borderTopLeftRadius: 0,
                }}>
                    <FontAwesome name='list-ul' size={16} color='white'
                        style={{ marginRight: 4 }} />
                    <Text style={{
                        ...FONTS.h2, color: 'white',
                    }}>Recommend</Text>
                </View>
                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} 
                 //pagingEnabled 
                 >
                        <RecommendItem />
                        <RecommendItem />
                        <RecommendItem />
                        <RecommendItem />
                    </ScrollView>
                </View>
            </View>
        )
    }

    _getFoodByCategory = () =>{
        
    }

    renderAllFood() {
        return (
            <View style = {{alignItems:'center'}}>
                <RenderFood navigation={this.props.navigation} Foods={this.state.Foods} />
            </View>

        )
    }

    //main

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fffff'}}>
                {this.renderHeader()}
                <ScrollView showsVerticalScrollIndicator = {false} style={{}}>
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
