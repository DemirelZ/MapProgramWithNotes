import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {SearchNormal} from 'iconsax-react-native';
import {height, width} from '../../utils/constants';

const CustomInput = props => {
  const {
    icon,
    customStyle,
    placeholder,
    inputTitle = null,
    secureTextEntry,
  } = props;
  return (
    <View
      style={{
        marginVertical: 5,

        //height: height * 0.08,
      }}>
      <Text>{inputTitle}</Text>
      <View style={styles.container}>
        {icon}
        <TextInput
          multiline
          {...props}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          style={[
            {
              height: height * 0.05,
              flex: 1,
              paddingHorizontal: 8,
              paddingVertical: 12,
              fontSize: 18,
            },
            customStyle,
          ]}
        />
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dddddd',
    paddingHorizontal: 5,
    borderRadius: 8,
    marginVertical: 3,
  },
});
