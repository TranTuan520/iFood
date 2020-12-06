import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { COLORS, FONTS } from '../constants/theme'

const Button = ({ text, onPress, width, backgroundColor }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{width: {width},
            
            
            }}>
                <Text > {text} </Text>
            </View>
        </TouchableOpacity>
    )
}


export default Button
