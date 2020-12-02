import React, { Component } from 'react'
import { Text, View, StyleSheet, PermissionsAndroid, Image, Button } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation'


import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'

console.disableYellowBox = true

export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Example App',
        'message': 'Example App access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location")
      //   alert("You can use the location");

    } else {
      console.log("location permission denied")
      //   alert("Location permission denied");
    }
  } catch (err) {
    console.warn(err)
  }
}

export class Map extends Component {
  async componentWillMount() {
    await requestLocationPermission()
  }
  componentDidMount() {
    Geolocation.watchPosition((position) => {
      alert('latitude: ' + position.latitude + '\nlongtidude: ' + position.longitude)
      this.setState({
        // latitude: position.latitude,
        // longitude: position.longitude
      })
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      latitude: 10.8514378,
      longitude: 106.7558754,
    }


  }

  // componentDidMount(){

  //   const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + 'location=' + '37.78825' + ',' + '-122.4324' + '&radius=100&type=restaurant&key=AIzaSyCS-Q2QnDSuvpE2OL7CLa6_iArG-AuZYUw';
  //         fetch(url)
  //             .then((response) => response.json())
  //             .then((JsonResponse) => {
  //                 // console.error(JsonResponse)
  //                 console.log(JsonResponse)
  //             })
  //             .catch((error) => {
  //                 alert('error')
  //             });
  // }




  render() {
    return (
      <View >
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          //customMapStyle = {MapDarkStyle}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >

          <Marker
            coordinate={{
              latitude: 10.8514378,
              longitude: 106.7558754,
            }}
            title='title ne!'
            description='description ne! '>
            <Image source={require('../assets/marker.png')} style={{ width: 30, height: 30 }} />
            <Callout tooltip>
              <View style={styles.bubble}>
                <Text style={styles.name}>Favorate Restaurant</Text>
                {/* <Text>A short  description</Text> */}
                <Image source={require('../assets/banners/2.jpg')} style={styles.image} />
              </View>
              <View style={styles.arrowborder} />

            </Callout>
          </Marker>



        </MapView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    height: '100%',
    width: '100%'
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#ffff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#ffff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32
  },
  arrowborder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5
    //MARGIN-BOTTOM -15
  },
  name: {
    fontSize: 16,
    marginBottom: 5
  },
  image: {
    width: 120,
    height: 80
  }
});
const MapStandaStyle = [
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
]

const MapDarkStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]
const Images = [
  { image: require('../assets/banners/0.jpg') },
  { image: require('../assets/banners/1.jpg') },
  { image: require('../assets/banners/2.jpg') },
  { image: require('../assets/banners/3.jpg') },
]

const Markers = [
  {
    coordinate: {
      latitude: 10.8508925,
      longitude: 106.7588258,
    },
    title: 'The Alay Thu Duc',
    description: 'Amazing good job em!',
    image: Images[0].image,
    rating: 4,
    reviews: 99

  },
  {
    coordinate: {
      latitude: 10.8501874,
      longitude: 106.7589796,
    },
    title: 'Hoi Quan',
    description: 'Amazing good job em!',
    image: Images[1].image,
    rating: 4,
    reviews: 99

  },
  {
    coordinate: {
      latitude: 0.8501874,
      longitude: 106.7589796,
    },
    title: 'Quan Chay Sen Hong',
    description: 'Amazing good job em!',
    image: Images[2].image,
    rating: 4,
    reviews: 99

  },
  {
    coordinate: {
      latitude: 10.85037,
      longitude: 106.7571139,
    },
    title: 'Pizza Hut',
    description: 'Amazing good job em!',
    image: Images[3].image,
    rating: 4,
    reviews: 99

  },
]


export default Map
