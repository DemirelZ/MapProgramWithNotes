import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FAVOURITES, HOME, NOTES, PROFILE} from '../../utils/routes';
import {Heart, Map, NoteAdd, Profile} from 'iconsax-react-native';

const TabIcon = ({name, size, color, focused}) => {
  size = 38;
  if (name === HOME) {
    return <Map size={focused ? size : '25'} color={color} variant="Bold" />;
  } else if (name === NOTES) {
    return (
      <NoteAdd size={focused ? size : '25'} color={color} variant="Bold" />
    );
  } else if (name === FAVOURITES) {
    return <Heart size={focused ? size : '25'} color={color} variant="Bold" />;
  } else if (name === PROFILE) {
    return (
      <Profile size={focused ? size : '25'} color={color} variant="Bold" />
    );
  }
};

export default TabIcon;

const styles = StyleSheet.create({});
