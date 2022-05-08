import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import type { User } from '../../types';
// import { getUsers } from '../../utility/firebaseUtility';
import UserCardComponent from '../../components/UserCardComponent';
import { deleteUser, getAllUsers } from '../../utility/requests';
import { getUser } from '../../utility/secureStore';

import { RootStackParamList } from '../../navigation/types';

const ListHeader = ({ navigate }: { navigate: () => unknown }) => (
  <UserAddButton onPress={navigate}>
    <UserAddButtonTitle>Add user</UserAddButtonTitle>
    <FontAwesome name="plus-circle" size={40} color="green" />
  </UserAddButton>
);

type UserFeedProps = StackScreenProps<RootStackParamList, 'UserFeed'>;

const UserFeed = ({ navigation }: UserFeedProps) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = () => {
    getAllUsers().then((allUsers) => {
      setUsers(allUsers);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        setUserData(user);
      }
    });
  }, []);
  useEffect(() => {
    setIsLoading(true);
    if (userData) refresh();
    // return getAllUsers({
    //   setUsers,
    //   setIsLoading,
    //   selfUserUid: userData.userUid,
    // });
  }, [userData]);
  const renderItem = ({ item }: { item: User }) => (
    <UserCardComponent
      item={item}
      navigate={() => navigation.navigate('UserScreen', { userId: item._id })}
      onDelete={() =>
        deleteUser({ userId: item._id })
          .then(() => {
            refresh();
          })
          .catch((e) => console.error(e))
      }
    />
  );
  return (
    <UserFeedContainer>
      {userData && !isLoading ? (
        <FlatList<User>
          ListHeaderComponent={
            <ListHeader
              navigate={() =>
                navigation.navigate('SignUpScreen', {
                  isCreatorAdmin: true,
                })
              }
            />
          }
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <ActivityIndicator />
      )}
    </UserFeedContainer>
  );
};

const UserAddButton = styled.TouchableOpacity`
  height: 100px;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
`;

const UserAddButtonTitle = styled.Text`
  font-size: 24px;
  padding-bottom: 5px;
`;

const UserFeedContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  justify-content: center;
`;

export default UserFeed;
