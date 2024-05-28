import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {Edit2, Trash} from 'iconsax-react-native';
import {height} from '../../utils/constants';
import {cardsColor} from '../../utils/functions';
import {useNavigation} from '@react-navigation/native';
import {UPDATENOTE} from '../../utils/routes';

const NoteCard = ({note, index}) => {
  const navigation = useNavigation();

  const deleteNote = () => {
    Alert.alert('Are you sure?', 'Your note will delete', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => firestore().collection('Notes').doc(note?.id).delete(),
      },
    ]);
  };
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
            onPress={() => navigation.navigate(UPDATENOTE, {note: note})}
            style={{
              backgroundColor: 'black',
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}>
            <Edit2 color="white" size={26} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteNote()}
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

export default NoteCard;

const styles = StyleSheet.create({});
