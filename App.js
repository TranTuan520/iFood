import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ImagePicker from "react-native-image-crop-picker";

import Tabs from './navigation/tabs'
import Profile from './screens/Profile'
import FoodDetail from './screens/FoodDetail'
import Cart from './screens/Cart'

import Login from './screens/Login'
import Signup from './screens/Signup'

import index from './screens/Manager/index'
import ChangeInfo from './screens/ChangeInfo'

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'ChangeInfo'}
      >
        {/* Tabs */}
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name = 'FoodDetail' component = {FoodDetail}/> 
        <Stack.Screen name = 'Login' component = {Login}/>
        <Stack.Screen name = 'Signup' component = {Signup}/>
        <Stack.Screen name = 'Manager' component = {index}/>
        <Stack.Screen name = 'Profile' component = {Profile}/>    
        <Stack.Screen name = 'ChangeInfo' component = {ChangeInfo}/>            
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
