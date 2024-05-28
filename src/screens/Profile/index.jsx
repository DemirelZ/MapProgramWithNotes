import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {screenStyles} from '../../styles/screenStyles';
import CustomButton from '../../components/UI/customButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Avatar from '../../components/UI/Avatar';
import {UPDATEPROFILE} from '../../utils/routes';

const ProfileScreen = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const getUserUid = async () => {
    try {
      const uid = await AsyncStorage.getItem('uid');
      if (uid !== null) {
        //console.log('profilden gelen', value);
        getUserInfo(uid);
      }
    } catch (e) {
      // error reading value
    }
  };

  const getUserInfo = uid => {
    const subscriber = firestore()
      .collection('Users')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        //console.log('User data: ', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  };

  const removeUserUid = async () => {
    try {
      await AsyncStorage.removeItem('uid');
    } catch (e) {
      // remove error
    }

    console.log('Done.');
  };

  useEffect(() => {
    getUserUid();
  }, []);

  return (
    <View style={screenStyles.container}>
      <Avatar select={true} userData={userData} />
      <View style={{flex: 1, alignSelf: 'center'}}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 30}}>
          {`${userData?.name} ${userData?.surname}`}
        </Text>
        <Text style={{textAlign: 'center', fontWeight: '700', fontSize: 26}}>
          {userData?.email}
        </Text>
        <Text style={{textAlign: 'center', fontWeight: '500', fontSize: 24}}>
          {userData?.job}
        </Text>
      </View>
      <CustomButton
        onPress={() => {
          navigation.navigate(UPDATEPROFILE, {user: userData});
        }}
        customStyle={{backgroundColor: '#37d67a'}}
        title="Edit User"
      />
      <CustomButton
        onPress={() => {
          auth()
            .signOut()
            .then(() => console.log('User signed out!'), removeUserUid());
        }}
        title="Sign Out"
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
