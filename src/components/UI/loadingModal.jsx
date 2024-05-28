import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const LoadingModal = ({visible}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
          <ActivityIndicator size={'large'} color={'gray'} />
          <Text style={{paddingTop: 20, fontSize: 24}}>Yükleniyor</Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({});
