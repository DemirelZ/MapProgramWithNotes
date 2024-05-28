import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {height, width} from '../../utils/constants';
import CustomInput from '../UI/customInput';
import {SearchNormal} from 'iconsax-react-native';
import {IndexPath, Select, SelectItem} from '@ui-kitten/components';

const Header = ({onSearch, onSortChange}) => {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

  const handleSelect = index => {
    setSelectedIndex(index);
    onSortChange(index.row);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
        }}>
        <CustomInput
          onChangeText={onSearch}
          icon={<SearchNormal size={24} color="#b2b2b2" />}
          placeholder="Search"
        />
      </View>
      <Text
        style={{
          fontSize: 35,
          fontWeight: '600',
          flex: 0.5,
        }}>
        NOTES
      </Text>
      <View
        style={{
          flex: 0.5,
          justifyContent: 'center',
          width: width * 0.61,
          alignSelf: 'flex-end',
        }}>
        <Select
          selectedIndex={selectedIndex}
          onSelect={handleSelect}
          placeholder={'seçiniz'}
          value={
            [
              'Sort Types',
              'Sort A to Z',
              'Sort Z to A',
              'Sort by date (newest first)',
              'Sort by date (oldest first)',
            ][selectedIndex.row]
          }>
          <SelectItem disabled={true} title="Sort Types" />
          <SelectItem title="Sort A to Z" />
          <SelectItem title="Sort Z to A" />
          <SelectItem title="Sort by date (newest first)" />
          <SelectItem title="Sort by date (oldest first)" />
        </Select>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: height * 0.25,
    width: '100%',
    paddingTop: height * 0.01,
    paddingBottom: height * 0.01,
  },
});
