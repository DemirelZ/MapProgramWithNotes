import {Alert, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import CustomInput from '../../components/UI/customInput';
import {Calendar, NoteAdd, NoteText, Star1} from 'iconsax-react-native';
import {screenStyles} from '../../styles/screenStyles';
import CustomButton from '../../components/UI/customButton';
import {useNavigation} from '@react-navigation/native';
import {Datepicker, Text} from '@ui-kitten/components';

const AddLocation = ({route}) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rate, setRate] = useState('');

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const {location} = route?.params;

  const saveLocation = () => {
    setLoading(true);
    const form = {
      title: title,
      description: description,
      date: date,
      rate: rate,
      coordinate: location,
    };

    firestore()
      .collection('Locations')
      .add(form)
      .then(() => {
        Alert.alert('Congrats..', 'Location added succesfuly', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('location added')},
        ]);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));

    // navigation.navigate(HOME);
  };

  //!todo date yapılacak
  return (
    <View style={screenStyles.container}>
      <CustomInput
        onChangeText={text => setTitle(text)}
        value={title}
        inputTitle={'Title'}
        icon={<NoteAdd size={24} color="#b2b2b2" />}
        placeholder="Title"
      />
      <CustomInput
        onChangeText={text => setDescription(text)}
        value={description}
        inputTitle={'Description'}
        icon={<NoteText size={24} color="#b2b2b2" />}
        placeholder="Description"
      />
      <CustomInput
        onChangeText={text => setRate(text)}
        value={rate}
        inputTitle={'Description'}
        icon={<Star1 size={24} color="#b2b2b2" />}
        placeholder="Rate"
      />
      {/* <CustomInput
        onChangeText={text => setDate(text)}
        value={date}
        inputTitle={'Date'}
        icon={<Calendar size={24} color="#b2b2b2" />}
        placeholder="Date"
      /> */}
      <View style={{marginVertical: 10}}>
        <Text category="h7">{`Selected date: ${date.toLocaleDateString()}`}</Text>
        <Datepicker date={date} onSelect={nextDate => setDate(nextDate)} />
      </View>
      <CustomButton
        loading={loading}
        onPress={() => saveLocation()}
        title={'ADD LOCATION'}
      />
    </View>
  );
};

export default AddLocation;

const styles = StyleSheet.create({});
