import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, Dimensions,
    TextInput,  ScrollView, Modal, TouchableWithoutFeedback , FontAwesome, StyleSheet} from 'react-native'
import database from '@react-native-firebase/database'
import RebderFood from '../../component/RenderFood'
import RenderFood from '../../component/RenderFood'
import Icon from "react-native-vector-icons/FontAwesome";
import CheckBox from '@react-native-community/checkbox'
import { endAsyncEvent } from 'react-native/Libraries/Performance/Systrace'
const { width, height } = Dimensions.get('window')
export class FoodManager extends Component {

    constructor(props) {
        super(props);
        const selected = false;
        this.state = {
            Foods: [],
            Categories: [],
            SelectList: [],
            CatName: '',
            visible: false,
            CatDelKey: ''
        }
    }

    selectAnItem = (index) => {
        let listSelected = this.state.SelectList;
        let itemIndex = listSelected.indexOf(index);
        if (listSelected.includes(index)) {
            console.log(listSelected.includes(index))
            listSelected.splice(itemIndex, 1);
            this.setState({ SelectAll: false })
        } else {
            listSelected.push(index);
            if (listSelected.length == this.state.SelectList)
                this.setState({ SelectAll: true })
        }
        this.setState({ SelectList: listSelected })
        console.log(this.state.SelectList)
    }

    componentDidMount() {
        this.getAllFood();
        this.getAllCategory();
    }
    getAllFood = async () => {
        await database().ref('/Food/').on('value', snapshot => {
            const Foods = []
            snapshot.forEach(food => {
                Foods.push(food._snapshot)
            })
            this.setState({ Foods })

        })
    }

    getAllCategory = async () => {
        await database().ref('/Category/').on('value', snapshot => {
            const Categories = []
            snapshot.forEach(cat => {
                Categories.push(cat._snapshot)
            })
            this.setState({ Categories })

        })
    }

    onLongPressCheck = (index) => {
        const Data = this.state.SelectList;
        if (Data.includes(index)) {
            Data.splice(Data.indexOf(index), 1);
            this.setState({ SelectList: Data })
        }
        else {
            Data.push(index);
            this.setState({ SelectList: Data })
        }
    }
    onPressCheck = (item) => {
        const Data = this.state.SelectList;
        if (Data.includes(item.key)) {
            Data.splice(Data.indexOf(item.key), 1);
            this.setState({ SelectList: Data })
        }
        else {
            if (this.state.SelectList.length > 0) {
                Data.push(item.key);
                this.setState({ SelectList: Data })
            }
            else {
               this.props.navigation.navigate('EditFood', {food: item})
            }
        }
    }

    getFoodByCategory = (CatName) => {
        if (this.state.CatName == '') return this.state.Foods
        return this.state.Foods.filter((item) => (item.value.FoodType === CatName))
    }

    renderItemFood = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onLongPress={() => {
                    this.onLongPressCheck(item.key)
                    console.log(this.state.SelectList.includes(item.key))
                    //this.setState (this.state); 
                }}
                onPress={() => {
                    this.onPressCheck( item)
                }}
                style={{
                    height: 80,
                    flexDirection: 'row',
                    backgroundColor: this.state.SelectList.includes(item.key) ? 'tomato' : 'white',
                    borderRadius: 6,
                    marginVertical: 2,
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image source={{ uri: item.value.FoodImage }} style={{ width: 70, height: 70, borderRadius: 8, marginStart: 4, }} />
                    <View style={{ marginStart: 4 }}>
                        <Text style={{ fontSize: 16 }}>
                            {item.value.FoodName}
                        </Text>
                        <Text style={{ fontSize: 14, color: 'gray' }}>
                            {item.value.FoodType}
                        </Text>
                        <Text style={{ fontSize: 14, color: 'gray' }}>
                            $ {item.value.FoodPrice}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        alert('show more')
                    }}
                    style={{ width: 30, height: 30, }}>
                    <Icon name='ellipsis-v' size={22} color='tomato' />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    removeFoods = async () => {
        //alert(this.state.SelectList.length)
        if (this.state.SelectList.length == 0) {
            alert("??????")
        }
        else {

            await this.state.SelectList.forEach(key => {
                database().ref(`/Food/${key}`).remove();
            })
            this.setState({ listSelected: [] })
        }
    }

