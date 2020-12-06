import React, { Component } from 'react'
import { Text, View, TextInput, Dimensions, ScrollView, Image, StyleShee, TouchableOpacity, PermissionsAndroid , ToastAndroid, Modal} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Swiper from 'react-native-swiper'
import { COLORS, FONTS } from '../constants/theme'
import Dialog from "react-native-dialog";
const { width, height } = Dimensions.get('window')

import ImagePicker from 'react-native-image-crop-picker'



export default class ChangeInfo extends Component {
    state = {
        visible: false,
        image: 'null'
    }
    renderHeader = () => {
        return (
            <View style={{
                height: 250,
                backgroundColor: 'tomato',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomStartRadius: 18,
                borderBottomEndRadius: 18

            }}>
                {/* avatar */}
                <TouchableOpacity style={{
                    height: 120,
                    width: 120,
                    borderRadius: 60,
                    elevation: 16,                
                }} onPress = {()=>this.openPicker()}>
                    <Image source={require('../assets/avt.jpg')}
                        style={{
                            height: 120,
                            width: 120,
                            borderRadius: 60,
                            borderWidth: 2,
                            borderColor: 'white'
                        }} />
                </TouchableOpacity>
                
               
                <FontAwesome name='angle-left' size={50} style={{ position:'absolute', left:16, top: 8, paddingRight: 8}} color='white' onPress={() => this.props.navigation.goBack()}/>
                <TouchableOpacity style={{ backgroundColor: 'white', position: 'absolute', right: 16, top: 24, borderRadius: 4, width: 60, height: 30, alignItems: 'center', elevation: 4}}>
                    <Text size={50} style={{ ...FONTS.h2, color: 'black' }} onPress={() => this.props.navigation.goBack()}>Save</Text>
                </TouchableOpacity>
                {/* name */}               
               <TextInput placeholder = 'Tuan Chan' style={{ ...FONTS.h1 }}/>                           
                    <TextInput placeholder = 'Con Meo Ngu Ngoc Dang iu :3'/>              
            </View>
        )
    }
    renderInfo = () => {
        return (
                <ScrollView style={{ marginHorizontal: 16, marginTop: 16 }}>
                    
                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 4,
                        alignItems: 'center',
                        backgroundColor: 'tomato',
                        width: 140,
                        justifyContent: 'center',
                        borderRadius: 8,
                        elevation: 4,
                        borderTopLeftRadius: 0
                    }}>
                        <FontAwesome name='info' size={24} style={{ marginEnd: 6 }} color='white' />
                        <Text style={{ ...FONTS.h2, color: 'white' }}>Infomation</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 4, marginStart: 32,alignItems:'center' }}>
                        <FontAwesome name='phone' size={22} style={{ width: 26, height: 22 }} />
                        <TextInput placeholder = '0967435076' />
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 4, marginStart: 32, alignItems:'center' }}>
                        <FontAwesome name='envelope' size={22} style={{ width: 26, height: 22 }} />
                        <TextInput placeholder = 'tranquangtuan.it@gmail.com' />
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 4, marginStart: 32, alignItems:'center' }}>
                        <FontAwesome name='map-marker' size={22} style={{width: 26, height: 22, }} />
                        <TextInput placeholder = 'Pham Van Dong, Thu Duc, Ho Chi Minh' />                   
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', marginVertical: 6, marginStart: 32, width: 200, }}
                        onPress={() => {
                        this.setState({visible: true})
                    }}>
                        <FontAwesome name='lock' size={22} style={{ width: 26, height: 22}} />
                        <Text style={{ ...FONTS.h3 }}>Change Password</Text>
                    </TouchableOpacity>        
                </ScrollView>
        )
    }

  

    logout = ()=>{
        ToastAndroid.show('Logout..... :(', ToastAndroid.LONG)
        setTimeout(()=>{            
            this.props.navigation.navigate('Login')
            }
            , 290000)
    }

    _onCancel(){
        this.setState({visible:false})
    }
    openPicker = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
           // cropping: true
        }).then(image => {
            //if (image) {
                //this.setState({ image: image.path })
                //console.log(this.state.image)
            //}
        });
    }


    _PanelChangePassword() {
      return(
        <Modal transparent = {true} 
        visible = {this.state.visible} animationType = 'fade'
        >
            <View style = {{flex: 1, backgroundColor:'#000000aa', justifyContent:'center', alignItems:'center'}} >
                <View style = {{width: 350, height: 340, backgroundColor:'#ffff', borderRadius:  8,  
            }}>
                <View style = {{height: 70, backgroundColor: 'tomato', elevation: 2, borderTopRightRadius:  8,borderTopLeftRadius:  8, flexDirection: 'row', alignItems:'center'}}>
                    <FontAwesome name = 'lock' size = {32} color = 'white' style = {{marginHorizontal: 8}}/>
                    <Text style = {{...FONTS.h2, color: 'white'}}>Change Password</Text>
                </View>
                    <TextInput placeholder = 'Password' style = {{ borderColor: 'gray', borderWidth:1, borderRadius: 4, elevation: 1, marginHorizontal: 12, marginVertical: 4, marginTop: 32}} secureTextEntry  />
                    <TextInput placeholder = 'New Password' style = {{ borderColor: 'gray', borderWidth:1, borderRadius: 4, elevation: 1, marginHorizontal: 12, marginVertical: 4}} secureTextEntry  />
                    <TextInput placeholder = 'Confirm Password' style = {{ borderColor: 'gray', borderWidth:1, borderRadius: 4, elevation: 1, marginHorizontal: 12, marginVertical: 4}} secureTextEntry  />
                    <View style = {{flexDirection:'row', justifyContent:'center', marginEnd: 16, marginTop: 16}}>
                        <TouchableOpacity style = {{backgroundColor:'tomato', width: 85, height: 40, borderRadius: 4, elevation: 2, alignItems:'center', marginEnd: 6}} 
                        onPress = {()=>this._onCancel()}> 
                            <Text style = {{...FONTS.h2, color: 'white'}}>Cancel</Text>
                        </TouchableOpacity>
                      
                        <TouchableOpacity style = {{backgroundColor:'tomato', width: 85, height: 40, borderRadius: 4, elevation: 2, alignItems:'center', marginStart: 6}}> 
                            <Text style = {{...FONTS.h2, color: 'white'}}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        </Modal>
        )
    }

    render() {
        return (
        
                <View style={{                
                backgroundColor: '#fffff'
            }}>
                {this._PanelChangePassword()}
                {this.renderHeader()}
                {this.renderInfo()}
            </View>
         
        )
    }


}
