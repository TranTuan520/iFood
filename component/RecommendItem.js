import React, { Component } from 'react'
import { Text, View, TextInput, Dimensions, ScrollView, Image, StyleSheet, TouchableOpacity,FlatList } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Swiper from 'react-native-swiper'
import { COLORS, FONTS } from '../constants/theme'
const { width, height } = Dimensions.get('window')
import database, { firebase } from "@react-native-firebase/database";
import firestore from '@react-native-firebase/firestore'
class RecommendItem extends Component {
    state = {
        Cart: [],        
    }
    componentDidMount(){
        this.getCart()
    }
    render(){
        return(
            <FlatList 
            data = {this.props.Foods}
            renderItem = {this.renderItem}
            keyExtractor = {(item)=>item.id}
            horizontal
            showsHorizontalScrollIndicator = {false}
            extraData = {this.props.Foods}
            removeClippedSubviews      
            />
        )
    }
    getCart= ()=>{
        firestore().collection('User').doc(firebase.auth().currentUser.uid).onSnapshot(snapshot=>{     
         this.setState({Cart: snapshot._data.Cart})
        })      
      
    
    }
    
    addToCart = (foodID) => {
        const Cart = this.state.Cart
       if(this.state.Cart.filter(cart=>cart.foodID === foodID).length == 0 )
           {
               Cart.push({foodID: foodID,quantity: 1})
               firestore().collection('User').doc(firebase.auth().currentUser.uid).update({
                 Cart: Cart
               }).then()
           }
           else{
             ToastAndroid.show('ngu lz', ToastAndroid.LONG)
           }
     };
    renderItem=({item})=>{
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
                    <Image source={{uri: item._data.FoodImage}} style={{ width: 300, height: 120, borderRadius: 6 }}
                        resizeMode='cover' resizeMethod = 'resize' />
                </View>
                <View style={{ marginStart: 8 }}>
                    <Text style={{ fontSize: 22 }}>{item._data.FoodName}</Text>               
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Text style={{ fontSize: 22, marginStart: 8, color:'gray' }}>$ {item._data.FoodPrice}</Text>
                    {/* button */}
                   
                        <TouchableOpacity style = {{position: 'absolute', right: 8}} >
                            <View style={{
                                width: 90, height: 25, backgroundColor: 'tomato', alignItems: 'center',
                                borderRadius: 4,
                                marginHorizontal: 6,
                            }}>
                                <Text style={{ ...FONTS.h3, color: 'white' }}>Add to cart</Text>
                            </View>
                        </TouchableOpacity>                       
                    </View>
               
            </TouchableOpacity>
        )
    }
}

export default RecommendItem
