import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TabActions } from '@react-navigation/native';
const TopTabs = createMaterialTopTabNavigator()
import AddFood from "../screens/Manager/AddFood";
import AddCategory from "../screens/Manager/AddCategory";
import FoodManager from "../screens/Manager/FoodManager";
import Post from "../screens/Manager/Post";
export class TopTab extends Component {
    render() {
        return (
           <TopTabs.Navigator>
               <TopTabs.Screen  name = 'FoodManager' component = {FoodManager} options = {{tabBarLabel: 'Food' }} />
               <TopTabs.Screen name = 'Post' component = {Post} options = {{tabBarLabel: 'Post' }} />  
               <TopTabs.Screen name = 'AddFood' component = {AddFood} options = {{tabBarLabel: '+Food' }} />
               <TopTabs.Screen name = 'AddCategory' component = {AddCategory} options = {{tabBarLabel: '+Category' }} />                            
           </TopTabs.Navigator>
        )
    }
}

export default TopTab
