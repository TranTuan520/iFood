import React, { Component } from 'react'
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { COLORS, FONTS } from '../constants/theme'

import auth, { firebase } from "@react-native-firebase/auth";
import Home  from '../navigation/tabs'

export class Login extends Component {    
   constructor(props){
       super(props)
       this. state = {
        email: '',
        password: '',     
        user: null,
        loading: true,
        initializing: true,
        USER: null,
        isSignup: false
    }
    
   }
    componentDidMount=()=>{       
        //this.setState({user: this.state.isSignups?this.props.route.params.user: null})                       
        const subscriber = auth().onAuthStateChanged(user=>{
            this.setState({user})
            if (this.state.initializing)
               { 
                this.setState({initializing:false})     
                     // console.log(user)                        
            }
        });
        return subscriber;      
    }   
    onLogin = ()=>{
        auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(user=>{                  
        })
    }
    render = () => {
        if (this.state.initializing) return (
            <View style = {{flex: 1, backgroundColor:'#ffff', justifyContent:'center', alignItems:'center'}}>
                <Text>Loadingggggg</Text>
            </View>
        );
        if(!this.state.user)            
        return (
            <View
                style={{ flex: 1, alignItems: 'center', backgroundColor: '#ffff'  }}>
                <Image source={require('../assets/logo-ifood.png')} style={{ marginTop: 32, marginBottom: 82, height: 100 }} resizeMode='contain' />
                <View style={{
                    position: 'absolute', bottom: 8, alignItems: 'center',
                }}>
                    <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: 250,
                    height: 38,
                    borderWidth: 2,
                    borderRadius: 4,
                    borderColor: 'tomato',                    
                    marginTop: 8
                }}>
                    <FontAwesome name='envelope-square' size={32} color='tomato' style={{ marginStart: 6 }} />
                    <TextInput placeholder=' Enter Email' height={40} 
                        onChangeText={(email) => {this.setState({email}) }} />
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: 250,
                    height: 38,
                    borderWidth: 2,
                    borderRadius: 4,
                 borderColor: 'tomato',   
                    marginTop: 8
                }}>
                    <FontAwesome name='lock' size={32} color='tomato' style={{ marginStart: 6 }} />
                    <TextInput placeholder='Enter Password' height={40} secureTextEntry
                        onChangeText={(password) => {this.setState({password}) }} />
                </View>

                <View style={{ flexDirection: 'row', marginTop: 16, marginBottom: 16 }}>
                    <TouchableOpacity style={{ width: 80, height: 40, alignItems: 'center', backgroundColor: 'tomato', borderRadius: 8, elevation: 4, marginHorizontal: 4 }}>
                        <Text style={{ fontSize: 22, color: 'white' }} 
                         onPress = {()=>this.onLogin()}
                         >Login</Text>
                    </TouchableOpacity>
                    {/*  */}
                </View>              
                    <View style={{ flexDirection: 'row', marginVertical: 16 }}>
                        <Image source={require('../assets/icons/facebook.png')} style={{ width: 40, height: 40, marginHorizontal: 8 }} />
                        <Image source={require('../assets/icons/google.png')} style={{ width: 40, height: 40, marginHorizontal: 8 }} />
                    </View>

                    <View style={{ alignItems: 'center' }} >

                        <View style={{ flexDirection: 'row' }} >
                            <Text style={{ ...FONTS.h3, color: 'black' }}>Have an account?</Text>
                            <TouchableOpacity onPress={() => {
                                 this.setState({isSignup: true});
                                this.props.navigation.navigate('Signup')}                               
                                }>
                                <Text style={{ ...FONTS.h3, color: 'tomato', marginStart: 6 }}>Signup</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </View>

        )
        if(this.state.user)
            // console.log('ddddd'+JSON.stringify(this.state.user))
             return(
                <Home navigation = {this.props.navigation} />
             )
    }   
}

export default Login
