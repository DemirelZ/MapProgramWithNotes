import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {screenStyles} from '../../styles/screenStyles';
import FavouriteCard from '../../components/Favourites/favouriteCard';
import firestore from '@react-native-firebase/firestore';

const FavouritesScreen = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collectionRef = firestore().collection('Favourites');

    const unsubscribe = collectionRef.orderBy('title', 'asc').onSnapshot(
      snapshot => {
        const fetchedData = [];
        snapshot.forEach(doc => {
          const data = doc.data();

          // Convert Firestore Timestamps to JavaScript Date objects, then to ISO strings
          const convertedData = {};
          for (let key in data) {
            if (data[key] && data[key]._seconds !== undefined) {
              convertedData[key] = new Date(
                data[key]._seconds * 1000,
              ).toISOString();
            } else {
              convertedData[key] = data[key];
            }
          }

          fetchedData.push({id: doc.id, ...convertedData});
        });
        setFavourites(fetchedData);
        setLoading(false);
      },
      error => {
        console.error('Error fetching favourites: ', error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const deleteFavourite = async id => {
    try {
      await firestore().collection('Favourites').doc(id).delete();
      // Optionally, update the state to remove the deleted item from the list
      setFavourites(prevFavourites =>
        prevFavourites.filter(item => item.id !== id),
      );
    } catch (error) {
      console.error('Error deleting favourite: ', error);
    }
  };

  if (loading) {
    return (
      <View style={screenStyles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[screenStyles.container]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={favourites}
        renderItem={({item, index}) => (
          <FavouriteCard note={item} index={index} onDelete={deleteFavourite} />
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: 'center',
              fontSize: 30,
              fontWeight: '400',
              marginVertical: '50%',
            }}>
            No Favourites Found
          </Text>
        }
      />
    </View>
  );
};

export default FavouritesScreen;

const styles = StyleSheet.create({});
