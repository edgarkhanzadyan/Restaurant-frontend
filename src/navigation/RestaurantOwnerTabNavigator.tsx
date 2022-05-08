import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import RestaurantFeed from '../screens/RestaurantFeed';
import ResponsesFeed from '../screens/ResponsesFeed';

import SettingsModal from '../modals/SettingsModal';
import { User } from '../types';
import { getUser } from '../utility/secureStore';
import { OwnerTabScreenParamList, RootStackParamList } from './types';

const Tab = createBottomTabNavigator<OwnerTabScreenParamList>();

const RestaurantOwnerTabNavigator = ({
  navigation,
}: StackScreenProps<RootStackParamList, 'RestaurantOwnerScreen'>) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  useEffect(() => {
    getUser().then(setUserData);
  });
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setModalIsOpen(true)} title="Settings" />
      ),
    });
  }, [navigation]);

  if (!userData) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const getIconName = () => {
              switch (route.name) {
                case 'ResponsesFeed':
                  return focused ? 'chatbubbles-sharp' : 'chatbubbles-outline';
                case 'RestaurantFeed':
                  return focused ? 'restaurant' : 'restaurant-outline';
              }
            };

            return <Ionicons name={getIconName()} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="RestaurantFeed" component={RestaurantFeed} />
        <Tab.Screen name="ResponsesFeed" component={ResponsesFeed} />
      </Tab.Navigator>
      <SettingsModal
        setModalIsOpen={setModalIsOpen}
        modalIsOpen={modalIsOpen}
        userId={userData._id}
      />
    </>
  );
};

export default RestaurantOwnerTabNavigator;
