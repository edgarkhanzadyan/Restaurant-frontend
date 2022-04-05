import React from 'react';
import { Button } from 'react-native';
import styled, { css } from 'styled-components';
import StarComponents from './StarComponents';

import { editReview, submitReply } from '../utility/firebaseUtility';

const ReviewComponent = ({
  openActionSheet,
  id,
  userName,
  score,
  dateTimestamp,
  restaurantId,
  comment,
  setCommentToEdit,
  setCommentToEditText,
  commentToEdit,
  commentToEditText,
  commentToReply,
  setCommentToReply,
  ReviewReply,
}) => (
  <ReviewContainer onPress={openActionSheet} key={id}>
    <ReviewHeader>
      <ReviewerName>{userName}</ReviewerName>
      <StarComponents reviewRating={score} size={20} disabled />
    </ReviewHeader>
    <ReviewerDate>
      Date of visit: {new Date(dateTimestamp).toLocaleDateString('en-GB')}
    </ReviewerDate>
    {commentToEdit === id ? (
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
                reviewId: id,
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
      <ReviewerText>{comment}</ReviewerText>
    )}
    {ReviewReply}
    {commentToReply === id && (
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
                reviewId: id,
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
const ReviewerTextGeneral = css`
  font-size: 16px;
  margin-top: 10px;
`;
const ReviewerText = styled.Text`
  ${ReviewerTextGeneral}
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
