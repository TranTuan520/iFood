import React, { Component, useEffect, useState } from 'react'
import { Text, View, Dimensions, Image, TouchableOpacity, FlatList,StyleSheet } from 'react-native'
import Button from '../component/Button'
import firestore from '@react-native-firebase/firestore'
import database, {firebase} from '@react-native-firebase/database'
import { COLORS, FONTS } from '../constants/theme'
const { width, height } = Dimensions.get('window')
export class RenderFood extends Component {
  state = {
    Cart: new Map()
  }
  render() {
    return (
      <FlatList 
        data = {this.props.Foods}
        renderItem = {this.RenderItem}
        keyExtractor = {item=>item.id}
        showsVerticalScrollIndicator = {false}
        extraData = {this.props.Foods}
        >            
        </FlatList>
    )
  }
  componentDidMount(){
    this.getCart()
  }

  RenderItem = ({item}) => {    
    return (      
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {  
          this.props.navigation.navigate('FoodDetail', {food: item});
        }}>
        <View style={styles.containerFood}>
          {/* image */}
  
          <Image
            source={{uri: item._data.FoodImage}}
            style={styles.imgFood}
            resizeMode="cover"
          />
  
          <View style={styles.containerFood1}>
            {/* title and price */}
            <View
              style={{
                height: 25,
              }}>
              <Text numberOfLines={2} style={styles.foodName}>
                {item._data.FoodName}
              </Text>
            </View>
            {/* Description hay cai gi do nhu la rating */}
            <Text numberOfLines={1} style={styles.textDes}>
              {item._data.FoodDescription}
            </Text>
  
            {/* Price && Buttons */}
            <View style={styles.foodBottom}>
              {/* price */}
              <Text style={styles.textPrice}>$ {item._data.FoodPrice}</Text>
              {/* Button Add to cart */}
              <TouchableOpacity
                onPress={() => addToCart(item.id)}
                activeOpacity={0.9}>
                <View style={styles.button}>
                  <Text style={styles.textButton}>Add to cart</Text>
                </View>
              </TouchableOpacity>
              {/* Button Order now */}
              <TouchableOpacity activeOpacity={0.9}>
                <View style={styles.button}>
                  <Text style={styles.textButton}>Oder now</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

 addToCart = (foodKey) => {
  firestore()
    .collection('Cart').doc(firebase.auth().currentUser.uid)
    .set({              
     Cart: this.state.Cart        
    })
    .then(() => {
      ToastAndroid.show(foodKey, ToastAndroid.SHORT);
    });
};

  getCart = ()=>{
  firestore().collection('Cart').doc(firebase.auth().currentUser.uid).onSnapshot(Snapshot=>{
    console.log(Snapshot.data())
  })
}

}


const styles = StyleSheet.create({
  containerFood: {
    flex: 1,
    flexDirection: 'row',
    width: 400,
    height: 100,
    backgroundColor: '#ffff',
    alignItems: 'center',
    borderWidth: 2,
    padding: 4,
    marginVertical: 2,
    alignItems: 'center',
    borderRadius: 6,
    borderColor: '#ffff',
    elevation: 1,
  },
  imgFood: {width: 90, height: 90, borderRadius: 6},
  containerFood1: {marginHorizontal: 4, flex: 1},
  foodName: {fontSize: 18, flex: 1, elevation: 4},
  foodBottom: {
    flexDirection: 'row',
    height: 30,
    marginTop: 6,
    marginHorizontal: 4,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  textDes: {fontSize: 16, color: 'gray'},
  textPrice: {
    fontSize: 16,
    color: 'gray',
    flex: 1,
    alignItems: 'flex-start',
  },
  button: {
    width: 90,
    height: 25,
    backgroundColor: 'tomato',
    alignItems: 'center',
    borderRadius: 4,
    marginHorizontal: 8,
  },
  textButton: {fontSize: 16, color: 'white'},
});

export default RenderFood
