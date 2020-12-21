import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput
} from 'react-native';
import database from '@react-native-firebase/database';
import RenderFood from '../component/RenderFood';
const {width, height} = Dimensions.get('window');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
export class FoodByCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Foods: this.props.route.params.Foods,
      SelectedCat: this.props.route.params.CatId,
      Categories: [],
      keyword: '',
      AllFood: []
    };
    //this.setCat = this.setCat.bind(this)
  }
  searchFood= ()=>{
    // console.log(this.state.keyword)
     const Foods = [];
     this.state.AllFood.forEach(food=>{
       if(food._data.FoodName.includes(this.state.keyword.normalize("NFD")
       .replace(/[\u0300-\u036f]/g, "")
       .replace(/đ/g, "d")
       .replace(/Đ/g, "D").toLowerCase()))
         Foods.push(food)
     })
     return Foods   
   }

  getAllFood = async () => {
  await  firestore()
      .collection('Food')
      .onSnapshot((documentSnapshot) => {
        const Foods = [];
        documentSnapshot.forEach((e) => {
          Foods.push(e);
        });
        this.state.Foods == undefined? this.setState({Foods, AllFood: Foods})
            :this.setState({AllFood: Foods});
      })     
  };
  getAllCategory = () => {
    firestore()
      .collection('Category')
      .onSnapshot((snapshot) => {
        const Categories = [];
        snapshot.forEach((e) => {
          Categories.push(e);
        });
        this.setState({Categories});
      });
  };
  getFoodByCategory = () => {
    if(this.state.SelectedCat && this.state.Foods != undefined) 
        return this.state.Foods.filter((item) => item._data.FoodType === this.state.SelectedCat);
    return this.state.Foods
  };

  componentDidMount() {
   
    this.getAllFood();
    console.log(this.state.Foods)
    this.getAllCategory();
  }
  renderCategory = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => this.setState({SelectedCat: item._data.CategoryName})}
        style={{
          height: 30,
          borderRadius: 6,
          marginHorizontal: 4,
          alignItems: 'center',
          backgroundColor:
            this.state.SelectedCat === item._data.CategoryName
              ? 'tomato'
              : '#fff',
          padding: 6,
          elevation: 8,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 14,
            color:
              this.state.SelectedCat === item._data.CategoryName
                ? '#ffff'
                : 'black',
          }}>
          {item._data.CategoryName}
        </Text>
      </TouchableOpacity>
    );
  };  
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fffff'}}>
        <View style={{ paddingLeft: 8, elevation: 2, backgroundColor: '#fff', flexDirection: 'row', alignItems:'center'}}>
          <FontAwesome
            name="angle-left"
            size={50}
            style={{ paddingVertical: 1,  width: 42}}
            color="black"
            onPress={() => this.props.navigation.goBack()}
          />
          <View style={styles.searchBar}>
            <TextInput
              onChangeText={(keyword) => this.setState({keyword})}
              placeholderTextColor="gray"
              placeholder={`muốn ăn gì nè >_< ....`}
              style={{
                height: 40,
                fontSize: 16,
                
              }}
            />
            <View style={styles.containerSearchIcon}>
              <FontAwesome
                name="search"
                size={24}
                color="#ffff"
                onPress={() => {
                  //  console.log(this.searchFood(this.state.keyword))
                   this.setState({Foods: this.searchFood()})
                }}
              />
            </View>
          </View>
        </View>
        <View style={{}}>
          <FlatList
            contentContainerStyle={{
              justifyContent: 'center',
              height: 50,
              alignItems: 'center',
            }}
            data={this.state.Categories}
            horizontal
         //   keyExtractor={(item) => console.log(item)}
            extraData={this.state.Categories}
            showsHorizontalScrollIndicator={false}
            renderItem={this.renderCategory}
          />
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <RenderFood
            navigation={this.props.navigation}
            Foods={this.getFoodByCategory()}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: '#f5f5f5',
        borderRadius: 4,
        borderRadius: 4,     
        position:'absolute',
        left: 60,
        flexDirection: 'row',
        elevation: 2,        
        marginVertical: 8,
        right: 8
      },containerSearchIcon: {
        position: 'absolute',
        right: 0,
        backgroundColor: 'tomato',
        width: 40,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
      },
})
export default FoodByCategory;
