import {Alert, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {
  ArrowCircleRight,
  ArrowRight,
  LocationAdd,
  Map,
} from 'iconsax-react-native';
import FloatActionButton from '../../components/UI/FloatActionButton';
import MyCustomCallOut from '../../components/map/myCustomCallOut';
import MyCustomMarker from '../../components/map/myCustomMarker';
import {ADDLOCATION, COORDINATESELECT, DETAIL} from '../../utils/routes';
import LottieView from 'lottie-react-native';

const CoordinateSelect = ({navigation}) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  const handleSelectCoordinate = e => {
    setCoordinates(e.nativeEvent.coordinate);
    //console.log(coordinates);
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setCurrentPosition(info.coords),
        error => {
          Alert.alert('GetCurrentPositionError', JSON.stringify(error));
        },
        {
          enableHighAccuracy: true,
        };
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <FloatActionButton
          disabled={coordinates ? false : true}
          onPress={() =>
            navigation.navigate(ADDLOCATION, {location: coordinates})
          }
          icon={
            coordinates ? (
              <ArrowRight size={40} color={'white'} variant={'Bold'} />
            ) : (
              <LocationAdd size={40} color={'white'} variant={'Bold'} />
            )
          }
          customStyle={{
            flex: 1,
            right: 20,
            bottom: 30,
            backgroundColor: coordinates ? 'green' : 'gray',
          }}
        />
        <MapView
          onPress={handleSelectCoordinate}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: currentPosition?.latitude,
            longitude: currentPosition?.longitude,
            latitudeDelta: 0.2,
            longitudeDelta: 0.0151,
          }}>
          <Marker
            coordinate={{
              latitude: currentPosition?.latitude,
              longitude: currentPosition?.longitude,
            }}
            title={"I'm here"}></Marker>

          <Marker
            coordinate={{
              latitude: coordinates?.latitude,
              longitude: coordinates?.longitude,
            }}
            title={"I'm here"}></Marker>

          {/* {coordinates.map((marker, index) => (
            <Marker key={index} coordinate={marker.coordinate}>
              <Callout
                onPress={() => navigation.navigate(DETAIL, {item: marker})}>
                <MyCustomCallOut
                  title={marker.title}
                  description={marker.description}
                  rating={marker.rating}
                />
              </Callout>
            </Marker>
          ))} */}

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

export default CoordinateSelect;

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
