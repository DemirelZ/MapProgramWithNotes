import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CustomButton from '../../components/UI/customButton';
import {hello} from '../../Assets';
import {height, width} from '../../utils/constants';
import {screenStyles} from '../../styles/screenStyles';
import {Facebook, Google, Instagram} from 'iconsax-react-native';
import {SIGNIN, SIGNUP} from '../../utils/routes';

const LaunchScreen = ({navigation}) => {
  return (
    <SafeAreaView style={screenStyles.container}>
      <View
        style={{
          flex: 4,

          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={hello}
          style={{
            width: width,
            height: height * 0.4,
            resizeMode: 'cover',
          }}
        />
      </View>
      <View
        style={{
          flex: 2,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          gap: 10,
        }}>
        <Text style={{fontSize: 32, fontWeight: 'bold'}}>HELLO</Text>
        <Text style={{fontSize: 22, textAlign: 'center', letterSpacing: 4}}>
          Welcome to MapProgramwithNotes app where you can manage your map and
          notes
        </Text>
      </View>
      <View
        style={{
          flex: 3,
          padding: 10,
        }}>
        <CustomButton
          onPress={() => navigation.navigate(SIGNIN)}
          title={'Sign In'}
          customStyle={{backgroundColor: '#514fb5', borderRadius: 100}}
        />
        <CustomButton
          onPress={() => navigation.navigate(SIGNUP)}
          title={'Sign Up'}
          customStyle={{backgroundColor: '#514fb5', borderRadius: 100}}
        />
        <View
          style={{
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Sign Up Using</Text>
          <View style={{flexDirection: 'row', gap: 12, marginTop: 10}}>
            <TouchableOpacity>
              <Google size={24} color="black" variant="Bold" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Facebook size={24} color="black" variant="Bold" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LaunchScreen;

const styles = StyleSheet.create({});
