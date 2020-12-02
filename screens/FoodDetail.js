import React, { Component } from 'react'
import { Text, View, TextInput, Dimensions, ScrollView, Image, StyleShee, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Swiper from 'react-native-swiper'
import { COLORS, FONTS } from '../constants/theme'
const { width, height } = Dimensions.get('window')

import RecommendItem from '../component/RecommendItem'
import RenderFood from '../component/RenderFood'
export class FoodDetail extends Component {
    renderHeader() {
        return (
            <View style={{ height: 70, width: width, margin: 8, marginStart: 16 }}>
                <FontAwesome name='angle-left' size={50} color='black'
                    style={{ marginRight: 4 }} onPress={() => this.props.navigation.goBack()} />
                      <Text style={{ ...FONTS.h1, marginVertical: 2, }}>Dog meat in heaven</Text>
            </View>
        )
    }
    renderFood() {
        return (
            <View style={{ alignItems: 'center' }}>                                          
                <Image source={require('../assets/food1.jpg')} style={{ width: 400, height: 300, borderRadius: 13, marginVertical: 16 }} ></Image>
                <View style={{ flexDirection: 'row', height: 80, width: 350, backgroundColor: '#ff8a65', borderRadius: 8, elevation: 8 }}>
                    <View style={{
                        width: 90, flex: 1,
                        
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{ ...FONTS.h3, color: 'white' }}>$ 69.00</Text>
                        <Text style={{ ...FONTS.h3, color: 'white' }}>Price</Text>
                    </View>
                    <View style = {{ width: 1, marginVertical: 16,  backgroundColor: 'white'}}></View>
                    <View style={{
                        width: 90, flex: 1,
                       
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{ ...FONTS.h3, color: 'white' }}>Healthy</Text>
                        <Text style={{ ...FONTS.h3, color: 'white' }}>Type</Text>
                    </View>

                    <TouchableOpacity style={{
                         flex: 1,
                       borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:'green', elevation: 8
                    }}>
                        <Text style={{ ...FONTS.h3, color: 'white' }}>Add to Cart</Text>
                        
                    </TouchableOpacity>
                    {/* <View style={{
                        width: 90, flex: 1,
                        borderRadius: 22,
                        backgroundColor: '#ff5722',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <FontAwesome name='plus' size={17} color='white' style={{ position: 'absolute', right: 8 }} />
                        <Text style={{ ...FONTS.h2, color: 'white' }}>1</Text>
                        <FontAwesome name='minus' size={17} color='white' style={{ position: 'absolute', left: 8 }} />
                    </View> */}
                </View>
            </View>
        )
    }

    renderDescription() {
        return (
            <View style={{ flex: 1, paddingBottom: 8, paddingHorizontal: 6 , marginTop: 6
            }} >

                <ScrollView contentContainerStyle={{}} showsVerticalScrollIndicator={false} >
                    <Text style={{
                        ...FONTS.h1, color: 'black',
                    }}>Description</Text>
                    <Text style={{ ...FONTS.body2, color: COLORS.lightGray }}>
                        Hôm nay thật khác
                        Tinh mơ tôi thức dậy thật sớm
                        Cuộn mền và gối vươn vai để lấy hơi thật sâu…
                        Giờ đi đâu cũng thấy đông người
                        đến lúc chỉ mong sống xa thành phố
                        Tìm về nơi hoang sơ yên bình
                        quên đi tôi đã sống thế nào…
                        Chorus:
                        Chơi vơi đứng giữa cuộc đời
                        cô đơn không muốn về nhà
                        Chờ mong ai nắm tay tôi sẻ chia và
                        động lòng khi tôi khóc…
                        Gió mát xua tan lo âu
                        Non xanh che hết muộn sầu
                        là nơi tôi muốn dừng lại:
                        nơi tồn tại Thật Lòng và Cảm Thông
                        I am lonely wherever I go
                        What should I do?
                        Why why… I am lonely wherever I go?
                        Đời người không những ngắn ngủi và chóng tàn
                        Chỉ còn mình với chiếc bóng của chính mình
                        Muốn hét lên những ngại ngần
                        rồi biết chẳng có ai nghe
                        lòng càng thêm chông chênh…
                        ” I’m fine! Dont worry!”
                        (Thật ra là cô đơn)
                        ” I Am not Okay”
                        (Lâu ngày tâm hồn trở nên trống rỗng)
                        Chẳng tìm ra chân tình
                        khiến người ta chỉ còn một thế giới hời hợt vô tâm
                        
                    </Text>
                </ScrollView>
            </View>
            
        )
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                {this.renderHeader()}
                {this.renderFood()}
                {this.renderDescription()}
            </View>
        )
    }






}

export default FoodDetail
