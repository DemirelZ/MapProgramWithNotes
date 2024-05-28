import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ADDLOCATION,
  ADDNOTE,
  COORDINATESELECT,
  DETAIL,
  HOME,
  LAUNCH,
  NOTES,
  SIGNIN,
  SIGNUP,
  TAB,
  UPDATENOTE,
  UPDATEPROFILE,
} from '../utils/routes';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import NotesScreen from '../screens/Notes';
import AddNote from '../screens/Notes/addNote';
import UpdateNote from '../screens/Notes/updateNote';
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';
import LaunchScreen from '../screens/Launch';
import {LogoutCurve} from 'iconsax-react-native';
import TabNavigator from './tabNavigator';
import CoordinateSelect from '../screens/Home/coordinateSelect';
import AddLocation from '../screens/Home/addLocation';
import UpdateProfile from '../screens/Profile/updateProfile';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Group>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name={LAUNCH}
            component={LaunchScreen}
          />
          <Stack.Screen
            options={{
              headerBackTitle: 'Back',
            }}
            name={SIGNIN}
            component={SignInScreen}
          />
          <Stack.Screen
            options={{
              headerBackTitle: 'Back',
            }}
            name={SIGNUP}
            component={SignUpScreen}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name={TAB}
            component={TabNavigator}
          />
          <Stack.Screen
            options={{
              headerBackTitle: 'Back',
            }}
            name={ADDNOTE}
            component={AddNote}
          />
          <Stack.Screen
            options={{
              headerBackTitle: 'Back',
            }}
            name={UPDATENOTE}
            component={UpdateNote}
          />
          <Stack.Screen
            options={{
              headerBackTitle: 'Back',
            }}
            name={DETAIL}
            component={Detail}
          />
          <Stack.Screen
            options={{headerBackTitle: 'Back'}}
            name={COORDINATESELECT}
            component={CoordinateSelect}
          />
          <Stack.Screen
            options={{
              headerBackTitle: 'Back',
            }}
            name={ADDLOCATION}
            component={AddLocation}
          />
          <Stack.Screen
            options={{
              headerBackTitle: 'Back',
            }}
            name={UPDATEPROFILE}
            component={UpdateProfile}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
