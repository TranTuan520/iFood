import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONTS} from '../constants/theme';

import auth from '@react-native-firebase/auth';
import database, {firebase} from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore'
export class Signup extends Component {
  state = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    user: null
  };
  setInfo = (user)=>{      
      firestore().collection('User').doc(`${user.uid}`).set({
          email: this.state.email,
          name: this.state.fullName,         
      })
  }
  onSignup = () => {
    if (
      this.state.fullName == '' ||
      this.state.email == '' ||
      this.state.password == '' ||
      this.state.confirmPassword == ''
    ) {
      Alert.alert('?', '?');
    } else if (this.state.password != this.state.confirmPassword) {
      //Alert.alert('!!!', 'confirm password invalid');
      return;
    } else {
    
      auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((result) => {
          const USER =  firebase.auth().currentUser
          this.setInfo(USER);          
          // console.log('id: '+JSON.stringify(USER.uid))
          //this.getUserInfo(user.uid);
          //Alert.alert('yeahh', 'User account created'); 
          
          //auth().signOut();                   
          this.props.navigation.navigate('Login');
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            alert('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            alert('That email address is invalid!');
          }

          alert(error);
        });
    }
  };
  createCart = () => {
    database().ref(`/Cart/${this.state.user.uid}`).set({});
  };
  render() {
    return (
      <ImageBackground
        style={{flex: 1, alignItems: 'center', backgroundColor: '#ffff'}}>
        <Image
          source={require('../assets/logo-ifood.png')}
          style={{marginTop: 32, marginBottom: 82, height: 100}}
          resizeMode="contain"
        />

        <View style={{position: 'absolute', bottom: 8, alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 250,
              height: 38,
              borderWidth: 2,
              borderRadius: 4,
              borderColor: 'tomato',
            }}>
            <FontAwesome
              name="user"
              size={32}
              color="tomato"
              style={{marginStart: 6}}
            />
            <TextInput
              placeholder="Enter Full Name"
              height={40}
              onChangeText={(fullName) => {
                this.setState({fullName});
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 250,
              height: 38,
              borderWidth: 2,
              borderRadius: 4,
              borderColor: 'tomato',
              marginTop: 8,
            }}>
            <FontAwesome
              name="envelope-square"
              size={32}
              color="tomato"
              style={{marginStart: 6}}
            />
            <TextInput
              placeholder=" Enter Email"
              height={40}
              onChangeText={(email) => {
                this.setState({email});
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 250,
              height: 38,
              borderWidth: 2,
              borderRadius: 4,
              borderColor: 'tomato',
              marginTop: 8,
            }}>
            <FontAwesome
              name="lock"
              size={32}
              color="tomato"
              style={{marginStart: 6}}
            />
            <TextInput
              placeholder="Enter Password"
              height={40}
              secureTextEntry
              onChangeText={(password) => {
                this.setState({password});
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 250,
              height: 38,
              borderWidth: 2,
              borderRadius: 4,
              borderColor: 'tomato',
              marginTop: 8,
            }}>
            <FontAwesome
              name="lock"
              size={32}
              color="tomato"
              style={{marginStart: 6}}
            />
            <TextInput
              placeholder=" Cornfirm Password"
              height={40}
              secureTextEntry
              onChangeText={(confirmPassword) => {
                this.setState({confirmPassword});
              }}
            />
          </View>

          <View style={{flexDirection: 'row', marginTop: 16, marginBottom: 16}}>
            <TouchableOpacity
              style={{
                width: 80,
                height: 40,
                alignItems: 'center',
                backgroundColor: 'tomato',
                borderRadius: 8,
                elevation: 4,
                marginHorizontal: 4,
              }}>
              <Text
                style={{fontSize: 22, color: 'white'}}
                onPress={() => this.onSignup()}>
                Signup
              </Text>
            </TouchableOpacity>
            {/*  */}
          </View>
          <View style={{flexDirection: 'row', marginVertical: 16}}>
            <Image
              source={require('../assets/icons/facebook.png')}
              style={{width: 40, height: 40, marginHorizontal: 8}}
            />
            <Image
              source={require('../assets/icons/google.png')}
              style={{width: 40, height: 40, marginHorizontal: 8}}
            />
          </View>

          <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{...FONTS.h3, color: 'black'}}>
                Have an account?
              </Text>
              <TouchableOpacity onPress={() => {}}>
                <Text style={{...FONTS.h3, color: 'tomato', marginStart: 6}}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default Signup;
