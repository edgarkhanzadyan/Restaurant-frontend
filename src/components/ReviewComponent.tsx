import React from 'react';
import { Button, View } from 'react-native';
import styled from 'styled-components/native';
import StarComponents from './StarComponents';

import { editReview, submitReply } from '../utility/firebaseUtility';
import { Review, User } from '../types';
import ReplyComponent from './ReplyComponent';
import { reviewActionSheetWrapper } from '../utility/userInteractionUtility';

type Props = {
  reviewData: Review;
  userData: User;
  restaurantId: string;
  setCommentToEdit: (commentToEdit: string | null) => unknown;
  setCommentToEditText: (commentToEditText: string) => unknown;
  commentToEdit: string | null;
  commentToEditText: string;
  commentToReply: string | null;
  setCommentToReply: (commentToReply: string | null) => unknown;
};

const ReviewComponent = ({
  reviewData,
  userData,
  restaurantId,
  setCommentToEdit,
  setCommentToEditText,
  commentToEdit,
  commentToEditText,
  commentToReply,
  setCommentToReply,
}: Props) => (
  <ReviewContainer
    onPress={() =>
      reviewActionSheetWrapper({
        restaurantId,
        reviewId: reviewData._id,
        isCommentReplied: !!reviewData.reply,
        creatorId: reviewData.reviewer,
        userData,
        edit: () => {
          setCommentToReply(null);
          setCommentToEdit(reviewData._id);
          setCommentToEditText(reviewData.comment);
        },
        reply: () => {
          setCommentToEdit(null);
          setCommentToReply(reviewData._id);
          setCommentToEditText('');
        },
      })
    }
    key={reviewData._id}
  >
    <ReviewHeader>
      <ReviewerName>{reviewData.reviewer}</ReviewerName>
      <StarComponents reviewRating={reviewData.score} size={20} disabled />
    </ReviewHeader>
    <ReviewerDate>
      Date of visit:{' '}
      {new Date(reviewData.createdAt).toLocaleDateString('en-GB')}
    </ReviewerDate>
    {commentToEdit === reviewData._id ? (
      <ReviewerTextEditableWrapper>
        <ReviewerTextEditable
          value={commentToEditText}
          onChangeText={setCommentToEditText}
          multiline
        />
        <ReviewerTextEditableFooter>
          <Button
            title="cancel"
            onPress={() => {
              setCommentToEdit(null);
              setCommentToEditText('');
            }}
          />
          <Button
            title="submit"
            onPress={() => {
              editReview({
                reviewId: reviewData._id,
                restaurantId,
                comment: commentToEditText.trim(),
              }).then(() => {
                setCommentToEdit(null);
                setCommentToEditText('');
              });
            }}
          />
        </ReviewerTextEditableFooter>
      </ReviewerTextEditableWrapper>
    ) : (
      <ReviewerText>{reviewData.comment}</ReviewerText>
    )}
    {!reviewData.reply ? (
      <View />
    ) : (
      <ReplyComponent
        userData={userData}
        replyData={reviewData.reply}
        setCommentToEdit={setCommentToEdit}
        commentToEdit={commentToEdit}
        commentToEditText={commentToEditText}
        setCommentToEditText={setCommentToEditText}
        setCommentToReply={setCommentToReply}
        restaurantId={restaurantId}
        reviewId={reviewData._id}
      />
    )}
    {commentToReply === reviewData._id && (
      <ReviewerTextEditableWrapper>
        <ReviewerTextEditable
          value={commentToEditText}
          onChangeText={setCommentToEditText}
          multiline
        />
        <ReviewerTextEditableFooter>
          <Button
            title="cancel"
            onPress={() => {
              setCommentToReply(null);
              setCommentToEditText('');
            }}
          />
          <Button
            title="submit"
            onPress={() => {
              submitReply({
                restaurantId,
                reviewId: reviewData._id,
                replyComment: commentToEditText.trim(),
              }).then(() => {
                setCommentToReply(null);
                setCommentToEditText('');
              });
            }}
          />
        </ReviewerTextEditableFooter>
      </ReviewerTextEditableWrapper>
    )}
  </ReviewContainer>
);

export default ReviewComponent;

const ReviewContainer = styled.TouchableOpacity`
  margin: 10px;
`;

const ReviewHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ReviewerName = styled.Text`
  font-size: 16px;
  font-weight: 500;
`;
const ReviewerDate = styled.Text`
  font-size: 16px;
  font-weight: 500;
  margin-top: 5px;
`;
const ReviewerText = styled.Text`
  font-size: 16px;
  margin-top: 10px;
`;
const ReviewerTextEditableWrapper = styled.View``;

const ReviewerTextEditableFooter = styled.View`
  flex-direction: row;
`;

const ReviewerTextEditable = styled.TextInput`
  font-size: 16px;
  margin-top: 10px;
  border: 1px solid black;
  border-radius: 5px;
  height: 200px;
  padding: 10px;
`;
