import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Modal,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import database, {firebase} from '@react-native-firebase/database';
import RenderFood from '../component/RenderFood';
import RenderItem from '../component/RenderFoodCartScreen';
const {width, height} = Dimensions.get('window');
export class Cart extends Component {
  state = {
    Products: [],
    Foods: [],
    total: 0,
    userID: firebase.auth().currentUser.uid,
    Cart: [],
    FoodInCart: [],
    totalPrice: 0,
  };
  getAllFood = () => {
    firestore()
      .collection('Food')
      .onSnapshot((documentSnapshot) => {
        const Foods = [];
        documentSnapshot.forEach((e) => {
          Foods.push(e);
        });
        this.setState({Foods});
        this.getFoodInCart();
        this.totalPrice();
      });
  };

  productPlus = (FoodID) => {
    var Cart = this.state.Cart;
    for (var i = 0; i < Cart.length; i++) {
      if (Cart[i].foodID === FoodID) {
        Cart[i].quantity += 1;
        break;
      }
    }
    // this.setState({Cart})
    firestore().collection('User').doc(firebase.auth().currentUser.uid).update({
      Cart: Cart,
    });
  };

  productMinus = (FoodID) => {
    var Cart = this.state.Cart;
    for (var i = 0; i < Cart.length; i++) {
      console.log('loop');
      if (Cart[i].foodID === FoodID)
        if (Cart[i].quantity > 1) {
          Cart[i].quantity -= 1;
          break;
        } else {
          Cart = this.state.Cart.filter((i) => i.foodID != FoodID);
          break;
        }
    }
    firestore().collection('User').doc(firebase.auth().currentUser.uid).update({
      Cart: Cart,
    });
  };
  removeProduct = (FoodID) => {
    const Cart = this.state.Cart.filter((i) => i.foodID != FoodID);
    firestore().collection('User').doc(firebase.auth().currentUser.uid).update({
      Cart: Cart,
    });
  };

  getCart = () => {
    firestore()
      .collection('User')
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((snapshot) => {
        this.setState({Cart: snapshot._data.Cart});
        this.getFoodInCart();
        this.totalPrice();
      });
  };
  totalPrice = () => {
    var totalPrice = 0;
    this.state.FoodInCart.forEach((food) => {
      totalPrice += this.getQuantity(food.id) * food._data.FoodPrice;
    });
    this.setState({totalPrice});
  };
  getQuantity = (foodID) => {
    var quantity = 0;
    this.state.Cart.forEach((product) => {
      if (product.foodID === foodID) quantity = product.quantity;
    });
    return quantity;
  };
  componentDidMount() {
    this.getAllFood();
    this.getCart();
  }
  getFoodInCart = () => {
    const FoodInCart = [];
    this.state.Cart.forEach((product) => {
      this.state.Foods.forEach((food) => {
        if (product.foodID === food.id) FoodInCart.push(food);
      });
    });
    this.setState({FoodInCart});
  };
  //clear
  checkout = () => {
    firestore()
      .collection('User')
      .doc(firebase.auth().currentUser.uid)
      .update({
        Cart: [],
      })
      .then(() => {
        Alert.alert('yeahhhh', 'thanh toán thành công gòi nè');
      });
  };
  checkoutPanel = () => {
    return (
      <Modal transparent visible={true}>
        <TouchableWithoutFeedback >
          <View style={styles.containerCheckoutPanel}>
            <View style = {styles.checkoutFooter}> 

            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerPanel}>
          <View style={styles.panelStart}>
            <Text style={styles.textPrice}>$ {this.state.totalPrice}</Text>
            <Text style={[styles.textPrice, {fontSize: 16}]}>Total Price</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.checkout();
            }}
            activeOpacity={0.8}
            style={styles.containerButton}>
            <Text style={styles.textButton}>Check out</Text>
          </TouchableOpacity>
        </View>
       {this.checkoutPanel()}
        <RenderItem
          Foods={this.state.FoodInCart}
          navigation={this.props.navigation}
          getQuantity={this.getQuantity}
          productPlus={this.productPlus}
          productMinus={this.productMinus}
          removeProduct={this.removeProduct}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  checkoutFooter:{
    position:'absolute',
    width: width,
    height: height/2,
    backgroundColor:'#ffff',
    bottom: 0,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    elevation: 8
  },
  containerCheckoutPanel: {
    width: width,
    height: height,
   
  },
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
    color: 'white',
  },
  textPrice: {
    fontSize: 18,
    color: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 4,
  },
  containerPanel: {
    flexDirection: 'row',
    height: 60,
    width: 400,
    backgroundColor: '#ff8a65',
    borderRadius: 8,
    elevation: 8,
    marginVertical: 2,
  },
  panelStart: {
    width: 90,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Cart;
