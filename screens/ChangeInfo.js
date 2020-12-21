import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  Image,
  StyleShee,
  TouchableOpacity,
  PermissionsAndroid,
  ToastAndroid,
  Modal,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONTS} from '../constants/theme';
import {firebase} from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import ImagePicker from 'react-native-image-crop-picker';
const {width, height} = Dimensions.get('window');
export default class ChangeInfo extends Component {
  state = {
    user: firebase.auth().currentUser,
    visible: false,
    image: null,
    userEmail: '',
    userFullName: '',
    useraAddress: '',
    userPhone: '',
    userAvatar: '',
    userIntro: '',
    uploading: false,
    transferred: 0,
  };
  componentDidMount() {
    this.getUserInfo();
  }
  getUserInfo = () => {
    firestore()
      .collection('User')
      .doc(this.state.user.uid)
      .onSnapshot((user) => {
        this.setState({user: user._data});
      });
  };
  renderHeader = () => {
    return (
      <View
        style={{
          height: 250,
          backgroundColor: 'tomato',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomStartRadius: 18,
          borderBottomEndRadius: 18,
        }}>
        <TouchableOpacity
          style={{
            height: 120,
            width: 120,
            borderRadius: 60,
            elevation: 16,
          }}
          onPress={() => this.openPicker()}>
          <Image
            source={
              this.state.user.avatar
                ? {uri: this.state.user.avatar}
                : {uri: this.state.userAvatar}
            }
            style={{
              height: 120,
              width: 120,
              borderRadius: 60,
              borderWidth: 2,
              borderColor: 'white',
            }}
          />
        </TouchableOpacity>

        <FontAwesome
          name="angle-left"
          size={50}
          style={{position: 'absolute', left: 16, top: 8, paddingRight: 8}}
          color="white"
          onPress={() => this.props.navigation.goBack()}
        />
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            right: 16,
            top: 24,
            borderRadius: 4,
            width: 60,
            height: 30,
            alignItems: 'center',
            elevation: 4,
          }}>
          <Text
            size={50}
            style={{...FONTS.h2, color: 'black'}}
            onPress={() => this.uploadProfile()}>
            Save
          </Text>
        </TouchableOpacity>
        {/* name */}
        <TextInput
          onChangeText={(userFullName) => {
            this.setState({userFullName});
            console.log(this.state.userFullName);
          }}
          placeholder={this.state.user.name}
          style={{...FONTS.h1}}
        />
        <TextInput
          onChangeText={(userIntro) => this.setState({userIntro})}
          placeholder={
            this.state.user.intro ? this.state.user.intro : '------------------'
          }
        />
      </View>
    );
  };
  renderInfo = () => {
    return (
      <ScrollView style={{marginHorizontal: 16, marginTop: 16}}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 4,
            alignItems: 'center',
            backgroundColor: 'tomato',
            width: 140,
            justifyContent: 'center',
            borderRadius: 8,
            elevation: 4,
            borderTopLeftRadius: 0,
          }}>
          <FontAwesome
            name="info"
            size={24}
            style={{marginEnd: 6}}
            color="white"
          />
          <Text style={{...FONTS.h2, color: 'white'}}>Infomation</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 4,
            marginStart: 32,
            alignItems: 'center',
          }}>
          <FontAwesome name="phone" size={22} style={{width: 26, height: 22}} />
          <TextInput
            width={300}
            onChangeText={(userPhone) => this.setState({userPhone})}
            placeholder={
              this.state.user.phone
                ? this.state.user.phone
                : '-------------------'
            }
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 4,
            marginStart: 32,
            alignItems: 'center',
          }}>
          <FontAwesome
            name="envelope"
            size={22}
            style={{width: 26, height: 22}}
          />
          <Text>{this.state.user.email}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 4,
            marginStart: 32,
            alignItems: 'center',
          }}>
          <FontAwesome
            name="map-marker"
            size={22}
            style={{width: 26, height: 22}}
          />
          <TextInput
            width={300}
            onChangeText={(useraAddress) => {
              this.setState({useraAddress});
            }}
            placeholder={
              this.state.user.address
                ? this.state.user.address
                : '-------------------'
            }
          />
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginVertical: 6,
            marginStart: 32,
            width: 200,
          }}
          onPress={() => {
            this.setState({visible: true});
          }}>
          <FontAwesome name="lock" size={22} style={{width: 26, height: 22}} />
          <Text style={{...FONTS.h3}}>Change Password</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  showProgress = () => {
    return (
      <Modal visible={this.state.uploading} transparent={true} u>
        <View
          style={{
            width: width,
            height: height,
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent:'center',
            alignItems:'center'
          }}>
          <Progress.Bar progress={this.state.transferred} width={200} />
        </View>
      </Modal>
    );
  };

  logout = () => {
    ToastAndroid.show('Logout..... :(', ToastAndroid.LONG);
    setTimeout(() => {
      this.props.navigation.navigate('Login');
    }, 290000);
  };

  _onCancel() {
    this.setState({visible: false});
  }
  openPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then((image) => {
      if (image) {
        this.setState({userAvatar: image.path, image: image.path});
      }
    });
  };
  uploadProfile = async () => {
    if (this.state.image) await this.uploadImage();
    firestore()
      .collection('User')
      .doc(firebase.auth().currentUser.uid)
      .update({
        name:
          this.state.userFullName === ''
            ? this.state.user.name
            : this.state.userFullName,
        address:
          this.state.useraAddress === ''
            ? this.state.user.address
            : this.state.useraAddress,
        phone:
          this.state.userPhone === ''
            ? this.state.user.phone
            : this.state.userPhone,
        avatar:
          this.state.userAvatar === ''
            ? this.state.user.avatar
            : this.state.userAvatar,
        intro:
          this.state.userIntro === ''
            ? this.state.user.intro
            : this.state.userIntro,
      })
      .then(() => {
        this.props.navigation.goBack();
      });
  };
  uploadImage = async () => {
    this.setState({
      transferred: 0,
      uploading: true,
    });
    //alert(this.state.image)
    const fileName = this.state.image.substring(
      this.state.image.lastIndexOf('/') + 1,
    );
    const task = storage().ref(`/Avatar/${fileName}`).putFile(this.state.image);

    task.on('state_changed', (snapshot) => {
      this.setState({
        transferred:
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      });
      console.log(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      );
    });
    try {
      await task;
    } catch (e) {}
    this.setState({
      userAvatar: (
        await storage().ref(`/Avatar/${fileName}`).getDownloadURL()
      ).toString(),
    });
    // console.log('food url ' + this.state.FoodImage);
    this.setState({uploading: false});
    // //this.setState({image: null});
    // console.log(this.state.uploading);
  };

  _PanelChangePassword() {
    return (
      <Modal
        transparent={true}
        visible={this.state.visible}
        animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000aa',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 350,
              height: 340,
              backgroundColor: '#ffff',
              borderRadius: 8,
            }}>
            <View
              style={{
                height: 70,
                backgroundColor: 'tomato',
                elevation: 2,
                borderTopRightRadius: 8,
                borderTopLeftRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="lock"
                size={32}
                color="white"
                style={{marginHorizontal: 8}}
              />
              <Text style={{...FONTS.h2, color: 'white'}}>Change Password</Text>
            </View>
            <TextInput
              placeholder="Password"
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 4,
                marginHorizontal: 12,
                marginVertical: 4,
                marginTop: 32,
              }}
              secureTextEntry
            />
            <TextInput
              placeholder="New Password"
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 4,
                marginHorizontal: 12,
                marginVertical: 4,
              }}
              secureTextEntry
            />
            <TextInput
              placeholder="Confirm Password"
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 4,
                marginHorizontal: 12,
                marginVertical: 4,
              }}
              secureTextEntry
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginEnd: 16,
                marginTop: 16,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'tomato',
                  width: 85,
                  height: 40,
                  borderRadius: 4,
                  elevation: 2,
                  alignItems: 'center',
                  marginEnd: 6,
                }}
                onPress={() => this._onCancel()}>
                <Text style={{...FONTS.h2, color: 'white'}}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: 'tomato',
                  width: 85,
                  height: 40,
                  borderRadius: 4,
                  elevation: 2,
                  alignItems: 'center',
                  marginStart: 6,
                }}>
                <Text style={{...FONTS.h2, color: 'white'}}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: '#fffff',
        }}>
        {this._PanelChangePassword()}
        {this.showProgress()}
        {this.renderHeader()}
        {this.renderInfo()}
      </View>
    );
  }
}
