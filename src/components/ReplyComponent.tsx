import React from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';
import { ReviewReply, User } from '../types';

import { updateReviewReply } from '../utility/requests';
import { replyActionSheetWrapper } from '../utility/userInteractionUtility';

type Props = {
  userData: User;
  replyData: ReviewReply;
  setCommentToEdit: (commentToEdit: string | null) => unknown;
  commentToEdit: string | null;
  commentToEditText: string;
  setCommentToEditText: (commentToEditText: string) => unknown;
  setCommentToReply: (commentToReply: string | null) => unknown;
  reviewId: string;
};

const ReplyComponent = ({
  replyData,
  userData,
  setCommentToReply,
  commentToEdit,
  setCommentToEdit,
  commentToEditText,
  setCommentToEditText,
  reviewId,
}: Props) => (
  <ReplyWrapper
    onPress={() =>
      replyActionSheetWrapper({
        replyId: replyData._id,
        reviewId,
        replierId: replyData.replier,
        userData,
        edit: () => {
          setCommentToReply(null);
          setCommentToEdit(replyData._id);
          setCommentToEditText(replyData.comment);
        },
      })
    }
  >
    <ReviewerName>{replyData.replier}</ReviewerName>
    {commentToEdit === replyData._id ? (
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
              updateReviewReply({
                reviewId,
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
      <ReviewerText>{replyData.comment}</ReviewerText>
    )}
  </ReplyWrapper>
);

export default ReplyComponent;

const ReviewerName = styled.Text`
  font-size: 16px;
  font-weight: 500;
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

const ReplyWrapper = styled.TouchableOpacity`
  margin-left: 20px;
  margin-top: 10px;
  background-color: #ddd;
  padding: 10px;
  border-radius: 20px;
`;
