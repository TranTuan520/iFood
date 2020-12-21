import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import auth from '@react-native-firebase/auth';
//database
import database, {firebase} from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore'
export default class Profile extends Component {
  state = {
    user: firebase.auth().currentUser,
    userEmail:'',
    userFullName: '',
    useraAddress:'',
    userPhone:'',
    userAvatar: '',
  };
  componentDidMount() {
    this.getUserInfo();
  }
  getUserInfo = ()=>{
    firestore().collection('User').doc(this.state.user.uid).onSnapshot(user=>{
      this.setState({user:user._data})
      console.log(this.state.user)
    })}
  renderHeader = () => {
    return (
      <View style={styles.containerHeader}>
        {/* avatar */}

        <Image source={{uri: this.state.user.avatar}} style={styles.imgAvatar} />
        <FontAwesome
          name="angle-left"
          size={50}
          style={styles.iconBack}
          color="white"
          onPress={() => this.props.navigation.goBack()}
        />
        {/* name */}

        <Text style={styles.userName}>{this.state.user.name}</Text>

        <Text numberOfLines={2} style={styles.userIntro}>
          {this.state.user.intro ? this.state.user.intro : 'no introduction'}
        </Text>
      </View>
    );
  };
  renderInfo = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, marginHorizontal: 10}}>
        <View style={styles.containerTitle}>
          <FontAwesome
            name="info"
            size={24}
            style={{marginEnd: 6}}
            color="white"
          />
          <Text style={styles.textTitle}>Infomation</Text>
        </View>
        <View style={styles.containerOption}>
          <FontAwesome name="phone" size={22} style={styles.smallIcon} />
          <Text style={styles.textOption}>
            {this.state.user.phone ? this.state.user.phone : 'no phone number :('}
          </Text>
        </View>
        <View style={styles.containerOption}>
          <FontAwesome name="envelope" size={22} style={styles.smallIcon} />
          <Text style={styles.textOption}>{this.state.user.email}</Text>
        </View>
        <View style={styles.containerOption}>
          <FontAwesome name="map-marker" size={22} style={styles.smallIcon} />
          <Text style={styles.textOption}>
            {this.state.user.address ? this.state.user.address : 'no address :('}
          </Text>
        </View>

        {/*  */}

        <View style={[styles.containerTitle, {width: 115}]}>
          <FontAwesome
            name="sliders"
            size={24}
            style={{marginEnd: 6}}
            color="white"
          />
          <Text style={styles.textTitle}>Options</Text>
        </View>
        <TouchableOpacity
          style={styles.containerOption}
          onPress={() => this.props.navigation.navigate('ChangeInfo')}>
          <FontAwesome name="cog" size={22} style={styles.smallIcon} />
          <Text style={styles.textOption}>Change Info</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.containerOption}>
          <FontAwesome
            name="question-circle"
            size={22}
            style={styles.smallIcon}
          />
          <Text style={styles.textOption}>Help & Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.containerOption}>
          <FontAwesome name="address-book" size={22} style={styles.smallIcon} />
          <Text style={styles.textOption}>Contact US</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.containerOption}
          onPress={() => this.logout()}>
          <FontAwesome name="sign-out" size={22} style={styles.smallIcon} />
          <Text style={styles.textOption}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  logout = () => {
    ToastAndroid.show('Logout..... :(', ToastAndroid.LONG);
    auth().signOut();
    this.props.navigation.navigate('Login');
  };

  render() {
    console.log(this.user);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fffff',
        }}>
        {this.renderHeader()}
        {this.renderInfo()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerHeader: {
    height: 250,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomStartRadius: 18,
    borderBottomEndRadius: 18,
    elevation: 4,
  },
  imgAvatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'white',
    marginVertical: 8,
  },
  iconBack: {marginEnd: 6, position: 'absolute', left: 16, top: 8},
  userName: {fontSize: 24, color: 'black'},
  userIntro: {
    fontSize: 14,
    color: 'black',
    height: 40,
    width: 300,
    textAlign: 'center',
  },
  smallIcon: {width: 26, height: 22, alignItems: 'center', textAlign: 'center'},
  containerTitle: {
    flexDirection: 'row',
    marginTop: 18,
    marginBottom: 6,
    marginHorizontal: 6,
    alignItems: 'center',
    backgroundColor: 'tomato',
    width: 140,
    justifyContent: 'space-around',
    borderRadius: 8,
    elevation: 4,
    borderTopLeftRadius: 0,
    paddingStart: 2,
  },
  containerOption: {flexDirection: 'row', marginVertical: 4, marginStart: 32},
  textTitle: {fontSize: 22, color: 'white'},
  textOption: {fontSize: 16},
});
