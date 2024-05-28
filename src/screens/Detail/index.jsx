import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/UI/customButton';
import firestore from '@react-native-firebase/firestore';

const Detail = ({route}) => {
  const {item} = route?.params;
  console.log(item);
  const [loading, setLoading] = useState(false);

  const addFavourite = () => {
    setLoading(true);
    //console.log('detail item', item);
    firestore()
      .collection('Favourites')
      .doc(item.id)
      .set(item)
      .then(() => {
        Alert.alert('Congrats..', 'Note succesfuly added to your favourites');
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white', padding: 10}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 20,
          borderBottomWidth: 0.3,
          borderBottomColor: 'gray',
        }}>
        <Text style={{fontSize: 18, fontWeight: '800'}}>Title:</Text>
        <Text style={{fontSize: 18}}>{item.title}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 20,
          borderBottomWidth: 0.3,
          borderBottomColor: 'gray',
        }}>
        <Text style={{fontSize: 18, fontWeight: '800'}}>Description:</Text>
        <Text style={{fontSize: 18}}>{item.description}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 20,
          borderBottomWidth: 0.3,
          borderBottomColor: 'gray',
        }}>
        <Text style={{fontSize: 18, fontWeight: '800'}}>Rating:</Text>
        <Text style={{fontSize: 18}}>{item.rate}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 20,
          borderBottomWidth: 0.3,
          borderBottomColor: 'gray',
        }}>
        <Text style={{fontSize: 18, fontWeight: '800'}}>Latitude:</Text>
        <Text style={{fontSize: 18}}>{item?.coordinate?.latitude}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 20,
          borderBottomWidth: 0.3,
          borderBottomColor: 'gray',
        }}>
        <Text style={{fontSize: 18, fontWeight: '800'}}>Longitude:</Text>
        <Text style={{fontSize: 18}}>{item?.coordinate?.longitude}</Text>
      </View>
      <View style={{marginVertical: 20}}>
        <CustomButton
          onPress={() => addFavourite()}
          loading={loading}
          title={'Add Favourite'}
        />
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({});
