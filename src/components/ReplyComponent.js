import React from 'react';
import { Button } from 'react-native';
import styled, { css } from 'styled-components';

import { editReviewReply } from '../utility/firebaseUtility';

const ReplyComponent = ({
  openReplyActionSheet,
  userName,
  id,
  comment,
  commentToEdit,
  setCommentToEdit,
  commentToEditText,
  setCommentToEditText,
  restaurantId,
  reviewId,
}) => (
  <ReplyWrapper onPress={openReplyActionSheet}>
    <ReviewerName>{userName}</ReviewerName>
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
              editReviewReply({
                reviewId,
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
  </ReplyWrapper>
);

export default ReplyComponent;

const ReviewerName = styled.Text`
  font-size: 16px;
  font-weight: 500;
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

const ReplyWrapper = styled.TouchableOpacity`
  margin-left: 20px;
  margin-top: 10px;
  background-color: #ddd;
  padding: 10px;
  border-radius: 20px;
`;
