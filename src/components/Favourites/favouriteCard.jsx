import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {Trash} from 'iconsax-react-native';
import {height} from '../../utils/constants';
import {cardsColor} from '../../utils/functions';
import {useNavigation} from '@react-navigation/native';

const FavouriteCard = ({note, index, onDelete}) => {
  //console.log(note);
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: cardsColor(index),
        marginVertical: 8,
        borderRadius: 10,
        padding: 10,
      }}>
      <View style={{minHeight: height * 0.15}}>
        <Text style={{fontWeight: 'bold', fontSize: 24}}>{note.title}</Text>
        <Text style={{fontWeight: '200', fontSize: 20, marginVertical: 8}}>
          {note.description}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 17}}>{note.date}</Text>
        <View style={{flexDirection: 'row', gap: 14}}>
          <TouchableOpacity
            onPress={() => onDelete(note.id)}
            style={{
              backgroundColor: 'black',
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}>
            <Trash color="white" size={26} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FavouriteCard;

const styles = StyleSheet.create({});
