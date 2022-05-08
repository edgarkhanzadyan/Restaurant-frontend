import React, { useState, useEffect } from 'react';
import { FlatList, Button, ActivityIndicator, View } from 'react-native';
import styled from 'styled-components/native';

import { FontAwesome } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import RestaurantCardComponent from '../../components/RestaurantCardComponent';

import SettingsModal from '../../modals/SettingsModal';
import { USER_ROLE } from '../../constants';
import { RootStackParamList } from '../../navigation/types';
import { Restaurant, User, UserRole } from '../../types';
import { getUser } from '../../utility/secureStore';
import {
  deleteRestaurant,
  getRestaurants,
  getRestaurantsByOwner,
} from '../../utility/requests';

export type RestaurantFeedNavigate = StackScreenProps<
  RootStackParamList,
  'RestaurantFeed'
>['navigation']['navigate'];

type ListHeaderProps = {
  navigate: RestaurantFeedNavigate;
  role: UserRole;
};

const ListHeader = ({ navigate, role }: ListHeaderProps) => (
  <RestaurantAddButton
    onPress={() => navigate('AddRestaurantScreen', { role })}
  >
    <RestaurantAddButtonTitle>Add restaurant</RestaurantAddButtonTitle>
    <FontAwesome name="plus-circle" size={40} color="green" />
  </RestaurantAddButton>
);

type RestaurantFeedProps = StackScreenProps<
  RootStackParamList,
  'RestaurantFeed'
>;

const RestaurantFeed = ({ navigation }: RestaurantFeedProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = () => {
    setIsLoading(true);
    if (userData) {
      switch (userData.role) {
        case USER_ROLE.RESTAURANT_OWNER:
          getRestaurantsByOwner({
            limit: 5,
            skip: 0,
            ownerUserId: userData._id,
          }).then((restaurants) => {
            setRestaurantData(restaurants);
            setIsLoading(false);
          });
          break;
        case USER_ROLE.ADMIN:
        case USER_ROLE.REGULAR:
          getRestaurants({ limit: 5, skip: 0 })
            .then((restaurants) => {
              setRestaurantData(restaurants);
              setIsLoading(false);
            })
            .catch((e) => console.log(e));
          break;
        // return getRestaurantData({ setRestaurantData, setIsLoading });
        default:
          console.warn('Role does not exist');
      }
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setModalIsOpen(true)} title="Settings" />
      ),
    });
  }, [navigation]);
  useEffect(() => {
    getUser()
      .then(setUserData)
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    refresh();
  }, [userData]);

  if (!userData || isLoading) {
    return <ActivityIndicator />;
  }

  const renderItem = ({ item }: { item: Restaurant }) => (
    <RestaurantCardComponent
      restaurant={item}
      navigate={() =>
        navigation.navigate('RestaurantScreen', {
          userData,
          restaurantId: item._id,
        })
      }
      userData={userData}
      onDelete={() => {
        deleteRestaurant({ restaurantId: item._id }).then(() => {
          refresh();
        });
      }}
    />
  );

  return (
    <RestaurantFeedContainer>
      <FlatList<Restaurant>
        ListHeaderComponent={
          userData.role !== USER_ROLE.REGULAR ? (
            <ListHeader navigate={navigation.navigate} role={userData.role} />
          ) : (
            <View />
          )
        }
        data={restaurantData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        initialNumToRender={3}
      />
      <SettingsModal
        setModalIsOpen={setModalIsOpen}
        modalIsOpen={modalIsOpen}
        userId={userData._id}
      />
    </RestaurantFeedContainer>
  );
};

const RestaurantAddButton = styled.TouchableOpacity`
  height: 100px;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
`;

const RestaurantAddButtonTitle = styled.Text`
  font-size: 24px;
  padding-bottom: 5px;
`;

const RestaurantFeedContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  justify-content: center;
`;

export default RestaurantFeed;
