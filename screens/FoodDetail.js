import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONTS} from '../constants/theme';
const {width, height} = Dimensions.get('window');
import database, {firebase} from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore'
export class FoodDetail extends Component {
  Food = this.props.route.params.food;
  state = {
    Cart: []
  }


  renderHeader() {
    return (
      <View
        style={{
          width: width,
          paddingLeft: 8,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
          elevation: 4,
        }}>
        <FontAwesome
          name="angle-left"
          size={50}
          color="black"
          style={{marginRight: 16,  width: 42}}
          onPress={() => this.props.navigation.goBack()}
        />
        <Text numberOfLines={1} style={{fontSize: 22, width: width - 70}}>
          {this.Food._data.FoodName}
        </Text>
      </View>
    );
  }
  renderFood() {
    return (
      <View style={{alignItems: 'center'}}>
        <Image
          source={{uri: this.Food._data.FoodImage}}
          style={{
            width: 400,
            height: 200,
            borderRadius: 13,
            marginVertical: 16,
          }}
          resizeMode="contain"></Image>
      </View>
    );
  }

  renderDescription() {
    return (
      <View
        style={{
          flex: 1,
          paddingBottom: 8,
          paddingHorizontal: 16,
          marginTop: 6,
        }}>
        <Text style={{...FONTS.h1, color: 'black'}}>Description</Text>
        <ScrollView
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}>
          <Text
            style={{
              ...FONTS.body2,
              color: COLORS.lightGray,
              marginHorizontal: 18,
            }}>
            {this.Food._data.FoodDescription}
          </Text>
        </ScrollView>
      </View>
    );
  }

  renderFooter() {
    return (
      <View
        style={{
          justifyContent: 'center',
          marginBottom: 6,
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            height: 60,
            width: 400,
            backgroundColor: '#ff8a65',
            borderRadius: 8,
            elevation: 8,
          }}>
          <View
            style={{
              width: 90,
              flex: 1,

              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{...FONTS.h3, color: 'white'}}>
              $ {this.Food._data.FoodPrice}
            </Text>
            <Text style={{...FONTS.h3, color: 'white'}}>Price</Text>
          </View>
          <View
            style={{
              width: 1,
              marginVertical: 16,
              backgroundColor: 'white',
            }}></View>
          <View
            style={{
              width: 90,
              flex: 1,

              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{...FONTS.h3, color: 'white'}}>
              {this.Food._data.FoodType}
            </Text>
            <Text style={{...FONTS.h3, color: 'white'}}>Type</Text>
          </View>

          <TouchableOpacity
            onPress={() => this.addToCart(this.Food.id)}
            activeOpacity={0.8}
            style={{
              flex: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'green',
              elevation: 8,
            }}>
            <Text style={{...FONTS.h3, color: 'white'}}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
           }).then(()=>console.log(this.state.Cart))
       }
       else{
         ToastAndroid.show('ngu lz', ToastAndroid.LONG)
       }
 };
 
  componentDidMount(){
this.getCart()
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fffff'}}>
        {this.renderHeader()}
        {this.renderFood()}
        {this.renderDescription()}
        {this.renderFooter()}
      </View>
    );
  }
}

export default FoodDetail;
