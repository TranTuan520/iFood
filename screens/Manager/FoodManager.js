import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');
import firestore from '@react-native-firebase/firestore';
export class FoodManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Foods: [],
      Categories: [],
      SelectList: [],
      CatName: '',
      visible: false,
      CatDelKey: '',
    };
  }
 
  renderItemFood = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onLongPress={() => {
          this.onLongPressCheck(item.id);
          console.log(this.state.SelectList.includes(item.id));
        }}
        onPress={() => {
          this.onPressCheck(item);
        }}
        style={[
          styles.containerRenderItemFood,
          {
            backgroundColor: this.state.SelectList.includes(item.id)
              ? 'tomato'
              : 'white',
          },
        ]}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image source={{uri: item._data.FoodImage}} style={styles.imgFood} />
          <View style={{marginStart: 4}}>
            <Text numberOfLines={1} style={{fontSize: 16, paddingEnd: 100}}>
              {item._data.FoodName}
            </Text>
            <Text style={{fontSize: 14, color: 'gray'}}>
              {item._data.FoodType}
            </Text>
            <Text style={{fontSize: 14, color: 'gray'}}>
              $ {item._data.FoodPrice}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            alert('show more');
          }}
          style={{
            width: 40,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="ellipsis-v" size={26} color="tomato" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  
  removeFoods = () => {
    if (this.state.SelectList.length == 0) {
      alert('??????');
    } else {
      this.state.SelectList.forEach((key) => {      
        firestore().collection('Food').doc(key).delete().then(()=>{            
            alert('deleted!');
         })
      });
    }
  };
  // chua lam phan xoa food theo category
  removeCategory = () => {
      const DelFood = this.getFoodByCategory(this.state.CatDelKey)
     firestore().collection(`Category`).doc(this.state.CatDelKey).delete().then(()=>{
         DelFood.forEach(del=>{
             firestore().collection('Food').collection(del.id).delete();
         })
        this.setState({CatDelKey: ''});
        this.setState({visible: false});
        alert('deleted!');
     })
  
  };
  renderItemCategory = ({item}) => {
    return (
      <TouchableOpacity
        onLongPress={() => {
          this.setState({CatDelKey: item.id});
          this.setState({visible: true});
        }}
        onPress={() => {
          this.setState({SelectList: []});
          this.setState({CatName: item._data.CategoryName});
        }}
        activeOpacity={0.9}
        style={[
          styles.containerRenderItemCategory,
          {
            backgroundColor:
              this.state.CatName == item._data.CategoryName
                ? 'tomato'
                : '#ffff',
          },
        ]}>
        <Text numberOfLines={1} style={{fontSize: 9}}>
          {item._data.CategoryName}
        </Text>
      </TouchableOpacity>
    );
  };

  renderOption = () => {
    return (
      <View
        style={styles.containerRenderOption}>
        {/* option */}

        <View style={{justifyContent: 'flex-end', marginVertical: 8}}>
          {/* Button select all */}
          <TouchableOpacity activeOpacity={0.9} style={styles.buttonOption}>
            <Icon name="object-ungroup" size={20} color="#ffff" />
          </TouchableOpacity>
          {/* Button sort */}
          <TouchableOpacity activeOpacity={0.9} style={styles.buttonOption}>
            <Icon name="sort" size={20} color="#ffff" />
          </TouchableOpacity>
          {/* Button Delete */}
          <TouchableOpacity
            onPress={() => this.removeFoods()}
            activeOpacity={0.9}
            style={styles.buttonOption}>
            <Icon name="trash" size={20} color="#ffff" />
          </TouchableOpacity>
        </View>

        {/* category */}
        <View style={styles.containerCategory}>
          <TouchableOpacity
            onPress={() => {
              this.setState({SelectList: []});
              this.setState({CatName: ''});
            }}
            activeOpacity={0.9}
            style={[styles.buttonCategory, {backgroundColor: this.state.CatName === '' ? 'tomato' : '#ffff',}]}>
            <Text numberOfLines={1} style={{fontSize: 9}}>
              All
            </Text>
          </TouchableOpacity>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{alignItems: 'center'}}
            data={this.state.Categories}
            keyExtractor={(item) => item.id}
            extraData={this.state}
            renderItem={this.renderItemCategory}></FlatList>
        </View>
      </View>
    );
  };
  Panel = () => {
    return (
      <Modal
        visible={this.state.visible}
        animationType="fade"
        transparent={true}>
        <TouchableWithoutFeedback
          onPress={() => this.setState({visible: false})}>
          <View
            style={{
              width: width,
              height: height,
              elevation: 4,
              backgroundColor: 'rgba(0,0,0,0.5)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  width: 250,
                  height: 100,
                  backgroundColor: '#ffff',
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 22}}>Delete it?</Text>
                <View style={{flexDirection: 'row', marginTop: 16}}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.removeCategory()}>
                    <Text style={styles.buttonText}>Cornfirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.setState({visible: false})}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  render = () => {
    return (
      <View style={{marginHorizontal: 4, flex: 1, flexDirection: 'row'}}>
        {this.Panel()}
        <View style={{flex: 1, width: 350}}>
          <FlatList
            data={this.getFoodByCategory(this.state.CatName)}
            extraData={this.state}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={this.renderItemFood}
          />
        </View>
        {this.renderOption()}
      </View>
    );
  };

  getFoodFromStore = () => {
    firestore()
      .collection('Food')
      .onSnapshot((documentSnapshot) => {
        const Foods = [];
        documentSnapshot.forEach((e) => {
          Foods.push(e);
        });
        this.setState({Foods});
        
      });

    // console.log(FOOD)
    //    const Foods = await firestore().collection('Food').where('FoodType','==', 'Pizza').get()
    //    Foods.forEach(e=>{
    //         console.log(e)
    //    })
  };
  getCategoryFromStore = () => {
    firestore()
      .collection('Category')
      .onSnapshot((snapshot) => {
        const Categories = [];
        snapshot.forEach((e) => {
          Categories.push(e);
        });
        this.setState({Categories});
      });

  };

  componentDidMount() {
    //this.getAllFood();
    //this.getAllCategory();
    this.getCategoryFromStore();
    this.getFoodFromStore();
    
  }
  //   get data from realtime(not use)
  getAllFood = () => {
    database()
      .ref('/Food/')
      .on('value', (snapshot) => {
        const Foods = [];
        snapshot.forEach((food) => {
          Foods.push(food._snapshot);
        });
        this.setState({Foods});
      });
  };
//   get data from realtime(not use)
  getAllCategory = () => {
    database()
      .ref('/Category/')
      .on('value', (snapshot) => {
        const Categories = [];
        snapshot.forEach((cat) => {
          Categories.push(cat._snapshot);
        });
        this.setState({Categories});
        console.log(this.state.Categories);
      });
  };

  onLongPressCheck = (index) => {
    const Data = this.state.SelectList;
    if (Data.includes(index)) {
      Data.splice(Data.indexOf(index), 1);
      this.setState({SelectList: Data});
    } else {
      Data.push(index);
      this.setState({SelectList: Data});
    }
  };
  onPressCheck = (item) => {
    const Data = this.state.SelectList;
    if (Data.includes(item.id)) {
      Data.splice(Data.indexOf(item.id), 1);
      this.setState({SelectList: Data});
    } else {
      if (this.state.SelectList.length > 0) {
        Data.push(item.id);
        this.setState({SelectList: Data});
      } else {
        this.props.navigation.navigate('EditFood', {food: item});
      }
    }
  };

  getFoodByCategory = (CatName) => {
    if (this.state.CatName == '') return this.state.Foods;
    return this.state.Foods.filter((item) => item._data.FoodType == CatName);
  };


}

const styles = StyleSheet.create({
    containerRenderOption:{
        width: 70,
        backgroundColor: '#eeeeee',
        marginBottom: 4,
        marginHorizontal: 0,
        alignItems: 'center',
        justifyContent:'center'
      },
  buttonCategory: {
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'tomato',
    borderWidth: 1,
    marginVertical: 4,
    elevation: 2,
  },
  containerCategory: {
    flex: 1,
    width: 68,
    backgroundColor: '#ffff',
    borderRadius: 6,
    elevation: 2,
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 30,
    backgroundColor: 'tomato',
    borderRadius: 4,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  containerRenderItemFood: {
    height: 80,
    flexDirection: 'row',
    borderRadius: 6,
    marginVertical: 2,
    alignItems: 'center',
    flexDirection: 'row',
  },
  imgFood: {width: 70, height: 70, borderRadius: 8, marginStart: 4},
  containerRenderItemCategory: {
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'tomato',
    borderWidth: 1,
    marginVertical: 4,

    elevation: 2,
  },
  buttonOption: {
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: 'tomato',
    marginVertical: 4,
    elevation: 2,
  },
});

export default FoodManager;
