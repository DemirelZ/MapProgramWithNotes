import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {height} from '../../utils/constants';

const CustomButton = props => {
  const {title, loading, customStyle} = props;
  return (
    <TouchableOpacity
      disabled={loading}
      {...props}
      style={[
        styles.button,
        loading ? styles.inactive : styles.active,
        customStyle,
      ]}>
      {loading ? (
        <ActivityIndicator size={'small'} color={'White'} />
      ) : (
        <Text style={{color: 'white', fontSize: 20}}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    padding: height * 0.02,
    borderRadius: 10,
    marginVertical: 5,
  },
  active: {
    backgroundColor: '#0096c7',
  },
  inactive: {
    backgroundColor: 'gray',
  },
});
