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
  Animated
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import {COLORS, FONTS} from '../constants/theme';
const {width, height} = Dimensions.get('window');
import firestore from '@react-native-firebase/firestore';
//database
import database, {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import RecommendItem from '../component/RecommendItem';
import RenderCategory from '../component/RenderCategory';
import RenderFood from '../component/RenderFood';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Foods: [],
      Categories: [],
      user: firebase.auth().currentUser,
      Cart: new Map(),
      keyword: '', RandomFoods:[],
      foodSpringValue: new Animated.Value(0.3),
      bannerSpringValue: new Animated.Value(0.3),
      categorySpringValue: new Animated.Value(0.3)
    };
    //alert('current user: '+ JSON.stringify(this.state.user))
  }
  springAnimation = (Ani)=>{
    Animated.spring(Ani, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true
    }).start()
  }
  getCart = () => {
    firestore()
      .collection('Cart')
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((snapshot) => {
        this.setState({Cart: snapshot._data});
      });
  };
  searchFood= (keyword)=>{   
    const Foods = [];
    this.state.Foods.forEach(food=>{
      if(food._data.FoodName.includes(keyword.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D").toLowerCase()))
        Foods.push(food)
    })
    return Foods   
  }

  getUserInfo = () => {
    firestore()
      .collection('User')
      .doc(this.state.user.uid)
      .onSnapshot((user) => {
        this.setState({user: user._data});
        // console.log(this.state.user)
      });
  };
  getAllFood = async() => {
   await firestore()
      .collection('Food')
      .onSnapshot((documentSnapshot) => {
        const Foods = [];
        documentSnapshot.forEach((e) => {
          Foods.push(e);
        });
        this.setState({Foods});
        this.randomFoods();
        this.springAnimation(this.state.foodSpringValue)
      });
  };
  getAllCategory = () => {
    firestore()
      .collection('Category')
      .onSnapshot((snapshot) => {
        const Categories = [];
        snapshot.forEach((cat) => {
          Categories.push(cat);
        });
        this.setState({Categories});
        this.springAnimation(this.state.categorySpringValue)
      });
  };

  componentDidMount = () => {
    this.springAnimation(this.state.bannerSpringValue)
    this.getUserInfo();
    // console.log('user ne ' + JSON.stringify(this.state.user));
    this.getAllFood();
    this.getAllCategory();
    this.getCart();
    // console.log(this.state.Foods);
  };

  renderHeader1 = () => {
    return (
      <View style={styles.containerHeader1}>
        <TextInput
        onChangeText = {(keyword)=>this.setState({keyword})}
          placeholderTextColor="gray"
          placeholder={`${this.state.user.name} muốn ăn gì nè >_< ....`}
          style={{
            height: 40,
            fontSize: 16,
          }}
        />
        <View style={styles.containerSearchIcon}>
          <FontAwesome name="search" size={24} color="#ffff"  onPress = {()=>{this.props.navigation.navigate('FoodByCategory',{'Foods':this.searchFood(this.state.keyword),
        searchFood: this.searchFood})}}/>
        </View>
      </View>
    );
  };
  renderHeader = () => {
    return (
      <View style={styles.containerRenderHeader}>
        <Text style={styles.textHeader}>hi! {this.state.user.name} </Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            //alert(JSON.stringify(this.state.user))
            this.props.navigation.navigate('Profile');
          }}>
          <Image
            source={{uri: this.state.user.avatar}}
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
      <Animated.View style={{alignItems: 'center', elevation: 16, transform: [{scale: this.state.bannerSpringValue}]}}>
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
      </Animated.View>
    );
  };

  // category
  renderCategory = () => {
    return (
      <View
        style={{
          height: 160,
        }}>
        <RenderCategory
          navigation={this.props.navigation}
          Categories={this.state.Categories}
          user={this.state.user}
          spring = {this.state.categorySpringValue}
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
            <RecommendItem Foods = {this.state.RandomFoods} spring = {this.state.foodSpringValue} navigation = {this.props.navigation}/>         
        </View>
      </View>
    );
  };
  randomFoods = ()=>{
    const Foods = []
    for(let i =0;i< this.state.Foods.length/3; i ++)
    {
      Foods.push(this.state.Foods[Math.floor(Math.random() * this.state.Foods.length )])
    } 
   // console.log(Foods)
    this.setState({RandomFoods: Foods})
  }
  renderAllFood = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <RenderFood
          navigation={this.props.navigation}
          Foods={this.state.Foods}
          // Cart = {this.state.Cart}
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
          {this.renderAllFood()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: 'rgb(240, 240, 240)'},
    containerHeader1: {
    backgroundColor: '#f5f5f5',
    borderRadius: 4,  
    marginHorizontal: 12,
    marginBottom: 8,
    flexDirection: 'row',
    elevation: 2,
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
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
