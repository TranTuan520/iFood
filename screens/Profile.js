import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
  Animated,
  TextInput,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import auth from '@react-native-firebase/auth';
//database
import database, {firebase} from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
const {width, height} = Dimensions.get('window');

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();
    this.unFocus = React.createRef();

    this.state = {
      user: firebase.auth().currentUser,
      userEmail: '',
      userFullName: '',
      useraAddress: '',
      userPhone: '',
      userAvatar: '',
      verifyCode: '',
      springValue: new Animated.Value(0.3),
    };
  }
  springAnimation = () => {
    //alert('f')
    Animated.spring(this.state.springValue, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };
  InputCode = () => {
    const code = this.state.verifyCode.split('');
    if (code.length === 6) this.springAnimation();
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {
          Array(6)
            .fill()
            .map((item, index) => (
              <View>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    this.unFocus.current.focus();
                    this.textInput.current.focus();
                  }}
                  style={{
                    backgroundColor: index < code.length ? '#ffff' : '#ffab91',
                    width: 40,
                    height: 40,
                    borderRadius: 4,
                    elevation: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 3,
                  }}>
                  <Animated.Text
                    style={{
                      fontSize: 30,
                      color: 'gray',
                      transform: [
                        {scale: code.length === 6 ? this.state.springValue : 1},
                      ],
                    }}>
                    {code[index]}
                  </Animated.Text>
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
    );
  };

  renderVerify() {
    return (
      <View>
        {/* <Button title="open keyboard" onPress={() => this.textInput.current.focus() } /> */}
        {this.InputCode()}
        <TextInput
          maxLength={6}
          keyboardType="numeric"
          on
          ref={this.textInput}
          onChangeText={(verifyCode) => this.setState({verifyCode})}
          style={{width: 0, height: 0}}
        />
      </View>
    );
  }

  componentDidMount() {
    this.getUserInfo();
    this.verifyPhoneNumber();
  }
  getUserInfo = () => {
    firestore()
      .collection('User')
      .doc(this.state.user.uid)
      .onSnapshot((user) => {
        this.setState({user: user._data});
        console.log(this.state.user);
      });
  };
  renderHeader = () => {
    return (
      <View style={styles.containerHeader}>
        {/* avatar */}

        <Image
          source={{uri: this.state.user.avatar}}
          style={styles.imgAvatar}
        />
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
            {this.state.user.phone
              ? this.state.user.phone
              : 'no phone number :( '}
          </Text>
          {this.state.user.phone ? this.renderButtonVerify() : null}
        </View>
        <View style={styles.containerOption}>
          <FontAwesome name="envelope" size={22} style={styles.smallIcon} />
          <Text style={styles.textOption}>{this.state.user.email}</Text>
        </View>
        <View style={styles.containerOption}>
          <FontAwesome name="map-marker" size={22} style={styles.smallIcon} />
          <Text style={styles.textOption}>
            {this.state.user.address
              ? this.state.user.address
              : 'no address :('}
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
  checkVerifyPhone = () => {};
  renderContent = () => {
    return (
      <View
        style={{
          width: width,
          height: height / 2,
          backgroundColor: 'tomato',
          flex: 1,
        }}></View>
    );
  };
  verifyPhoneNumber = async () => {
    const confirmation =  auth().verifyPhoneNumber('0967435076');
    console.log( confirmation);
  };

  renderButtonVerify = () => {
    return (
      <View>
        {firebase.auth().currentUser.phoneNumber ? (
          <FontAwesome name="check" size={12} color="green" />
        ) : (
          <TouchableOpacity
            onPress={() => this.RBSheet.open()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#e1f5fe',
              marginStart: 6,
              paddingStart: 6,
              borderRadius: 4,
              elevation: 2,
            }}>
            <FontAwesome name="exclamation-triangle" size={12} color="red" />
            <Text style={{color: 'red', fontSize: 16, paddingHorizontal: 4}}>
              Verify now
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  BottomSheet() {
    return (
      <RBSheet
        ref={(ref) => {
          this.RBSheet = ref;
        }}
        minClosingHeight={100}
        closeOnDragDown
        dragFromTopOnly
        height={150}
        openDuration={400}
        onClose={() => this.setState({verifyCode: ''})}
        customStyles={{
          container: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundColor: 'tomato',
          },
        }}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 16,
            marginBottom: 16,
            color: '#ffff',
          }}>
          Input your OTP code in SMS
        </Text>
        {this.renderVerify()}
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 16,
            marginBottom: 16,
            color: '#ffff',
          }}>
          Resent
        </Text>
      </RBSheet>
    );
  }

  logout = () => {
    ToastAndroid.show('Logout..... :(', ToastAndroid.LONG);
    auth().signOut();
    this.props.navigation.navigate('Login');
  };

  render() {
    console.log(this.user);
    return (
      <View
        ref={this.unFocus}
        style={{
          flex: 1,
          backgroundColor: '#fffff',
        }}>
        {this.BottomSheet()}
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
