import React from 'react';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { deleteUserAlert } from '../utility/userInteractionUtility';

const RestaurantCardComponent = ({ item, navigation }) => (
  <UserWrapper
    onPress={() =>
      navigation.navigate('UserScreen', {
        userUid: item.id,
      })
    }
  >
    <UserHeader>
      <UserTitle>{item.name}</UserTitle>
      <DeleteButton
        onPress={() =>
          deleteUserAlert({ userName: item.name, userId: item.id })
        }
      >
        <FontAwesome name="remove" size={28} color="red" />
      </DeleteButton>
    </UserHeader>
  </UserWrapper>
);

export default React.memo(RestaurantCardComponent);

const UserWrapper = styled.TouchableOpacity`
  width: 100%;
  margin: 20px 0px;
  border: 1px solid black;
`;
const UserHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;
const UserTitle = styled.Text`
  color: black;
  font-size: 18px;
  font-weight: 800;
`;

const DeleteButton = styled.TouchableOpacity``;
