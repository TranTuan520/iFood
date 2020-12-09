import React from 'react'
import { View, Text } from 'react-native'
import database from '@react-native-firebase/database'
const getAllFood = async ()=>{
    await database().ref('/Food/').once('value').then(snapshot=>{
        //console.log( snapshot.val())   
        const Food = []         
        snapshot.forEach((food)=>
        {         
           Food.push( food._snapshot)              
        })
        return Food;
      //  console.log(this.state.Foods)
     })
}
const getAllCategory = async ()=>{

}

export default {getAllCategory, getAllFood}
