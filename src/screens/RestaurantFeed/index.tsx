import React, { useState, useEffect } from 'react';
import { FlatList, Button, ActivityIndicator, View } from 'react-native';
import styled from 'styled-components/native';

import { FontAwesome } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import RestaurantCardComponent from '../../components/RestaurantCardComponent';

import {
  getRestaurantData,
  getRestaurantDataFilteredByOwner,
} from '../../utility/firebaseUtility';
import SettingsModal from '../../modals/SettingsModal';
import { USER_ROLE } from '../../constants';
import { RootStackParamList } from '../../navigation/types';
import { User, UserRole } from '../../types';
import { getUser } from '../../utility/secureStore';

type ListHeaderProps = StackScreenProps<
  RootStackParamList,
  'RestaurantFeed'
> & {
  role: UserRole;
};

const ListHeader = ({ navigation, role }: ListHeaderProps) => (
  <RestaurantAddButton
    onPress={() => navigation.navigate('AddRestaurantScreen', { role })}
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
  const [restaurantData, setRestaurantData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    if (userData) {
      switch (userData.role) {
        case USER_ROLE.RESTAURANT_OWNER:
          return;
        // return getRestaurantDataFilteredByOwner({
        //   setRestaurantData,
        //   setIsLoading,
        //   userUid: userData.userUid,
        // });
        case USER_ROLE.ADMIN:
        case USER_ROLE.REGULAR:
          return getRestaurantData({ setRestaurantData, setIsLoading });
        default:
          console.warn('Role does not exist');
      }
    }
    return () => {};
  }, [userData]);
  const renderItem = ({ item }) => (
    <RestaurantCardComponent
      item={item}
      navigation={navigation}
      userData={userData}
    />
  );
  return (
    <RestaurantFeedContainer>
      {userData && !isLoading ? (
        <FlatList
          ListHeaderComponent={
            userData.role !== USER_ROLE.REGULAR ? (
              <ListHeader navigation={navigation} role={userData.role} />
            ) : (
              <View />
            )
          }
          data={restaurantData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          initialNumToRender={3}
        />
      ) : (
        <ActivityIndicator />
      )}
      <SettingsModal
        setModalIsOpen={setModalIsOpen}
        modalIsOpen={modalIsOpen}
        userUid={userData && userData.userUid}
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
