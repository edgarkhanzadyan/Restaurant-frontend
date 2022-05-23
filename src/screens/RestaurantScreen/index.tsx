import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Button, View } from 'react-native';
import styled, { css } from 'styled-components/native';
import type { StackScreenProps } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';

import ReviewModal from '../../modals/ReviewModal';
import UploadImageComponent from '../../components/UploadImageComponent';
import ReviewComponent from '../../components/ReviewComponent';
import RestaurantImage from '../../components/RestaurantImage';
import { USER_ROLE } from '../../constants';
import { editInfoActionSheet } from '../../utility/userInteractionUtility';
import type { RootStackParamList } from '../../navigation/types';
import { getRestaurantById, updateRestaurant } from '../../utility/requests';
import { FullRestaurant } from '../../types';

const RestaurantScreen = ({
  navigation,
  route: {
    params: { userData, restaurantId },
  },
}: StackScreenProps<RootStackParamList, 'RestaurantScreen'>) => {
  const [restaurantInfo, setRestaurantInfo] = useState<FullRestaurant | null>(
    null
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState<string | null>(null);
  const [commentToEditText, setCommentToEditText] = useState<string>('');
  const [commentToReply, setCommentToReply] = useState<string | null>(null);

  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantDescription, setRestaurantDescription] = useState('');
  const [restaurantLocation, setRestaurantLocation] = useState('');
  const [imgB64, setImgB64] = useState('');

  const resetRestaurantInfo = () => {
    if (restaurantInfo) {
      setRestaurantName(restaurantInfo.name);
      setRestaurantDescription(restaurantInfo.description);
      setRestaurantLocation(restaurantInfo.location);
      setImgB64(restaurantInfo.image);
    }
  };

  useEffect(() => {
    getRestaurantById({ restaurantId }).then((restaurantData) =>
      setRestaurantInfo(restaurantData)
    );
  }, []);
  useEffect(() => {
    resetRestaurantInfo();
  }, [restaurantInfo]);

  useEffect(() => {
    const headerRight = () => {
      if (userData.role !== USER_ROLE.REGULAR) {
        if (isEditing) {
          return (
            <Button
              onPress={() => {
                editInfoActionSheet({
                  onEdit: () => {
                    updateRestaurant({
                      restaurantId,
                      name: restaurantName.trim(),
                      description: restaurantDescription.trim(),
                      location: restaurantLocation.trim(),
                      imgB64,
                    }).then(() => {
                      setIsEditing(false);
                    });
                  },
                  onCancel: () => {
                    setIsEditing(false);
                    resetRestaurantInfo();
                  },
                });
              }}
              title="Done"
            />
          );
        }
        return <Button onPress={() => setIsEditing(true)} title="Edit" />;
      }
      return <View />;
    };
    const headerLeft = () => (
      <HeaderBackButton
        onPress={() => {
          navigation.goBack();
        }}
      />
    );
    navigation.setOptions({
      headerRight,
      headerLeft,
    });
  });

  if (!restaurantInfo) return <ActivityIndicator />;

  const showLeaveReviewButton = () => {
    if (userData.role === USER_ROLE.RESTAURANT_OWNER) return false;
    if (
      userData.role === USER_ROLE.REGULAR &&
      restaurantInfo.reviews &&
      restaurantInfo.reviews.some((rev) => rev.reviewer === userData._id)
    )
      return false;
    return true;
  };
  const reviewComponents =
    restaurantInfo.reviews &&
    restaurantInfo.reviews.map((rev) => (
      <ReviewComponent
        reviewData={rev}
        userData={userData}
        commentToEdit={commentToEdit}
        setCommentToEdit={setCommentToEdit}
        commentToEditText={commentToEditText}
        setCommentToEditText={setCommentToEditText}
        commentToReply={commentToReply}
        setCommentToReply={setCommentToReply}
      />
    ));
  return (
    <RestaurantScreenContainer>
      <SafeAreaContainer>
        {isEditing ? (
          <>
            <RestaurantTitleEditable
              value={restaurantName}
              onChangeText={setRestaurantName}
            />
            <RestaurantDetailWrapper>
              <RestaurantDetailTitle>Description:</RestaurantDetailTitle>
              <RestaurantDetailEditable
                height={200}
                multiline
                onChangeText={setRestaurantDescription}
                value={restaurantDescription}
              />
            </RestaurantDetailWrapper>
            <RestaurantDetailWrapper>
              <RestaurantDetailTitle>Address:</RestaurantDetailTitle>
              <RestaurantDetailEditable
                height={70}
                multiline
                onChangeText={setRestaurantLocation}
                value={restaurantLocation}
              />
            </RestaurantDetailWrapper>
            {restaurantInfo.score && (
              <RestaurantDetailWrapper>
                <RestaurantDetailTitle>Average Rating:</RestaurantDetailTitle>
                <RestaurantDetail>
                  {restaurantInfo.score.toFixed(2)}
                </RestaurantDetail>
              </RestaurantDetailWrapper>
            )}
            <UploadImageComponent setImgB64={setImgB64} imgB64={imgB64} />
          </>
        ) : (
          <>
            <RestaurantTitle>{restaurantName}</RestaurantTitle>
            <RestaurantDetailWrapper>
              <RestaurantDetailTitle>Description:</RestaurantDetailTitle>
              <RestaurantDetail>{restaurantDescription}</RestaurantDetail>
            </RestaurantDetailWrapper>
            <RestaurantDetailWrapper>
              <RestaurantDetailTitle>Address:</RestaurantDetailTitle>
              <RestaurantDetail>{restaurantLocation}</RestaurantDetail>
            </RestaurantDetailWrapper>
            {restaurantInfo.score && (
              <RestaurantDetailWrapper>
                <RestaurantDetailTitle>Average Rating:</RestaurantDetailTitle>
                <RestaurantDetail>
                  {restaurantInfo.score.toFixed(2)}
                </RestaurantDetail>
              </RestaurantDetailWrapper>
            )}
            <RestaurantImage
              source={{
                uri: `data:image/png;base64,${imgB64}`,
              }}
            />
          </>
        )}

        <ReviewsWrapper>
          {showLeaveReviewButton() && (
            <Button title="Leave Review" onPress={() => setModalIsOpen(true)} />
          )}
          <ReviewsTitle>Reviews: </ReviewsTitle>
          {reviewComponents}
        </ReviewsWrapper>
      </SafeAreaContainer>
      <ReviewModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        restaurantId={restaurantId}
      />
    </RestaurantScreenContainer>
  );
};

