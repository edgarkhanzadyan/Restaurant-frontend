import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { AppState } from 'react-native';

import { userStateListener } from '../utility/firebaseUtility';

import AdminTabNavigator from './AdminTabNavigator';
import RestaurantOwnerTabNavigator from './RestaurantOwnerTabNavigator';
import { navigationRef, isReadyRef } from './RootNavigation';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import RestaurantFeed from '../screens/RestaurantFeed';
import UserScreen from '../screens/UserScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import SplashScreen from '../screens/SplashScreen';
import AddRestaurantScreen from '../screens/AddRestaurantScreen';
import ReplyScreen from '../screens/ReplyScreen';

import { USER_ROLE } from '../constants';

import { RootStackParamList } from './types';

export default function Navigation() {
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        // @ts-ignore
        isReadyRef.current = true;
      }}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

type UserData =
  | {
      role: string;
    }
  | undefined;

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const [userData, setUserData] = useState<UserData>(undefined);
  const [appState, setAppState] = useState('active');
  useEffect(() => {
    userStateListener({ setUserLoggedIn, setUserData });
  }, [userLoggedIn, appState]);
  // useEffect(
  //   () =>
  //     userLoggedIn
  //       ? userStateListenerDatabase({ setUserLoggedIn, setUserData })
  //       : () => {},
  //   [userLoggedIn, appState]
  // );
  // useEffect(
  //   () => () => {
  //     // @ts-ignore
  //     isReadyRef.current = false;
  //   },
  //   []
  // );
  useEffect(() => {
    AppState.addEventListener('change', (nextAppState) =>
      setAppState(nextAppState)
    );
  });
  // useEffect(() => {
  //   SecureStore.getItemAsync('user')
  //     .then((user) => user && setUserData(JSON.parse(user)))
  //     .catch((err) => console.warn(err));
  // }, []);
  if (userLoggedIn === null || userData === undefined) return <SplashScreen />;

  const initialRoute = (): keyof RootStackParamList => {
    if (userLoggedIn && userData) {
      switch (userData.role) {
        case USER_ROLE.ADMIN:
          return 'AdminScreen';
        case USER_ROLE.RESTAURANT_OWNER:
          return 'RestaurantOwnerScreen';
        case USER_ROLE.REGULAR:
          return 'RestaurantFeed';
      }
    }
    return 'LoginScreen';
  };

  return (
    <Stack.Navigator initialRouteName={initialRoute()}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminScreen"
        component={AdminTabNavigator}
        options={{ title: 'Admin Screen' }}
      />
      <Stack.Screen
        name="RestaurantOwnerScreen"
        component={RestaurantOwnerTabNavigator}
        options={{ title: 'Restaurant Owner Screen' }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RestaurantFeed"
        component={RestaurantFeed}
        options={{ title: 'Regular User Screen' }}
      />
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{ title: 'User' }}
      />
      <Stack.Screen
        name="AddRestaurantScreen"
        component={AddRestaurantScreen}
        options={{ title: 'Add Restaurant' }}
      />
      <Stack.Screen name="ReplyScreen" component={ReplyScreen} />
      <Stack.Screen
        name="RestaurantScreen"
        component={RestaurantScreen}
        options={{ title: 'Restaurant' }}
      />
    </Stack.Navigator>
  );
}
