import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Button, View } from 'react-native';
import styled, { css } from 'styled-components/native';

import ReviewModal from '../../modals/ReviewModal';
import UploadImageComponent from '../../components/UploadImageComponent';
import ReplyComponent from '../../components/ReplyComponent';
import ReviewComponent from '../../components/ReviewComponent';
import RestaurantImage from '../../components/RestaurantImage';
import { USER_ROLE } from '../../constants';
import {
  reviewActionSheetWrapper,
  replyActionSheetWrapper,
  editInfoActionSheet,
} from '../../utility/userInteractionUtility';

import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/types';
import { getRestaurantById } from '../../utility/requests';
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
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [commentToEditText, setCommentToEditText] = useState('');
  const [commentToReply, setCommentToReply] = useState(null);

  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantDescription, setRestaurantDescription] = useState('');
  const [restaurantLocation, setRestaurantLocation] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const resetRestaurantInfo = () => {
    if (restaurantInfo) {
      setRestaurantName(restaurantInfo.name);
      setRestaurantDescription(restaurantInfo.description);
      setRestaurantLocation(restaurantInfo.location);
      setImgUrl(restaurantInfo.image);
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
      // if (userData.role !== USER_ROLE.REGULAR) {
      //   if (isEditing) {
      //     return (
      //       <Button
      //         onPress={() => {
      //           editInfoActionSheet({
      //             onEdit: () =>
      //               updateRestaurantData({
      //                 restaurantName: restaurantName.trim(),
      //                 restaurantDescription: restaurantDescription.trim(),
      //                 restaurantLocation: restaurantLocation.trim(),
      //                 imgUrl,
      //                 restaurantId,
      //               }).then(() => {
      //                 setIsEditing(false);
      //               }),
      //             onCancel: () => {
      //               setIsEditing(false);
      //               resetRestrauntInfo();
      //             },
      //           });
      //         }}
      //         title="Done"
      //       />
      //     );
      //   }
      //   return <Button onPress={() => setIsEditing(true)} title="Edit" />;
      // }
      return <View />;
    };
    navigation.setOptions({ headerRight });
  });

  if (!restaurantInfo) return <ActivityIndicator />;

  const showLeaveReviewButton = () => {
    if (userData.role === USER_ROLE.RESTAURANT_OWNER) return false;
    if (
      userData.role === USER_ROLE.REGULAR &&
      restaurantInfo.reviews &&
      restaurantInfo.reviews.some((rev) => rev.creatorId === userData.userUid)
    )
      return false;
    return true;
  };
  const reviewComponents =
    restaurantInfo.reviews &&
    restaurantInfo.reviews.map((rev) => (
      <ReviewComponent
        id={rev._id}
        key={rev._id}
        userName={rev.reviewer}
        score={rev.score}
        dateTimestamp={rev.createdAt}
        restaurantId={restaurantId}
        comment={rev.comment}
        commentToEdit={commentToEdit}
        setCommentToEdit={setCommentToEdit}
        commentToEditText={commentToEditText}
        setCommentToEditText={setCommentToEditText}
        commentToReply={commentToReply}
        setCommentToReply={setCommentToReply}
        openActionSheet={() =>
          reviewActionSheetWrapper({
            restaurantId,
            reviewId: rev._id,
            isCommentReplied: !!rev.reply,
            creatorId: rev.reviewer,
            userData,
            edit: () => {
              setCommentToReply(null);
              setCommentToEdit(rev._id);
              setCommentToEditText(rev.comment);
            },
            reply: () => {
              setCommentToEdit(null);
              setCommentToReply(rev._id);
              setCommentToEditText('');
            },
          })
        }
        ReviewReply={
          !rev.reply ? (
            <View />
          ) : (
            <ReplyComponent
              openReplyActionSheet={() =>
                replyActionSheetWrapper({
                  restaurantId,
                  reviewId: rev.id,
                  replierId: rev.reply.replierId,
                  userData,
                  edit: () => {
                    setCommentToReply(null);
                    setCommentToEdit(rev.reply.id);
                    setCommentToEditText(rev.reply.comment);
                  },
                })
              }
              userName={rev.reply.userName}
              id={rev.reply.id}
              comment={rev.reply.comment}
              commentToEdit={commentToEdit}
              setCommentToEdit={setCommentToEdit}
              commentToEditText={commentToEditText}
              setCommentToEditText={setCommentToEditText}
              reviewId={rev.id}
              restaurantId={restaurantId}
            />
          )
        }
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
            {restaurantInfo.averageScore && (
              <RestaurantDetailWrapper>
                <RestaurantDetailTitle>Average Rating:</RestaurantDetailTitle>
                <RestaurantDetail>
                  {restaurantInfo.averageScore.toFixed(2)}
                </RestaurantDetail>
              </RestaurantDetailWrapper>
            )}
            <UploadImageComponent setImgUrl={setImgUrl} imgUrl={imgUrl} />
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
            {restaurantInfo.averageScore && (
              <RestaurantDetailWrapper>
                <RestaurantDetailTitle>Average Rating:</RestaurantDetailTitle>
                <RestaurantDetail>
                  {restaurantInfo.averageScore.toFixed(2)}
                </RestaurantDetail>
              </RestaurantDetailWrapper>
            )}
            <RestaurantImage
              source={{
                uri: imgUrl,
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

const RestaurantDetailEditable = styled.TextInput`
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