const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;
const RestaurantScreenContainer = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

const RestaurantTitleGeneral = css`
  color: black;
  font-size: 18px;
  font-weight: 800;
  margin: 10px;
  padding: 5px;
`;

const RestaurantTitle = styled.Text`
  ${RestaurantTitleGeneral}
`;

const RestaurantTitleEditable = styled.TextInput`
  ${RestaurantTitleGeneral}
  border: 1px solid black;
  border-radius: 5px;
`;

const ReviewsTitle = styled.Text`
  font-size: 24px;
  font-weight: 700;
`;

const RestaurantDetailWrapper = styled.View`
  width: 100%;
  padding: 10px;
`;

const RestaurantDetailTitle = styled.Text`
  padding: 0px 10px;
  font-size: 16px;
  font-weight: 700;
`;

const RestaurantDetailGeneral = css`
  font-size: 14px;
  font-weight: 500;
  padding: 10px;
`;

const RestaurantDetail = styled.Text`
  ${RestaurantDetailGeneral}
`;

const RestaurantDetailEditable = styled.TextInput<{ height: number }>`
  ${RestaurantDetailGeneral}
  border: 1px solid black;
  border-radius: 5px;
  height: ${(props) => props.height}px;
`;

const ReviewsWrapper = styled.View`
  width: 100%;
  padding: 20px;
`;

export default RestaurantScreen;
