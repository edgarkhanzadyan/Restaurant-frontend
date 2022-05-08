import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import RestaurantFeed from '../screens/RestaurantFeed';
import UserFeed from '../screens/UserFeed';

import SettingsModal from '../modals/SettingsModal';
import { AdminTabScreenParamList, RootStackParamList } from './types';
import { getUser } from '../utility/secureStore';
import { User } from '../types';

const Tab = createBottomTabNavigator<AdminTabScreenParamList>();

const AdminTabNavigator = ({
  navigation,
}: StackScreenProps<RootStackParamList, 'AdminScreen'>) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setModalIsOpen(true)} title="Settings" />
      ),
    });
  }, [navigation]);
  useEffect(() => {
    getUser().then(setUserData);
  }, []);

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
                case 'RestaurantFeed':
                  return focused ? 'restaurant' : 'restaurant-outline';
                case 'UserFeed':
                  return focused ? 'people-sharp' : 'people-outline';
              }
            };
            return <Ionicons name={getIconName()} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="RestaurantFeed" component={RestaurantFeed} />
        <Tab.Screen name="UserFeed" component={UserFeed} />
      </Tab.Navigator>
      <SettingsModal
        setModalIsOpen={setModalIsOpen}
        modalIsOpen={modalIsOpen}
        userId={userData._id}
      />
    </>
  );
};

export default AdminTabNavigator;
