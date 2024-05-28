import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/UI/customButton';
import {hello, login} from '../../Assets';
import {height, width} from '../../utils/constants';
import {screenStyles} from '../../styles/screenStyles';
import auth from '@react-native-firebase/auth';
import {NOTES, SIGNIN, SIGNUP} from '../../utils/routes';
import CustomInput from '../../components/UI/customInput';
import {useNavigation} from '@react-navigation/native';
import {Key, User} from 'iconsax-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  //!todo signInWithPopup

  const setUserUid = async id => {
    try {
      await AsyncStorage.setItem('uid', id);
    } catch (e) {
      // saving error
    }
  };

  const handleSignIn = () => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        console.log('User account created & signed in!');
        setUserUid(data.user.uid);
        //console.log(data.user.metadata);
        //navigation.navigate(NOTES);
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
          SIGN IN
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          padding: 10,
        }}>
        <CustomInput
          value={email}
          onChangeText={text => setEmail(text)}
          inputTitle={'E-mail'}
          placeholder={'e-mail'}
          icon={<User size={24} color="black" variant="Bold" />}
        />
        <CustomInput
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
          inputTitle={'Password'}
          placeholder={'password'}
          icon={<Key size={24} color="black" variant="Bold" />}
        />
      </View>
      <View
        style={{
          flex: 2,
          padding: 10,
        }}>
        <CustomButton
          loading={loading}
          onPress={() => handleSignIn()}
          title={'Sign In'}
          customStyle={{backgroundColor: '#514fb5', borderRadius: 100}}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
