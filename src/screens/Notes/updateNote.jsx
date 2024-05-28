import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import CustomInput from '../../components/UI/customInput';
import {Calendar, NoteAdd, NoteText} from 'iconsax-react-native';
import {screenStyles} from '../../styles/screenStyles';
import CustomButton from '../../components/UI/customButton';
import {useNavigation} from '@react-navigation/native';
import {NOTES} from '../../utils/routes';

const UpdateNote = ({route}) => {
  const {note} = route?.params;
  const navigation = useNavigation();
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [date, setDate] = useState(note.date);
  const [loading, setLoading] = useState(false);

  const updateNote = () => {
    setLoading(true);
    const form = {
      title: title,
      description: description,
      date: date,
    };

    firestore()
      .collection('Notes')
      .doc(note?.id)
      .update(form)
      .then(() => {
        Alert.alert('Congrats..', 'Note updated succesfuly', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'OK', onPress: () => navigation.navigate(NOTES)},
        ]);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
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
        onChangeText={text => setDate(text)}
        value={date}
        inputTitle={'Date'}
        icon={<Calendar size={24} color="#b2b2b2" />}
        placeholder="Date"
      />
      <CustomButton
        loading={loading}
        onPress={() => updateNote()}
        title={'UPDATE NOTE'}
      />
    </View>
  );
};

export default UpdateNote;

const styles = StyleSheet.create({});