    removeCategory= async ()=>{
        await database().ref(`/Category/${this.state.CatDelKey}`).remove();
        this.setState({CatDelKey:''})
        this.setState({visible: false})
        alert('deteted!');
    }
    renderItemCategory = ({ item }) => {
        return (
            <TouchableOpacity
                onLongPress={() => {
                    this.setState({CatDelKey: item.key})
                    this.setState({ visible: true })
                }}
                onPress={() => {
                    this.setState({ SelectList: [] })
                    this.setState({ CatName: item.value.CategoryName })
                }}
                activeOpacity={0.9}
                style={{
                    width: 60, height: 30, justifyContent: 'center', alignItems: 'center',
                    borderRadius: 4, borderColor: 'tomato', borderWidth: 1, marginVertical: 4,
                    backgroundColor: this.state.CatName == item.value.CategoryName ? 'tomato' : '#ffff',
                    elevation: 2
                }}>
                <Text numberOfLines={1} style={{ fontSize: 9 }}>{item.value.CategoryName}</Text>
            </TouchableOpacity>
        )
    }

    renderOption = () => {
        return (
            <View style={{
                width: 70,
                backgroundColor: '#fffff',
                marginBottom: 4,
                marginHorizontal: 2,
                alignItems: 'center',

            }}>
                {/* option */}

                <View style={{ justifyContent: 'flex-end', marginVertical: 8 }}>
                    {/* Button select all */}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={{
                            width: 60, height: 30, justifyContent: 'center', alignItems: 'center',
                            borderRadius: 4, backgroundColor: 'tomato', marginVertical: 4, elevation: 2
                        }}>
                        <Icon name='object-ungroup' size={20} color='#ffff' />
                    </TouchableOpacity>
                    {/* Button sort */}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={{
                            width: 60, height: 30, justifyContent: 'center', alignItems: 'center',
                            borderRadius: 4, backgroundColor: 'tomato', marginVertical: 4, elevation: 2
                        }}>
                        <Icon name='sort' size={20} color='#ffff' />
                    </TouchableOpacity>
                    {/* Button Delete */}
                    <TouchableOpacity
                        onPress={() => this.removeFoods()}
                        activeOpacity={0.9}
                        style={{
                            width: 60, height: 30, justifyContent: 'center', alignItems: 'center',
                            borderRadius: 4, backgroundColor: 'tomato', marginVertical: 4, elevation: 2
                        }}>
                        <Icon name='trash' size={20} color='#ffff' />
                    </TouchableOpacity>
                </View>



                {/* category */}
                <View style={{ flex: 1, width: 68, backgroundColor: '#ffff', borderRadius: 6, elevation: 2, alignItems: 'center', }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ SelectList: [] })
                            this.setState({ CatName: '' })
                        }}
                        activeOpacity={0.9}
                        style={{
                            width: 60, height: 30, justifyContent: 'center', alignItems: 'center',
                            borderRadius: 4, borderColor: 'tomato', borderWidth: 1, marginVertical: 4,
                            backgroundColor: this.state.CatName === '' ? 'tomato' : '#ffff',
                            elevation: 2
                        }}>
                        <Text numberOfLines={1} style={{ fontSize: 9 }}>All</Text>
                    </TouchableOpacity>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ alignItems: 'center' }}
                        data={this.state.Categories}
                        renderItem={this.renderItemCategory}
                    >
                    </FlatList>
                </View>
            </View>
        )
    }
    Panel = () =>{
       return(
           <Modal
               visible={this.state.visible}
               animationType='fade'
               transparent={true}>
               <TouchableWithoutFeedback onPress={() => this.setState({ visible: false })}>
                   <View style={{ width: width, height: height, elevation: 4, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
                       <TouchableWithoutFeedback>
                           <View style={{
                               width: 250, height: 100, backgroundColor: '#ffff', borderRadius: 8, justifyContent: 'center', alignItems: 'center'
                           }}>
                               <Text style={{ fontSize: 22 }}>Delete it?</Text>
                               <View style={{ flexDirection: 'row', marginTop: 16 }}>
                                   <TouchableOpacity style={styles.button} 
                                   onPress = {()=>this.removeCategory()} >
                                       <Text style={styles.buttonText}>Cornfirm</Text>
                                   </TouchableOpacity>
                                   <TouchableOpacity style={styles.button} 
                                   onPress = {()=>this.setState({visible:false})}>
                                       <Text style={styles.buttonText}>Cancel</Text>
                                   </TouchableOpacity>
                               </View>
                           </View>
                       </TouchableWithoutFeedback>
                   </View></TouchableWithoutFeedback>
           </Modal>
       )
    }


    render = () => {
        return (
            <View style={{ marginHorizontal: 4, flex: 1, flexDirection: 'row' }}>
               {this.Panel()}
                <View style={{ flex: 1, width: 350, }}>
                    <FlatList data={this.getFoodByCategory(this.state.CatName)}
                        //extraData={this.state.SelectList}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.key}
                        //key = {this.state.SelectList}                    
                        renderItem={this.renderItemFood}
                    />
                </View>
                {this.renderOption()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    button:{
        width: 100,
        height:30,
        backgroundColor:'tomato',
        borderRadius: 4,
        elevation: 2,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal: 4
    },
    buttonText:{
        fontSize: 18,
        color: 'white'
    }
})

export default FoodManager










