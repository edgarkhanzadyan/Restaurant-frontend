import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';

import StarComponents from '../../components/StarComponents';
import { RootStackParamList } from '../../navigation/types';
import { User, Review } from '../../types';
import { getUser } from '../../utility/secureStore';

const PendingReviewsFeed = ({
  navigation,
}: StackScreenProps<RootStackParamList, 'ResponsesFeed'>) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUser().then((user) => setUserData(user));
  }, []);
  useEffect(() => {
    setIsLoading(true);
    setPendingReviews([]);
    setIsLoading(false);
  });
  // useEffect(() => {
  //   setIsLoading(true);
  //   if (userData)
  //     return getPendingReviews({
  //       userUid: userData.userUid,
  //       setIsLoading,
  //       setPendingReviews,
  //     });
  //   return () => {};
  // }, [userData]);
  const renderItem = ({ item }: { item: Review }) => (
    <ResponseWrapper
      onPress={() =>
        navigation.navigate('ReplyScreen', {
          score: item.score,
          comment: item.comment,
          restaurantId: item.restaurant,
          restaurantName: item.restaurant,
          reviewId: item.reviewer,
          userName: item.reviewer,
        })
      }
    >
      <ResponseHeader>
        <StarComponents reviewRating={item.score} disabled size={20} />
        <ResponseUser>{item.reviewer}</ResponseUser>
      </ResponseHeader>
      <ResponseRestaurant>{item.restaurant}</ResponseRestaurant>
      <ResponseBody>{item.comment}</ResponseBody>
    </ResponseWrapper>
  );
  return (
    <PendingReviewsContainer>
      {userData && !isLoading ? (
        <FlatList<Review>
          data={pendingReviews}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
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
