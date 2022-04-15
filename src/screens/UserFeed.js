import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import * as SecureStore from 'expo-secure-store';
import { FontAwesome } from '@expo/vector-icons';

import { getUsers } from '../utility/firebaseUtility';
import UserCardComponent from '../components/UserCardComponent';

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
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync('user')
      .then((user) => setUserData(JSON.parse(user)))
      .catch((err) => console.warn(err));
  }, []);
  useEffect(() => {
    setIsLoading(true);
    if (userData)
      return getUsers({
        setUsers,
        setIsLoading,
        selfUserUid: userData.userUid,
      });
    return () => {};
  }, [userData]);
  const renderItem = ({ item }) => (
    <UserCardComponent item={item} navigation={navigation} />
  );
  return (
    <UserFeedContainer>
      {userData && !isLoading ? (
        <FlatList
          ListHeaderComponent={<ListHeader navigation={navigation} />}
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
