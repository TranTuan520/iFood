import React, { Component } from 'react'
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity, Dimensions, Alert, ScrollView } from 'react-native'

import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage'


import * as Progress from 'react-native-progress';
import ImagePicker from "react-native-image-crop-picker";

import { Button } from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { COLORS, FONTS } from '../../constants/theme'
const { width, height } = Dimensions.get('window')

const ref = database().ref('/Food/');

export class Manager extends Component {
    state = {
        FoodName: '',
        FoodPrice: '',
        FoodImage: '',
        FoodType: '',
        FoodDescription: '',

        image: null,
        uploading: null,
        transferred: 0,

    }

    AddFood = async () => {
        await this.uploadImage();
        const ref = database().ref('/Food').push();
        ref.set({
            FoodName: this.state.FoodName,
            FoodPrice: this.state.FoodPrice,
            FoodType: this.state.FoodType,
            FoodDescription: this.state.FoodDescription,
            FoodImage: this.state.FoodImage
        })
            .then(() => console.log('Data set.'));
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
    render() {
        return (
            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 6 }}>
                <TouchableOpacity onPress={() => this.openPicker()} >
                    <Image source={{ uri: this.state.image }} style={{ width: 150, height: 150, backgroundColor: 'tomato' }} resizeMode='contain'  />
                    </TouchableOpacity>
                    <TextInput placeholder='Food Name' onChangeText={(FoodName) => { this.setState({ FoodName }) }} />
                    <TextInput placeholder='Food Price' onChangeText={(FoodPrice) => { this.setState({ FoodPrice }) }} />
                    <TextInput placeholder='Food Type' onChangeText={(FoodType) => { this.setState({ FoodType }) }} />
                    <TextInput multiline={true} textAlignVertical='top' placeholder='Food Description' onChangeText={(FoodDescription) => this.setState({ FoodDescription })}
                        style={{ height: 70, width: 250, borderColor: 'black', borderWidth: 1, borderRadius: 6 }}
                    />

                   

                    {this.state.uploading ? (
                        <View style={{}}>
                            <Progress.Bar progress={this.state.transferred} width={300} />
                        </View>
                    ) : (
                            <TouchableOpacity style={{ width: 200, alignItems: 'center', borderRadius: 4, backgroundColor: 'tomato', marginVertical: 6 }} onPress={
                                () => { this.AddFood() }
                            }>
                                <Text style={{ ...FONTS.h2, color: 'white', padding: 8 }}>Add Food :D</Text>
                            </TouchableOpacity>
                        )}
                   
                   
                </View>
            </ScrollView>
           //<View> <Text>fdfdfdfdfdfdf</Text></View>
        )
    }
}

export default Manager
