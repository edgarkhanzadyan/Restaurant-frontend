import React from 'react';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import RestaurantImage from './RestaurantImage';
import { USER_ROLE } from '../constants';
import { deleteRestaurantAlert } from '../utility/userInteractionUtility';
import { Restaurant, User } from '../types';

type Props = {
  restaurant: Restaurant;
  navigate: () => unknown;
  userData: User;
  onDelete: () => unknown;
};

const RestaurantCardComponent = ({
  restaurant,
  navigate,
  userData,
  onDelete,
}: Props) => (
  <RestaurantWrapper onPress={navigate}>
    <RestaurantHeader>
      <RestaurantTitle>{restaurant.name}</RestaurantTitle>
      {(userData.role === USER_ROLE.ADMIN ||
        userData.role === USER_ROLE.RESTAURANT_OWNER) && (
        <DeleteButton
          onPress={() =>
            deleteRestaurantAlert({
              restaurantName: restaurant.name,
              onDelete,
            })
          }
        >
          <FontAwesome name="remove" size={28} color="red" />
        </DeleteButton>
      )}
    </RestaurantHeader>
    {restaurant.score && (
      <RestaurantScore>
        Average rating: {restaurant.score.toFixed(2)}
      </RestaurantScore>
    )}
    <RestaurantDescription>
      {restaurant.description.length < 140
        ? restaurant.description
        : `${restaurant.description.substring(140)}...`}
    </RestaurantDescription>
    <RestaurantImage
      source={{
        uri: restaurant.image,
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
