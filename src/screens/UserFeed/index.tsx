import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import * as SecureStore from 'expo-secure-store';
import { FontAwesome } from '@expo/vector-icons';
import type { User } from '../../types';

// import { getUsers } from '../../utility/firebaseUtility';
import UserCardComponent from '../../components/UserCardComponent';
import { deleteUser, getAllUsers } from '../../utility/requests';
import { getUser } from '../../utility/secureStore';

const ListHeader = ({ navigation }) => (
  <UserAddButton
    onPress={() =>
      navigation.navigate('SignUpScreen', { isCreatorAdmin: true })
    }
  >
    <UserAddButtonTitle>Add user</UserAddButtonTitle>
    <FontAwesome name="plus-circle" size={40} color="green" />
  </UserAddButton>
);

const UserFeed = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = () => {
    getAllUsers().then((allUsers) => {
      console.log(allUsers);
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
      navigation={navigation}
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
          ListHeaderComponent={<ListHeader navigation={navigation} />}
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
