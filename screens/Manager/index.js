import React, { Component } from 'react'
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native'

import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage'
import { utils } from '@react-native-firebase/app';
// import ImagePicker from 'react-native-image-picker';
//import * as Progress from 'react-native-progress';

import { Button } from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { COLORS, FONTS } from '../../constants/theme'
const { width, height } = Dimensions.get('window')

const ref = database().ref('/Food/');

export class Manager extends Component {
    state = {
        FoodName: '',
        FoodPrice:'',
        FoodImage: [],
        FoodType: '',
        FoodDescription:''
    }
 AddFood(){
   const foodRef = database()
  .ref
  .push().set({
    FoodName: this.state.FoodName,
    FoodPrice:this.state.FoodPrice,
    FoodImage: 'link image',
    FoodType: this.state.FoodType,
    FoodDescription:this.state.FoodDescription
  })
}
    render() {        
        return (
            <View style = {{justifyContent:'center', alignItems:'center'}}>            
            <TextInput placeholder = 'Food Price' onChangeText = {(FoodName)=>{this.setState({FoodName})}} />
               <TextInput placeholder = 'Food Price' onChangeText = {(FoodPrice)=>{this.setState({FoodPrice})}} />
               <TextInput placeholder = 'Food Type' onChangeText = {(FoodType)=>{this.setState({FoodType})}} />
               <TextInput placeholder = 'Food Description' onChangeText = {(FoodDescription)=>this.setState({FoodDescription})} />

               <TouchableOpacity  style = {{borderRadius: 4, backgroundColor: 'tomato'}} onPress = {
                   ()=>{

                    // ImagePicker.showImagePicker(options, response => {
                    //     if (response.didCancel) {
                    //       console.log('User cancelled image picker');
                    //     } else if (response.error) {
                    //       console.log('ImagePicker Error: ', response.error);
                    //     } else if (response.customButton) {
                    //       console.log('User tapped custom button: ', response.customButton);
                    //     } else {
                    //       const source = { uri: response.uri };
                    //       console.log(source); 
                    //       setImage(source);
                    //     }
                    //   });
                   }
               }>
                   <Text style = {{...FONTS.h2, color: 'white', padding: 8}}>Add Food</Text>
               </TouchableOpacity>
               
               <TouchableOpacity  style = {{borderRadius: 4, backgroundColor: 'tomato'}} onPress = {
                   ()=>this.AddFood()
               }>
                   <Text style = {{...FONTS.h2, color: 'white', padding: 8}}>Add Food</Text>
               </TouchableOpacity>
            </View>
        )
    }
}

export default Manager
