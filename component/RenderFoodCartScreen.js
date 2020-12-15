import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONTS} from '../constants/theme';
const {width, height} = Dimensions.get('window');
export default class RenderItem extends Component {
  render() {
    return (
      <FlatList
        data={this.props.Foods}
        keyExtractor={(item) => item.id}
        renderItem={this.RenderItem}
        showsVerticalScrollIndicator={false}
      />
    );
  }
  componentDidMount = () => {};
  RenderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          this.props.navigation.navigate('FoodDetail', {food: item});
        }}>
        <View style={styles.containerFood}>
          <Image
            source={{uri: item._data.FoodImage}}
            style={styles.imgFood}
            resizeMode="cover"
            resizeMethod="resize"
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
            <Text numberOfLines={1} style={styles.textDes}>
              $ {item._data.FoodPrice}
            </Text>
            {/* Price && Buttons */}
            <View style={styles.foodBottom}>
              <TouchableWithoutFeedback
                >
               <View style={{
                  height: 35,
                  width: 100,
                  backgroundColor: 'tomato',
                  borderRadius: 4,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderWidth: 1,
                  borderColor: 'tomato',
                  alignItems: 'center',
                  elevation: 2,
                }}>
               <TouchableOpacity onPress={() => {
                    this.props.productMinus(item.id);
                  }}>
               <FontAwesome
                  name="minus-circle"
                  color="white"
                  size={28}
                  style={{paddingStart: 2}}
                  
                />
               </TouchableOpacity>
                <Text style={{color: 'white', fontSize: 16}}>
                  {this.props.getQuantity(item.id)}
                </Text>
                <TouchableOpacity onPress={() => {
                    this.props.productPlus(item.id);
                  }}>
                <FontAwesome
                  name="plus-circle"
                  color="white"
                  size={28}
                  style={{paddingEnd: 2}}
                  
                />
                </TouchableOpacity>
               </View>
              </TouchableWithoutFeedback>
              <TouchableOpacity
                style={{
                  width: 35,
                  height: 35,
                  backgroundColor: 'tomato',
                  alignItems: 'center',
                  borderRadius: 4,
                  justifyContent: 'center',
                  marginStart: 12,
                }}
                onPress={()=>this.props.removeProduct(item.id)}>
                <FontAwesome
                  name="times"
                  color="white"
                  size={22}                  
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
}
const styles = StyleSheet.create({
  containerFood: {
    flex: 1,
    flexDirection: 'row',
    width: 400,
    height: 100,
    backgroundColor: '#ffff',
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
