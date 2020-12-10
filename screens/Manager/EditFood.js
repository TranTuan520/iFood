import React, { Component } from 'react'
import {
    Text, View, Image,
    TextInput, TouchableOpacity,
    Alert, ScrollView, StyleSheet
} from 'react-native'
import { Picker } from '@react-native-picker/picker';

import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage'


import * as Progress from 'react-native-progress';
import ImagePicker from "react-native-image-crop-picker";


export class EditFood extends Component {
    Food= this.props.route.params.food
    state = {        
        FoodName: '',
        FoodPrice: '',
        FoodImage: '',
        FoodType: '',
        FoodDescription: '',
        image: null,
        uploading: null,
        transferred: 0,
        Categories: [],
        CatSelected: null,

    }
    componentDidMount = () => {
        this.getCategory()
        console.log(`food: ${(this.props.route.params.food)}`)
        this.setState({FoodName: this.Food.value.FoodName})
        this.setState({FoodDescription: this.Food.value.FoodDescription})
        this.setState({FoodPrice: this.Food.value.FoodPrice})
        this.setState({FoodType: this.Food.value.FoodType})
        this.setState({FoodImage: this.Food.value.FoodImage})   
        
        
    }

    AddFood = async () => {
        await this.uploadImage();
        const ref = database().ref('/Food').push();
        ref.set({
            FoodName: this.state.FoodName,
            FoodPrice: this.state.FoodPrice,
            FoodType: this.state.FoodType,
            FoodDescription: this.state.FoodDescription,
            FoodImage: this.state.FoodImage,

        })
            .then(() => console.log('Data set.'));
    }
    getCategory = async () => {
        await database().ref('/Category/').on('value', snapshot => {
            const Categories = []
            snapshot.forEach(cat => {
                Categories.push(cat._snapshot)
            })
            this.setState({ Categories })
            console.log(this.state.Categories)
        })
    }
    //
    openPicker = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            // cropping: true
        }).then(image => {
            if (image) {
                this.setState({ image: image.path })
                console.log(this.state.image)
            }
        });
    }

    uploadImage = async () => {
        this.setState({
            transferred: 0,
            uploading: true
        })
        const fileName = this.state.image.substring(this.state.image.lastIndexOf('/') + 1);
        const task = storage().ref(`/ImageFood/${fileName}`).putFile(this.state.image);

        //
        task.on('state_changed', snapshot => {
            this.setState({ transferred: Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000 })
            console.log(Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000)
        })
        try {
            await task;
        } catch (e) {
            console.log(e)
        }
        this.setState({ FoodImage: (await storage().ref(`/ImageFood/${fileName}`).getDownloadURL()).toString() })
        console.log('food url ' + this.state.FoodImage)
        this.setState({ uploading: false })
        Alert.alert('Photo uploaded!', 'uhm...uhm....ahhhh')
        this.setState({ image: null })
        console.log(this.state.uploading)
    }
    CheckPush = ()=>{
        console.log("name:"+this.state.FoodName +"\nPrice:"+this.state.FoodPrice
        +"\nPrice:"+this.state.FoodPrice
        +"\nPrice:"+this.state.FoodType
        +"\nPrice:"+this.state.FoodDescription
        +"\nPrice:"+this.state.image)
        if(this.state.FoodName == '' 
        || this.state.FoodPrice == '' 
        || this.state.FoodType == '' 
        || this.state.FoodDescription == '' 
        || this.state.image == null)
           {                            
              Alert.alert('!', 'Please enter enough information')
               return 
           }
            return this.AddFood()
    }
    render() {
        return (
            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 6 }}>
                    <TouchableOpacity
                        style={styles.imgContainer}
                        onPress={() => this.openPicker()} >
                        <Image source={{ uri: this.state.FoodImage }} style={styles.img} resizeMode='cover' />
                    </TouchableOpacity>
                    <TextInput
                        value = {this.state.FoodName}
                        style={styles.around}
                        placeholder='Food Name'
                        onChangeText={(FoodName) => { this.setState({ FoodName }) }}
                    />
                    <TextInput style={styles.around}
                    value = {this.state.FoodPrice}
                        placeholder='Food Price'
                        onChangeText={(FoodPrice) => { this.setState({ FoodPrice }) }} />
                    {/* <TextInput placeholder='Food Type' onChangeText={(FoodType) => { this.setState({ FoodType }) }} /> */}
                    <View style={styles.around}>
                        <Picker
                            selectedValue = {this.state.FoodType}
                            style={{ height: 50, width: 250, }}
                            onValueChange={(itemValue) =>
                                this.setState({ FoodType: itemValue })
                            }>
                            {this.state.Categories.map(item => (
                                <Picker.Item
                                    label={item.value.CategoryName}
                                    value={item.value.CategoryName}
                                    key={item.key} />
                            ))}
                        </Picker>
                    </View>

                    <TextInput
                    value = {this.state.FoodDescription}
                        multiline={true}
                        textAlignVertical='top'
                        placeholder='Food Description'
                        onChangeText={(FoodDescription) => this.setState({ FoodDescription })}
                        style={styles.aroundDes}
                    />
                    {this.state.uploading 
                    ? 
                    ( <View style={{}}>
                            <Progress.Bar
                                progress={this.state.transferred}
                                width={200} />
                        </View>) 
                        : 
                        (<TouchableOpacity                                                   
                            style={styles.button} onPress={
                                () => { this.CheckPush() }
                            }>
                                <Text style={styles.buttonText}>Save :D</Text>
                            </TouchableOpacity>
                        )}
                </View>
            </ScrollView>
            //<View> <Text>fdfdfdfdfdfdf</Text></View>
        )
    }
}
const styles = StyleSheet.create({
    around: {
        height: 50,
        width: 250,
        borderColor: 'tomato',
        borderWidth: 1,
        borderRadius: 6,
        marginVertical: 8
    },
    aroundDes: {
        height: 70,
        width: 250,
        borderColor: 'tomato',
        borderWidth: 1,
        borderRadius: 6,
        marginVertical: 8
    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 8
    },
    imgContainer: {
        backgroundColor: 'tomato',
        borderRadius: 8, marginVertical: 8
    },
    button: {
        width: 200,
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: 'tomato',
        marginVertical: 6
    }, 
    buttonText:
    { fontSize: 22,
         color: 'white',
          padding: 8 }
})
export default EditFood
