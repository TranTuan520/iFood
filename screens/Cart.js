import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import {COLORS, FONTS} from '../constants/theme';

import database, {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
import RenderItem from '../component/RenderFoodCartScreen';
export class Cart extends Component {
    state = {
        Products: [],
        Foods: [],
        total: 0,
        userID: firebase.auth().currentUser.uid
    }
    getFoodByID = async(productKey)=>{
        await database()
        .ref('/Food').equalTo(productKey)
        .once('value')
        .then((snapshot) => {
          console.log( snapshot._snapshot.value)
          const Foods = [];
        //   snapshot.forEach((food) => {
        //     Foods.push(food._snapshot);
        //   });
        //   this.setState({Foods});
        //  console.log(this.state.Foods)
        });
    }
    getCart = async()=>{
      //  console.log(firebase.auth().currentUser.uid)
        await database().ref(`/Cart/${firebase.auth().currentUser.uid}/`).on('value', snapshot => {
            const Products = []
            snapshot.forEach(pro => {
               {                   
                    Products.push(pro._snapshot)}
            })
            this.setState({ Products })
            console.log(this.state.Products)
        })
    }
    totalPrice = ()=>{
        var total = 0;
        this.state.Products.forEach(product=>{
            
        })
    }
    componentDidMount(){
        this.getCart()
        this.getFoodByID('-MNj-iIZR1ZtSUzSC3j4');
        
    }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerPanel}>
          <View
            style={styles.panelStart}>
            <Text style={styles.textPrice}>$ 69.00</Text>
            <Text style={[styles.textPrice, {fontSize: 16}]}>Total Price</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.containerButton}>
            <Text style={styles.textButton}>Check out</Text>
          </TouchableOpacity>
        </View>
        <RenderItem Foods = {this.state.Products} navigation = {this.props.navigation} />
      </View>
    );
  }



}
const styles = StyleSheet.create({
  containerButton: {
    flex: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    elevation: 8,
  },
  textButton: {
      fontSize: 22,
       color: 'white'
    },
  textPrice: {
      fontSize: 18, 
      color: 'white'},
  container: {
      flex: 1, 
      alignItems: 'center',
       marginTop: 4},
  containerPanel: {
    flexDirection: 'row',
    height: 60,
    width: 400,
    backgroundColor: '#ff8a65',
    borderRadius: 8,
    elevation: 8,
    marginVertical: 2,
  },
  panelStart:{
    width: 90,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Cart;
