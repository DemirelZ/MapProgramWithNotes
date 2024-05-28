import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import CustomInput from '../../components/UI/customInput';
import {Calendar, NoteAdd, NoteText} from 'iconsax-react-native';
import {screenStyles} from '../../styles/screenStyles';
import CustomButton from '../../components/UI/customButton';
import {useNavigation} from '@react-navigation/native';
import {NOTES} from '../../utils/routes';
import moment from 'moment';

const AddNote = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  const saveNote = () => {
    setLoading(true);
    const form = {
      title: title,
      description: description,
      date: moment().format('LLLL'),
    };

    firestore()
      .collection('Notes')
      .add(form)
      .then(() => {
        Alert.alert('Congrats..', 'Note added succesfuly', [
          {text: 'OK', onPress: () => navigation.navigate(NOTES)},
        ]);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  //!todo date yapılacak
  return (
    <View style={screenStyles.container}>
      <View style={{flex: 1}}>
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
          customStyle={{
            minHeight: 300,

            textAlign: 'left',
          }}
        />

        {/* <CustomInput
        onChangeText={text => setDate(text)}
        value={date}
        inputTitle={'Date'}
        icon={<Calendar size={24} color="#b2b2b2" />}
        placeholder="Date"
      /> */}
        <CustomButton
          loading={loading}
          onPress={() => saveNote()}
          title={'ADD NOTE'}
        />
      </View>
    </View>
  );
};

export default AddNote;

const styles = StyleSheet.create({});
