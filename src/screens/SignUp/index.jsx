import {Text, SafeAreaView, View, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../../components/UI/customButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from '../../Assets';
import {height, width} from '../../utils/constants';
import {screenStyles} from '../../styles/screenStyles';
import auth from '@react-native-firebase/auth';

import CustomInput from '../../components/UI/customInput';
import {Bag, Key, Sms, User} from 'iconsax-react-native';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [job, setJob] = useState('');

  const saveUsers = UserId => {
    const form = {
      id: UserId,
      name: name,
      surname: surname,
      email: email,
      job: job,
    };

    firestore()
      .collection('Users')
      .doc(UserId)
      .set(form)
      .then(() => {
        console.log('user added');
      })
      .catch(err => console.log(err));
  };

  const setUserUid = async id => {
    try {
      await AsyncStorage.setItem('uid', id);
    } catch (e) {
      // saving error
    }
  };

  const handleSignUp = () => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('User account created & signed in!');
        console.log(res.user.uid);
        saveUsers(res.user.uid);
        setUserUid(res.user.uid);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={screenStyles.container}>
      <ScrollView>
        <View
          style={{
            flex: 4,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={login}
            style={{
              width: width,
              height: height * 0.4,
              resizeMode: 'cover',
            }}
          />
        </View>
        <View
          style={{
            flex: 0.5,
            padding: 10,
          }}>
          <Text style={{fontSize: 32, fontWeight: 'bold', textAlign: 'center'}}>
            SIGN UP
          </Text>
        </View>
        <View
          style={{
            padding: 10,
          }}>
          <CustomInput
            value={name}
            onChangeText={text => setName(text)}
            inputTitle={'Name'}
            placeholder={'Name'}
            icon={<User size={24} color="black" variant="Bold" />}
          />
          <CustomInput
            value={surname}
            onChangeText={text => setSurname(text)}
            inputTitle={'Surname'}
            placeholder={'Surname'}
            icon={<User size={24} color="black" variant="Bold" />}
          />
          <CustomInput
            value={email}
            onChangeText={text => setEmail(text)}
            inputTitle={'E-mail'}
            placeholder={'e-mail'}
            icon={<Sms size={24} color="black" variant="Bold" />}
          />

          <CustomInput
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            inputTitle={'Password'}
            placeholder={'password'}
            icon={<Key size={24} color="black" variant="Bold" />}
          />
          <CustomInput
            value={job}
            onChangeText={text => setJob(text)}
            inputTitle={'Job'}
            placeholder={'Job'}
            icon={<Bag size={24} color="black" variant="Bold" />}
          />
        </View>
        <View
          style={{
            flex: 2,
            padding: 10,
          }}>
          <CustomButton
            loading={loading}
            onPress={() => handleSignUp()}
            title={'Sign Up'}
            customStyle={{backgroundColor: '#514fb5', borderRadius: 100}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
