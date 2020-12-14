import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import {COLORS, FONTS} from '../constants/theme';
const {width, height} = Dimensions.get('window');
import firestore from "@react-native-firebase/firestore";
//database
import database, {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
import RecommendItem from '../component/RecommendItem';
import RenderCategory from '../component/RenderCategory';
import RenderFood from '../component/RenderFood';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      Foods: [],
      Categories: [],      
      user: firebase.auth().currentUser
    };
    //alert('current user: '+ JSON.stringify(this.state.user))
  }
  
  getUserInfo = ()=>{
    firestore().collection('User').doc(this.state.user.uid).onSnapshot(user=>{
      this.setState({user:user._data})
      console.log(this.state.user)
    })
        
  }
  getAllFood = () => {
    firestore()
    .collection('Food')
    .onSnapshot((documentSnapshot) => {
      const Foods = [];
      documentSnapshot.forEach((e) => {
        Foods.push(e);
      });
      this.setState({Foods});
      
    });
  };
  getAllCategory =  () => {
    firestore().collection('Category').
    onSnapshot((snapshot) => {
      const Categories = [];
      snapshot.forEach((cat) => {
        Categories.push(cat)
      });
      this.setState({Categories})     
    })
  };

  componentDidMount = () => {
    this.getUserInfo()
    // console.log('user ne ' + JSON.stringify(this.state.user));
    this.getAllFood();
    this.getAllCategory();   
  };

  renderHeader1 = () => {
    return (
      <View style={styles.containerHeader1}>
        <TextInput
          placeholderTextColor="gray"
          placeholder={`
          ${this.state.user.name} muốn ăn gì nè >_< ....`}
          style={{
            height: 40,
            fontSize: 16,
          }}
        />
        <View style={styles.containerSearchIcon}>
          <FontAwesome name="search" size={24} color="#ffff" />
        </View>
      </View>
    );
  };
  renderHeader = () => {
    return (
      <View style={styles.containerRenderHeader}>
        <Text style={styles.textHeader}>
          hi! {this.state.user.name}{' '}
        </Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            //alert(JSON.stringify(this.state.user))
            this.props.navigation.navigate('Profile')
          }}>
          <Image
            source={require('../assets/avt.jpg')}
            style={styles.userImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
        {/* </View> */}
      </View>
    );
  };

  renderBanners = () => {
    return (
      <View style={{alignItems: 'center', elevation: 16}}>
        <Swiper
          style={{
            height: width / 2,
            marginHorizontal: 6,
          }}
          autoplay
          autoplayTimeout={3}
          dotColor="gray"
          activeDotColor="tomato"
          horizontal
          showsHorizontalScrollIndicator={false}>
          <Image
            style={{
              height: width / 2,
              width: width - 6,
              borderRadius: 6,
            }}
            resizeMode="contain"
            source={require('../assets/banners/2.jpg')}
          />
          <Image
            style={{
              height: width / 2,
              width: width - 6,
              borderRadius: 6,
            }}
            resizeMode="contain"
            source={require('../assets/banners/0.jpg')}
          />
          <Image
            style={{
              height: width / 2,
              width: width - 6,
              borderRadius: 2,
            }}
            resizeMode="contain"
            source={require('../assets/banners/1.jpg')}
          />
          <Image
            style={{
              height: width / 2,
              width: width - 6,
              borderRadius: 6,
            }}
            resizeMode="contain"
            source={require('../assets/banners/3.jpg')}
          />
        </Swiper>
      </View>
    );
  };

  // category
  renderCategory = () => {
    return (
      <View
        style={
          {
            // height: 190
          }
        }>
        <RenderCategory
          navigation={this.props.navigation}
          Categories={this.state.Categories}
          user={this.state.user}
        />
      </View>
    );
  };

  renderRecommend = () => {
    return (
      <View style={{marginHorizontal: 8}}>
        <View style={styles.containerRenderRecommend}>
          <FontAwesome
            name="list-ul"
            size={16}
            color="white"
            style={{marginRight: 4}}
          />
          <Text style={styles.RecommendText}>Recommend</Text>
        </View>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            //pagingEnabled
          >
            <RecommendItem />
            <RecommendItem />
            <RecommendItem />
            <RecommendItem />
          </ScrollView>
        </View>
      </View>
    );
  };

  renderAllFood = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <RenderFood
          navigation={this.props.navigation}
          Foods={this.state.Foods}
        />
      </View>
    );
  };

  //main

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          {this.renderHeader1()}
          {this.renderBanners()}
          {this.renderCategory()}
          {this.renderRecommend()}
          {this.renderRecommend()}
          {this.renderAllFood()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'rgb(240, 240, 240)'},
  containerHeader1: {
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    borderRadius: 8,
    marginHorizontal: 12,
    marginBottom: 8,
    flexDirection: 'row',
    elevation: 8,
    margin: 16,
  },
  containerRenderRecommend: {
    backgroundColor: 'tomato',
    width: 160,
    alignItems: 'center',
    paddingVertical: 2,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 4,
    borderTopLeftRadius: 0,
  },
  containerRenderHeader: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'tomato',
    alignItems: 'center',
    elevation: 8,
  },
  textHeader: {
    ...FONTS.h2,
    color: 'white',
    marginHorizontal: 8,
  },
  RecommendText: {
    fontSize: 18,
    color: 'white',
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
    marginEnd: 6,
  },
  containerSearchIcon: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'tomato',
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
