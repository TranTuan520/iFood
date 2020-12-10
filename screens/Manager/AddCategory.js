import React, { Component } from 'react';
import {
    Text, View, ImageBackground, Image,
    TextInput, TouchableOpacity, Dimensions, Alert, StyleSheet
} from 'react-native';
import * as Progress from 'react-native-progress';
import ImagePicker from "react-native-image-crop-picker";
import database from "@react-native-firebase/database";
import storage from '@react-native-firebase/storage';
import { COLORS, FONTS } from '../../constants/theme';

export class AddCategory extends Component {
    state = {
        CategoryName: '',
        CategoryImage: '',
        Uploading: null,
        transferred: 0,
        image: null
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', marginTop: 16 }}>
                <TouchableOpacity
                style = {styles.imgContainer}
                 onPress={() => this.openPicker()} >
                    <Image source={{ uri: this.state.image }} style={styles.img}  resizeMode = 'cover'/>
                </TouchableOpacity>
                <TextInput
                style = {styles.around}
                placeholder='Category Name' onChangeText={(CategoryName) => { this.setState({ CategoryName }) }} />
                {
                    this.state.Uploading ?
                        (
                            <View style={{}}>
                                <Progress.Bar progress={this.state.transferred} width={200} />
                            </View>
                        ) :
                        (
                            <TouchableOpacity style={styles.button} onPress={
                                () => { this.uploadCategory() }
                            }>
                                <Text style={styles.buttonText}>Add Category :D</Text>
                            </TouchableOpacity>
                        )
                }
            </View>
        )
    }
    openPicker = () => {
        ImagePicker.openPicker({
            width: 300, height: 400
        }).then(image => {
            if (image)
                this.setState({ image: image.path })
        })
    }
    uploadImage = async () => {
        this.setState({ transferred: 0, Uploading: true })
        const fileName = this.state.image.substring(this.state.image.lastIndexOf('/') + 1);
        const task = storage().ref(`/Category/${fileName}`).putFile(this.state.image);

        task.on('state_changed', snapshot => {
            this.setState({ transferred: Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000 })
        })
        try {
            await task;
        } catch (e) { console.log(e) }
        this.setState({ CategoryImage: (await storage().ref(`/Category/${fileName}`).getDownloadURL()).toString() })

        this.setState({ Uploading: false })
        Alert.alert('Photouploaded', 'uhm...uhm......ahhhh');
    }
    uploadCategory = async () => {
        await this.uploadImage();
        database().ref('/Category').push().set({
            CategoryName: this.state.CategoryName,
            CategoryImage: this.state.CategoryImage
        })
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
    {
        fontSize: 22,
        color: 'white',
        padding: 8
    }
})


export default AddCategory
