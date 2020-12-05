import React from 'react'
import { Image, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Home from '../screens/Home'
import Icon from 'react-native-ionicons'
import Profile from '../screens/Profile'
import Maps from '../screens/Map'
import Cart from '../screens/Cart'

const Tab = createMaterialBottomTabNavigator();

const tabs = () => {

    return (
        <Tab.Navigator
      initialRouteName="Home"
      activeColor="#ffff"
      barStyle={{ backgroundColor: 'tomato' }}
      shifting = {true}
    >
      <Tab.Screen
        name="Feed"
        component={Home}
        options={{
          tabBarLabel: 'Home',
         tabBarColor:'tomato',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="NearBy"
        component={Maps}
        options={{
          tabBarLabel: 'Near me',
          tabBarColor:'tomato',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="location-arrow" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: 'Cart',
          tabBarColor:'tomato',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="cart-plus" color={color} size={24} />
          ),
        }}
      />
    
    </Tab.Navigator>      
    )
}

export default tabs
