import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ArrowCircleRight, Star, Star1} from 'iconsax-react-native';

const MyCustomCallOut = ({title, description, rating}) => {
  return (
    <View style={{width: 200, height: 100, padding: 5}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{title}</Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Star1 size={20} color="orange" variant="Bold" />
          <Text>{rating}</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 16, color: '#808080'}}>{description}</Text>
      </View>
      <ArrowCircleRight
        style={{alignSelf: 'flex-end'}}
        color="green"
        size={34}
        variant="Bold"
      />
    </View>
  );
};

export default MyCustomCallOut;

const styles = StyleSheet.create({});
