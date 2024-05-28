import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const MyCustomMarker = () => {
  return (
    <View>
      <Image
        source={require('../../Assets/redMarker.png')}
        style={{width: 50, height: 50}}></Image>
    </View>
  );
};

export default MyCustomMarker;

const styles = StyleSheet.create({});
