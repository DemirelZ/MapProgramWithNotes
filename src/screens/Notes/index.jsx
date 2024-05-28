import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FloatActionButton from '../../components/UI/FloatActionButton';
import firestore from '@react-native-firebase/firestore';
import {Add} from 'iconsax-react-native';
import {width} from '../../utils/constants';
import NoteCard from '../../components/notes/noteCard';
import Header from '../../components/notes/header';
import {screenStyles} from '../../styles/screenStyles';
import {ADDNOTE} from '../../utils/routes';
import LoadingModal from '../../components/UI/loadingModal';

const NotesScreen = ({navigation}) => {
  const [modalLoading, setModalLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState(0);

  useEffect(() => {
    const collectionRef = firestore().collection('Notes');
    const unsubscribe = collectionRef.onSnapshot(snapshot => {
      const fetchedData = [];
      snapshot.forEach(doc => {
        fetchedData.push({id: doc.id, ...doc.data()});
      });
      setData(fetchedData);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Sıralama işlemini veriler geldiğinde veya sortType değiştiğinde gerçekleştir
    sortNotes(sortType, data);
  }, [sortType, data]);

  useEffect(() => {
    // Arama sorgusu değiştiğinde filtreleme yap
    const filtered = data.filter(note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    sortNotes(sortType, filtered);
  }, [searchQuery]);

  const searchNotes = query => {
    setSearchQuery(query);
  };

  const sortNotes = (type, notes) => {
    let sortedNotes = [...notes];
    switch (type) {
      case 1: // Sort A to Z
        sortedNotes.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 2: // Sort Z to A
        sortedNotes.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 3: // Sort by date (newest first)
        sortedNotes.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 4: // Sort by date (oldest first)
        sortedNotes.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      default:
        break;
    }
    setFilteredNotes(sortedNotes);
  };

  return (
    <View style={screenStyles.container}>
      {modalLoading ? (
        <LoadingModal visible={modalLoading} />
      ) : (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <Header onSearch={searchNotes} onSortChange={setSortType} />
            }
            data={filteredNotes}
            renderItem={({item, index}) => (
              <NoteCard note={item} index={index} />
            )}
            keyExtractor={item => item.id}
          />
        </>
      )}
      <FloatActionButton
        onPress={() => navigation.navigate(ADDNOTE)}
        icon={<Add size={50} color="white" />}
        customStyle={{
          backgroundColor: 'black',
          right: width * 0.04,
          bottom: width * 0.1,
        }}
      />
    </View>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({});
