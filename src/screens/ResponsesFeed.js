import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import * as SecureStore from 'expo-secure-store';

import { getPendingReviews } from '../utility/firebaseUtility';
import StarComponents from '../components/StarComponents';

const PendingReviewsFeed = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync('user')
      .then((user) => setUserData(JSON.parse(user)))
      .catch((err) => console.warn(err));
  }, []);
  useEffect(() => {
    setIsLoading(true);
    if (userData)
      return getPendingReviews({
        userUid: userData.userUid,
        setIsLoading,
        setPendingReviews,
      });
    return () => {};
  }, [userData]);
  const renderItem = ({ item }) => (
    <ResponseWrapper
      onPress={() =>
        navigation.navigate('ReplyScreen', {
          score: item.score,
          comment: item.comment,
          restaurantId: item.restaurantId,
          restaurantName: item.restaurantName,
          reviewId: item.reviewId,
          userName: item.userName,
        })
      }
    >
      <ResponseHeader>
        <StarComponents reviewRating={item.score} disabled size={20} />
        <ResponseUser>{item.userName}</ResponseUser>
      </ResponseHeader>
      <ResponseRestaurant>{item.restaurantName}</ResponseRestaurant>
      <ResponseBody>{item.comment}</ResponseBody>
    </ResponseWrapper>
  );
  return (
    <PendingReviewsContainer>
      {userData && !isLoading ? (
        <FlatList
          data={pendingReviews}
          renderItem={renderItem}
          keyExtractor={(item) => item.reviewId}
        />
      ) : (
        <ActivityIndicator />
      )}
    </PendingReviewsContainer>
  );
};

const PendingReviewsContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  justify-content: center;
`;

const ResponseWrapper = styled.TouchableOpacity`
  width: 100%;
  margin: 20px 0px;
  border: 1px solid black;
`;
const ResponseHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;
const ResponseBody = styled.Text`
  padding: 10px 20px;
  font-size: 14px;
`;
const ResponseUser = styled.Text`
  color: black;
  font-size: 14px;
  font-weight: 800;
`;
const ResponseRestaurant = styled.Text`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
`;

export default PendingReviewsFeed;
