import React, {Component} from 'react';
import {View, Button, TextInput, Text, TouchableOpacity, Keyboard, BackHandler, ScrollView, Animated} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
export class App extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.unFocus = React.createRef();
    this.state = {    
      verifyCode: '',
      springValue: new Animated.Value(0.3)
    };
  }
  springAnimation = ()=>{   
    //alert('f') 
    Animated.spring(this.state.springValue, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true
    }).start()
  }

  componentDidMount() {    
  }
  containerInput=()=>{  

    const code = this.state.verifyCode.split('')  
    if(code.length === 6) 
      this.springAnimation()
    return(
      
      <View style = {{flexDirection: 'row', justifyContent:'center' }}>
          { 
          Array(6).fill().map((item, index)=>(
            <View>
              <TouchableOpacity activeOpacity = {0.9} onPress = {()=> {   
                  this.unFocus.current.focus()
                  this.textInput.current.focus()                                   
                  }
                  
                } style = {{backgroundColor: index < code.length? '#ffff': '#ffab91', width: 40, height: 40, borderRadius: 4, 
                elevation: 2, justifyContent:'center', alignItems:'center', marginHorizontal: 3, 
                 }}>
                   <Animated.Text  style = {{fontSize: 30, color: 'gray',transform: [{scale: code.length === 6 ? this.state.springValue :1 }] }}>{code[index]}</Animated.Text>
                   </TouchableOpacity>
            </View>
          ))
          
          // this.state.verifyCode.length > 0 ? code.map((item, index)=>{
          //    this.springAnimation()  
          //     return(
          //       <TouchableOpacity  onPress = {()=> {   
          //         this.unFocus.current.focus()
          //         this.textInput.current.focus()                                   
          //         }
                  
          //       } style = {{backgroundColor:'white', width: 50, height: 50, justifyContent:'center', alignItems:'center', marginHorizontal: 3, borderBottomWidth: 1,
          //        }}>
          //       <Animated.Text style = {{fontSize: 30, color: 'black', transform: [{scale:  this.state.springValue }]  }}>{item}</Animated.Text>
          //       </TouchableOpacity>                
          //       )})
                
          //       :
          //       <TouchableOpacity  onPress = {()=> {
          //         this.unFocus.current.focus()
          //         this.textInput.current.focus()
          //       }} style = {{backgroundColor:'white', width: 50, height: 50, justifyContent:'center', alignItems:'center', marginHorizontal: 3, borderBottomWidth: 1,
          //        }}>               
          //       </TouchableOpacity>
                }
      </View>

    )
  }
  

  renderVerify() {
    return (
      <View>         
        {/* <Button title="open keyboard" onPress={() => this.textInput.current.focus() } /> */}
        {this.containerInput()}
        <TextInput 
        maxLength = {6}
         keyboardType = 'numeric'
         on
          ref={this.textInput}        
          onChangeText = {(verifyCode)=>this.setState({verifyCode})} 
          style={{width: 0, height: 0,}}
        />
      </View>
    );
  }
  render() {
    return (
      <View ref={this.unFocus} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button title="OPEN BOTTOM SHEET" onPress={() => this.RBSheet.open()} />
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          minClosingHeight={100}
          closeOnDragDown
          dragFromTopOnly
          height={150}
          openDuration={400}
          onClose = {()=>this.setState({verifyCode: ''})}
          customStyles={{
            container: {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              backgroundColor:'tomato'
            },
          }}>
            <Text style = {{alignSelf:'center', fontSize: 16, marginBottom: 16, color: '#ffff'}}>Input your OTP code in SMS</Text>
            {this.renderVerify()}
            <Text style = {{alignSelf:'center', fontSize: 16, marginBottom: 16, color: '#ffff'}}>Resent</Text>
        </RBSheet>
      </View>
    );
  }
}

export default App;

// import React from 'react'

// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'

// import Tabs from './navigation/tabs'
// import Managers from './navigation/TopTab'
// import Profile from './screens/Profile'
// import FoodDetail from './screens/FoodDetail'

// import Login from './screens/Login'
// import Signup from './screens/Signup'

// import ChangeInfo from './screens/ChangeInfo'

// import FoodByCategory from "./screens/FoodByCategory";

// import EditFood from './screens/Manager/EditFood'
// const Stack = createStackNavigator();
// const App = () => {
//   return (
//     <NavigationContainer >
//       <Stack.Navigator
//         screenOptions={{
//           headerShown: false,
//         animationTypeForReplace: 'pop',
//         }}
//         initialRouteName={'Login'}
//       >
//       {/* Tabs */}
//         <Stack.Screen name="Home" component={Tabs} />
//         <Stack.Screen name = "FoodByCategory" component = {FoodByCategory} options = {{animationEnabled: true}}/>
//         <Stack.Screen name = 'FoodDetail' component = {FoodDetail}/>
//         <Stack.Screen name = 'Login' component = {Login}/>
//         <Stack.Screen name = 'Signup' component = {Signup}/>
//         <Stack.Screen name = 'Profile' component = {Profile}/>
//         <Stack.Screen name = 'ChangeInfo' component = {ChangeInfo}/>
//         <Stack.Screen name = 'Managers' component = {Managers}/>
//         <Stack.Screen name  = 'EditFood' component = {EditFood}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

// export default App
