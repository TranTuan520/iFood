import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const RenderCategory = ({navigation, Categories, user}) => {
  RenderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate('FoodByCategory', {
            CatId: item._data.CategoryName
          })
        }
        style={styles.containerCategory}>
        <Image source={{uri: item._data.CategoryImage}} style={styles.img} />
        <Text numberOfLines={1} style={styles.categoryTitle}>
          {item._data.CategoryName}
        </Text>
        <FontAwesome
          name="angle-double-right"
          size={24}
          color="tomato"
          style={{marginVertical: 4}}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <FontAwesome
          name="list-ul"
          size={16}
          color="white"
          style={{marginRight: 4}}
        />
        <Text
          style={styles.title}>
          Foods
        </Text>
      </View>
      <FlatList
        horizontal
        contentContainerStyle={{alignSelf: 'flex-start'}}
        // numColumns={3}
        data={Categories}
        extraData={Categories}
        renderItem={RenderItem}
        // keyExtractor = {(item)=>console.log(item)}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  containerCategory: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 100,
    backgroundColor: '#ffff',
    borderRadius: 8,
    marginHorizontal: 8,
    marginTop: 4,
    elevation: 4,
    marginBottom: 4,
  },
  img: {
    height: 40,
    width: 40,
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'gray',
    paddingHorizontal: 2,
  },
  containerTitle: {
    backgroundColor: 'tomato',
    width: 100,
    alignItems: 'center',
    paddingVertical: 2,
    marginTop: 8,
    marginBottom: 4,
    borderRadius: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 8,
    borderTopLeftRadius: 0,
  },
  container: {
    flex: 1,
    margin: 6,
    borderRadius: 10,
  },
  title:{
    fontSize: 18,
    color: 'white',
  }
});
export default RenderCategory;
