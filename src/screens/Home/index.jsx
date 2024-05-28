import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import SplashScreen from 'react-native-splash-screen';
import MapView, {
  Callout,
  CalloutSubview,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {ArrowCircleRight, LocationAdd, Map} from 'iconsax-react-native';
import FloatActionButton from '../../components/UI/FloatActionButton';
import MyCustomCallOut from '../../components/map/myCustomCallOut';
import MyCustomMarker from '../../components/map/myCustomMarker';
import {COORDINATESELECT, DETAIL} from '../../utils/routes';
import LottieView from 'lottie-react-native';

const Home = ({navigation}) => {
  const [mapType, setMapType] = useState('standard');
  const [currentPosition, setCurrentPosition] = useState(null);
  const [locations, setLocations] = useState([]);

  const Markers = [
    {
      coordinate: {
        latitude: 41.0314536,
        longitude: 28.9897092,
      },
      title: 'Restaurant 111',
      description: 'Best Delicious',
      rating: '4.7',
    },

    {
      coordinate: {
        latitude: 41.0492233,
        longitude: 29.002234,
      },
      title: 'Restaurant 222',
      description: 'Best Delicious',
      rating: '3.8',
    },

    {
      coordinate: {
        latitude: 41.059375,
        longitude: 29.0011011,
      },
      title: 'Restaurant 333',
      description: 'Best Delicious',
      rating: '5.0',
    },
  ];

  const getLocations = () => {
    // Firestore'dan bir koleksiyon referansı al
    const collectionRef = firestore().collection('Locations');

    // Koleksiyondaki verileri dinlemek için onSnapshot kullanımı
    const unsubscribe = collectionRef.onSnapshot(snapshot => {
      const fetchedData = [];
      snapshot.forEach(doc => {
        fetchedData.push({id: doc.id, ...doc.data()});
      });
      setLocations(fetchedData);
    });

    // Component kaldırıldığında dinleyiciyi temizle
    return () => unsubscribe();
  };

  const changeMapType = () => {
    if (mapType == 'standard') {
      setMapType('satellite');
    } else {
      setMapType('standard');
    }
  };

  useEffect(() => {
    SplashScreen.hide();
    Geolocation.getCurrentPosition(info => {
      setCurrentPosition(info.coords),
        error => {
          Alert.alert('GetCurrentPositionError', JSON.stringify(error));
        },
        {
          enableHighAccuracy: true,
        };
    });

    getLocations();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <FloatActionButton
          onPress={() => changeMapType()}
          icon={
            <Map
              size={40}
              color="green"
              variant={mapType == 'standard' ? 'Bold' : 'Outline'}
            />
          }
          customStyle={{right: 20, top: 30}}
        />
        <FloatActionButton
          onPress={() => navigation.navigate(COORDINATESELECT)}
          icon={
            <LocationAdd
              size={40}
              color="green"
              variant={mapType == 'standard' ? 'Bold' : 'Outline'}
            />
          }
          customStyle={{right: 20, bottom: 30}}
        />
        <MapView
          mapType={mapType == 'standard' ? 'standard' : 'satellite'}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: currentPosition?.latitude,
            longitude: currentPosition?.longitude,
            latitudeDelta: 0.45,
            longitudeDelta: 0.0151,
          }}>
          <Marker
            coordinate={{
              latitude: currentPosition?.latitude,
              longitude: currentPosition?.longitude,
            }}
            title={"I'm here"}></Marker>
          {locations.map((marker, index) => (
            <Marker key={index} coordinate={marker.coordinate}>
              <Callout
                onPress={() => navigation.navigate(DETAIL, {item: marker})}>
                <MyCustomCallOut
                  title={marker.title}
                  description={marker.description}
                  rating={marker.rate}
                />
              </Callout>
            </Marker>
          ))}

          {/* <Marker
          coordinate={{
            latitude: 41.0314536,
            longitude: 28.9897092,
          }}
          title={'marker.title'}
          description={'marker.description'}
        /> */}

          {/* <Marker
          coordinate={{
            latitude: 41.0314536,
            longitude: 28.9897092,
            latitudeDelta: 0.2,
            longitudeDelta: 0.0151,
          }}>
          <MyCustomMarker />
        </Marker> */}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {flex: 1},
});

/*



------------> Anlık koordinat takibi (watchPosition) <--------------



import React, {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE, Marker, LatLng} from 'react-native-maps';

const Home = () => {
  const [coord, setCoord] = useState();
  const initialRegion = {
    latitude: coord?.latitude,
    longitude: coord?.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  useEffect(() => {
    console.log('COOOORD', coord);
    Geolocation.watchPosition(
      position => {
        console.log(position);
        setCoord(position.coords);
      },
      error => {
        console.log(error);
      },
    );
  }, []);

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{flex: 1}}
      region={initialRegion}>
      {coord !== undefined && (
        <Marker
          coordinate={{latitude: coord?.latitude, longitude: coord?.longitude}}
        />
      )}
    </MapView>
  );
};
export default Home;

*/

