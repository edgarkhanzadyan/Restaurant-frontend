import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

import RestaurantFeed from '../screens/RestaurantFeed';
import ResponsesFeed from '../screens/ResponsesFeed';

import SettingsModal from '../modals/SettingsModal';

const Tab = createBottomTabNavigator();

const RestaurantOwnerTabNavigator = ({ navigation }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setModalIsOpen(true)} title="Settings" />
      ),
    });
  }, [navigation]);
  useEffect(() => {
    SecureStore.getItemAsync('user')
      .then((user) => setUserData(JSON.parse(user)))
      .catch((err) => console.warn(err));
  }, []);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'ResponsesFeed') {
              iconName = focused ? 'chatbubbles-sharp' : 'chatbubbles-outline';
            } else if (route.name === 'RestaurantFeed') {
              iconName = focused ? 'restaurant' : 'restaurant-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="RestaurantFeed" component={RestaurantFeed} />
        <Tab.Screen name="ResponsesFeed" component={ResponsesFeed} />
      </Tab.Navigator>
      <SettingsModal
        setModalIsOpen={setModalIsOpen}
        modalIsOpen={modalIsOpen}
        userUid={userData && userData.userUid}
      />
    </>
  );
};

export default RestaurantOwnerTabNavigator;
