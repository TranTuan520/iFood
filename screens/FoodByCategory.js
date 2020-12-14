import React, { Component } from 'react'
import { Text, View, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native'
import database from "@react-native-firebase/database";
import RenderFood  from '../component/RenderFood'
const {width, height} = Dimensions.get('window')
import FontAwesome from "react-native-vector-icons/FontAwesome";
import firestore from '@react-native-firebase/firestore'
export class FoodByCategory extends Component {
     constructor(props){
         super(props)
            this.state = {
            Foods: [],
            SelectedCat: this.props.route.params.CatId,
            Categories: [],            
    }
    //this.setCat = this.setCat.bind(this)
     }


    getAllFood = ()=>{
        firestore()
      .collection('Food')
      .onSnapshot((documentSnapshot) => {
        const Foods = [];
        documentSnapshot.forEach((e) => {
          Foods.push(e);
        });
        this.setState({Foods});
        console.log(Foods);
      });
    }
    getAllCategory = () =>{
        firestore()
        .collection('Category')
        .onSnapshot((snapshot) => {
          const Categories = [];
          snapshot.forEach((e) => {
            Categories.push(e);
          });
          this.setState({Categories});
        });             
    }
    getFoodByCategory = (CatName) =>{
        return this.state.Foods.filter((item) => ( item._data.FoodType === CatName ))        
    }

    componentDidMount(){
        this.getAllFood();
        this.getAllCategory();
    }
    renderCategory = ({ item }) =>{
        return (
            <TouchableOpacity  activeOpacity = {0.8}
                onPress={()=> this.setState({SelectedCat: item._data.CategoryName})}
                style={{
                    height:  30,
                    borderRadius: 6,
                    marginHorizontal: 4,
                    alignItems: 'center',
                    backgroundColor: this.state.SelectedCat === item._data.CategoryName? 'tomato': '#fff',
                    padding: 6,
                    elevation: 8,
                    justifyContent: 'center'
                }}>
                <Text style={{ fontSize: 14, color: this.state.SelectedCat === item._data.CategoryName ? '#ffff': 'black' }}>{item._data.CategoryName}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={{ flex: 1,  backgroundColor: '#fffff', }}>
                <View style={{ paddingLeft: 8, elevation: 8, backgroundColor: '#fff',}}>
                    <FontAwesome name='angle-left' size={50} style={{ }} color='black' onPress={() => this.props.navigation.goBack()} />
                </View>
                <View style={{ 
                                                                          
                }}>
                    <FlatList                           
                        contentContainerStyle ={{ justifyContent:'center', height: 50, alignItems:'center'}}                                 
                        data={this.state.Categories}
                        horizontal
                        keyExtractor = {(item)=>console.log(item)}
                        extraData={this.state.Categories}
                        showsHorizontalScrollIndicator={false}
                        renderItem={this.renderCategory}
                    />
                </View>
                <View style={{ flex: 1, alignItems:'center' }}>
                    <RenderFood navigation={this.props.navigation} Foods={this.getFoodByCategory(this.state.SelectedCat)}  />
                </View>
               
            </View>

        )
    }
}

export default FoodByCategory
