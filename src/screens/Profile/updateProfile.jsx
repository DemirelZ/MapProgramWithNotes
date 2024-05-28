import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../../components/UI/customButton';
import {hello, login} from '../../Assets';
import {height, width} from '../../utils/constants';
import {screenStyles} from '../../styles/screenStyles';
import auth from '@react-native-firebase/auth';
import {SIGNIN, SIGNUP} from '../../utils/routes';
import CustomInput from '../../components/UI/customInput';
import {Bag, Key, Sms, User} from 'iconsax-react-native';
import Avatar from '../../components/UI/Avatar';
import {cleanSingle} from 'react-native-image-crop-picker';

const UpdateProfile = ({route, navigation}) => {
  const {user} = route?.params;

  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.image);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [job, setJob] = useState(user.job);

  const updateUser = () => {
    setLoading(true);
    const form = {
      name: name,
      surname: surname,
      image: image,
      job: job,
    };

    firestore()
      .collection('Users')
      .doc(user.id)
      .update(form)
      .then(() => {
        Alert.alert('Updated successfully');
        navigation.goBack();
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={screenStyles.container}>
      <ScrollView>
        <Avatar
          userData={{image}}
          onChangeImage={(image, mimType) =>
            setImage(`data:${mimType};base64,${image}`)
          }
        />
        <View
          style={{
            padding: 10,
          }}>
          <CustomInput
            editable={false}
            value={email}
            onChangeText={text => setEmail(text)}
            inputTitle={'E-mail'}
            placeholder={'e-mail'}
            icon={<Sms size={24} color="black" variant="Bold" />}
          />
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
            onPress={() => updateUser()}
            title={'Update'}
            customStyle={{backgroundColor: '#514fb5', borderRadius: 100}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateProfile;