/*


------------> Animasyonlu Marker ekleme <--------------



import React, {useState, useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Animated, Easing, View} from 'react-native';

const Home = () => {
  const coordDolmabahce = {
    latitude: 41.0391683,
    longitude: 28.9982707,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const [growValue] = useState(new Animated.Value(0));

  const grow = growValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(growValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [growValue]);

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{flex: 1}}
      initialRegion={coordDolmabahce}>
      <Marker coordinate={coordDolmabahce} anchor={{x: 0.5, y: 0.5}}>
        <View
          style={{
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Animated.View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              transform: [{scale: grow}],
              backgroundColor: '#1976d299',
            }}
          />
        </View>
      </Marker>
      <Marker coordinate={coordDolmabahce} />
    </MapView>
  );
};

export default Home;

*/

/*



----------------> Harita kontrolleri ekleme (zoomIn/zoomOut) <------------------




import React, {useRef, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Home = () => {
  const map = useRef(null);

  const [region, setRegion] = useState({
    latitude: 41.0391683,
    longitude: 28.9982707,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const onRegionChange = changedRegion => {
    setRegion(changedRegion);
  };
  const zoomDelta = 0.005;

  const onZoom = zoomSign => {
    const zoomedRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta - zoomDelta * zoomSign,
      longitudeDelta: region.longitudeDelta - zoomDelta * zoomSign,
    };
    setRegion(zoomedRegion), map.current.animateToRegion(zoomedRegion);
  };

  const onZoomIn = () => onZoom(5);
  const onZoomOut = () => onZoom(-5);
  return (
    <>
      <MapView
        ref={map}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        onRegionChange={onRegionChange}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onZoomIn}>
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
        <View style={styles.spacer} />
        <TouchableOpacity style={styles.button} onPress={onZoomOut}>
          <Text style={styles.text}>-</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    end: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
    padding: 12,
  },
  button: {},
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  spacer: {
    marginVertical: 7,
  },
});
export default Home;


*/

/*



----------------> Polygon ekleme <------------------



NOT: İstediğiniz ilçenin polygon koordinatlarını bulabilmek için https://nominatim.openstreetmap.org/ ‘a giderek
ilçenin adını arattırmanız gerekiyor. Daha sonra aşağıdaki gibi çıkan kısımda details butonuna basarak bölgenin
detaylarını açmanız lazım.

Devamında çıkan ekranda OSM ID’sini kopyalamanız gerekiyor.

Kopyaladığınız OSM ID’yi http://polygons.openstreetmap.fr/ adresine giderek Id of relation kısmına yazın ve
Submit ettikten sonra çıkan sonuçlar kısmında GeoJSON’a tıklayın. Ekrandaki JSON’ı kopyalayın ve
projede besiktas.json adında bir dosya oluşturarak JSON içeriğini buraya yapıştırın.

Link:  https://zaferayan.medium.com/react-nativede-harita-nas%C4%B1l-kullan%C4%B1l%C4%B1r-7b8952e486b9


import React from 'react';
import MapView, {PROVIDER_GOOGLE, Polygon} from 'react-native-maps';
import etimesgut from '../../utils/etimesgut.json';
const Home = () => {
  const coordDolmabahce = {
    latitude: 39.9691683,
    longitude: 32.4482707,
    latitudeDelta: 0.15,
    longitudeDelta: 0.15,
  };
  const polygon = etimesgut.coordinates[0][0].map(c => {
    return {longitude: c[0], latitude: c[1]};
  });
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{flex: 1}}
      initialRegion={coordDolmabahce}>
      <Polygon coordinates={polygon} />
    </MapView>
  );
};
export default Home;


*/

/*


---------------------> Lottie ile Animasyonlu Marker ekleme <---------------------


Çalışmadı !!!



import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import LottieView from 'lottie-react-native';
import {View} from 'react-native';
const Home = () => {
  const coordDolmabahce = {
    latitude: 41.0391683,
    longitude: 28.9982707,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{flex: 1}}
      initialRegion={coordDolmabahce}>
      <Marker coordinate={coordDolmabahce} anchor={{x: 0.5, y: 0.5}}>
        <View
          style={{
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LottieView
            source={require('../../Assets/blueRiple.json')}
            autoPlay
            loop
          />
        </View>
      </Marker>
      <Marker coordinate={coordDolmabahce} />
    </MapView>
  );
};
export default Home;


*/
