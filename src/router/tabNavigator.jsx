import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import {FAVOURITES, HOME, NOTES, PROFILE} from '../utils/routes';
import NotesScreen from '../screens/Notes';
import ProfileScreen from '../screens/Profile';
import {LogoutCurve} from 'iconsax-react-native';
import FavouritesScreen from '../screens/Favourites';
import TabIcon from '../components/router/tabIcon';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => (
          <TabIcon
            size={size}
            focused={focused}
            color={color}
            name={route.name}
            route={route}
          />
        ),
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name={HOME} component={Home} />
      <Tab.Screen
        options={{
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => handleSignOut()}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                padding: 3,
                borderRadius: 4,
                marginRight: 8,
              }}>
              <LogoutCurve size={26} color="black" variant="Bold" />
              <Text>Sign Out</Text>
            </TouchableOpacity>
          ),
        }}
        name={NOTES}
        component={NotesScreen}
      />
      <Tab.Screen name={FAVOURITES} component={FavouritesScreen} />
      <Tab.Screen name={PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
