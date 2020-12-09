import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TabActions } from '@react-navigation/native';
const TopTabs = createMaterialTopTabNavigator()
import AddFood from "../screens/Manager/AddFood";
import AddCategory from "../screens/Manager/AddCategory";
import FoodManager from "../screens/Manager/FoodManager";
export class TopTab extends Component {
    render() {
        return (
           <TopTabs.Navigator>
               <TopTabs.Screen name = 'AddFood' component = {AddFood} />
               <TopTabs.Screen name = 'AddCategory' component = {AddCategory} />
               <TopTabs.Screen name = 'FoodManager' component = {FoodManager} />
           </TopTabs.Navigator>
        )
    }
}

export default TopTab
