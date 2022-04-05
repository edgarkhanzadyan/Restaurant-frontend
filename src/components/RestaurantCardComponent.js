import React from 'react';
import styled from 'styled-components';
import { FontAwesome } from '@expo/vector-icons';
import RestaurantImage from './RestaurantImage';
import { USER_ROLE } from '../../constants';
import { deleteRestaurantAlert } from '../utility/userInteractionUtility';

const RestaurantCardComponent = ({ item, navigation, userData }) => (
  <RestaurantWrapper
    onPress={() =>
      navigation.navigate('RestaurantScreen', {
        restaurantId: item.id,
        userData,
      })
    }
  >
    <RestaurantHeader>
      <RestaurantTitle>{item.name}</RestaurantTitle>
      {(userData.role === USER_ROLE.ADMIN ||
        userData.role === USER_ROLE.RESTAURANT_OWNER) && (
        <DeleteButton
          onPress={() =>
            deleteRestaurantAlert({
              restaurantName: item.name,
              restaurantId: item.id,
            })
          }
        >
          <FontAwesome name="remove" size={28} color="red" />
        </DeleteButton>
      )}
    </RestaurantHeader>
    {item.averageScore && (
      <RestaurantScore>
        Average rating: {item.averageScore.toFixed(2)}
      </RestaurantScore>
    )}
    <RestaurantDescription>
      {item.description.length < 140
        ? item.description
        : `${item.description.substring(140)}...`}
    </RestaurantDescription>
    <RestaurantImage
      source={{
        uri: item.image,
      }}
    />
  </RestaurantWrapper>
);

export default React.memo(RestaurantCardComponent);

const RestaurantWrapper = styled.TouchableOpacity`
  width: 100%;
  margin: 20px 0px;
`;

const RestaurantHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;
const RestaurantTitle = styled.Text`
  color: black;
  font-size: 18px;
  font-weight: 800;
`;

const RestaurantDescription = styled.Text`
  color: black;
  font-size: 16px;
  font-weight: 600;
  padding: 0px 20px;
  padding-bottom: 10px;
`;

const RestaurantScore = styled.Text`
  color: black;
  font-size: 16px;
  font-weight: 600;
  padding: 0px 20px;
  padding-bottom: 10px;
`;

const DeleteButton = styled.TouchableOpacity``;
