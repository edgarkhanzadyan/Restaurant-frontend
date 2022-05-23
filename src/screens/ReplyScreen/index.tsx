import React, { useState } from 'react';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';

import StarComponents from '../../components/StarComponents';
import SubmitButton from '../../components/SubmitButton';
import { RootStackParamList } from '../../navigation/types';
import { createReviewReply } from '../../utility/requests';

const ReplyScreen = ({
  navigation,
  route: {
    params: { score, comment, reviewId, userName, restaurantName, onBack },
  },
}: StackScreenProps<RootStackParamList, 'ReplyScreen'>) => {
  const [replyComment, setReplyComment] = useState('');
  return (
    <ResponseWrapper contentContainerStyle={{ alignItems: 'center' }}>
      <ResponseHeader>
        <StarComponents reviewRating={score} disabled size={20} />
        <ResponseUser>{userName}</ResponseUser>
      </ResponseHeader>
      <ResponseRestaurant>{restaurantName}</ResponseRestaurant>
      <ResponseBody>{comment}</ResponseBody>
      <ResponseTextInput
        multiline
        value={replyComment}
        onChangeText={setReplyComment}
      />
      <SubmitButton
        isInverse={false}
        style={{ marginTop: 20 }}
        title="Submit"
        onPress={() => {
          createReviewReply({
            reviewId,
            comment: replyComment.trim(),
          }).then(() => {
            navigation.pop();
            onBack();
          });
        }}
      />
    </ResponseWrapper>
  );
};

export default ReplyScreen;

const ResponseWrapper = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;
const ResponseHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  width: 100%;
`;
const ResponseBody = styled.Text`
  padding: 10px 20px;
  font-size: 14px;
  width: 100%;
`;
const ResponseUser = styled.Text`
  color: black;
  font-size: 14px;
  font-weight: 800;
`;

const ResponseTextInput = styled.TextInput`
  width: 80%;
  border: 1px black solid;
  height: 100px;
  border-radius: 20px;
  padding: 15px;
`;

const ResponseRestaurant = styled.Text`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
`;
