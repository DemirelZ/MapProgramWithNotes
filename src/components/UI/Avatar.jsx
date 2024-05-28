import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {User} from 'iconsax-react-native';
import {height, width} from '../../utils/constants';
import ImagePicker from 'react-native-image-crop-picker';

const Avatar = ({userData, onChangeImage, select}) => {
  const openGalery = () => {
    ImagePicker.openPicker({
      width: width * 0.4,
      height: width * 0.4,
      includeBase64: true,
      cropping: true,
    }).then(image => {
      onChangeImage(image.data, image.mime);
    });
  };
  return (
    <TouchableOpacity
      disabled={select}
      onPress={() => openGalery()}
      style={{
        alignSelf: 'center',
        marginVertical: height * 0.03,
      }}>
      {userData?.image ? (
        <View
          style={{
            width: width * 0.4,
            height: width * 0.4,
            borderRadius: 1000,
          }}>
          <Image
            style={{
              width: width * 0.4,
              height: width * 0.4,
              borderRadius: 1000,
            }}
            source={{uri: userData?.image}}
          />
        </View>
      ) : (
        <View
          style={{
            width: width * 0.35,
            height: width * 0.35,
            borderRadius: 1000,
            backgroundColor: '#b2b2b2',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <User color="white" size={50} variant="Bold" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Avatar;

const styles = StyleSheet.create({});
