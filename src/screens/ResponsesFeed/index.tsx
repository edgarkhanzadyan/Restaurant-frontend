import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';

import StarComponents from '../../components/StarComponents';
import { RootStackParamList } from '../../navigation/types';
import { User, Review } from '../../types';
import { getUser } from '../../utility/secureStore';
import { getUnrepliedReviews } from '../../utility/requests';

const PendingReviewsFeed = ({
  navigation,
}: StackScreenProps<RootStackParamList, 'ResponsesFeed'>) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [pendingReviews, setPendingReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUnreplied = async () => {
    setIsLoading(true);
    const response = await getUnrepliedReviews();
    setPendingReviews(response.reviews);
    setIsLoading(false);
    return response;
  };

  useEffect(() => {
    getUser().then((user) => setUserData(user));
  }, []);
  useEffect(() => {
    fetchUnreplied();
  }, []);
  const renderItem = ({ item }: { item: Review }) => (
    <ResponseWrapper
      onPress={() =>
        navigation.navigate('ReplyScreen', {
          score: item.score,
          comment: item.comment,
          restaurantName: item.restaurantId,
          reviewId: item.reviewer,
          userName: item.reviewer,
          onBack: fetchUnreplied,
        })
      }
    >
      <ResponseHeader>
        <StarComponents reviewRating={item.score} disabled size={20} />
        <ResponseUser>{item.reviewer}</ResponseUser>
      </ResponseHeader>
      <ResponseRestaurant>{item.restaurantId}</ResponseRestaurant>
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
