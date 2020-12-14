import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'


import Tabs from './navigation/tabs'
import Managers from './navigation/TopTab'
import Profile from './screens/Profile'
import FoodDetail from './screens/FoodDetail'


import Login from './screens/Login'
import Signup from './screens/Signup'


import ChangeInfo from './screens/ChangeInfo'

import FoodByCategory from "./screens/FoodByCategory";

import EditFood from './screens/Manager/EditFood'
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer >  
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        animationTypeForReplace: 'pop',       
        }}
        initialRouteName={'Login'}
      >
      {/* Tabs */}
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name = "FoodByCategory" component = {FoodByCategory} options = {{animationEnabled: true}}/>
        <Stack.Screen name = 'FoodDetail' component = {FoodDetail}/> 
        <Stack.Screen name = 'Login' component = {Login}/>
        <Stack.Screen name = 'Signup' component = {Signup}/>        
        <Stack.Screen name = 'Profile' component = {Profile}/>    
        <Stack.Screen name = 'ChangeInfo' component = {ChangeInfo}/>      
        <Stack.Screen name = 'Managers' component = {Managers}/>
        <Stack.Screen name  = 'EditFood' component = {EditFood}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
