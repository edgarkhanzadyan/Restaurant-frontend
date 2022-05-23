import React, { useState } from 'react';
import { Button } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import StarComponents from '../components/StarComponents';
import { createReview } from '../utility/requests';

type Props = {
  modalIsOpen: boolean;
  setModalIsOpen: (modalIsOpen: boolean) => unknown;
  restaurantId: string;
};

const ReviewModal = ({ modalIsOpen, setModalIsOpen, restaurantId }: Props) => {
  const [reviewDate, setReviewDate] = useState(new Date());
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');

  return (
    <Modal
      isVisible={modalIsOpen}
      onBackdropPress={() => setModalIsOpen(false)}
      swipeDirection="down"
      onSwipeComplete={() => setModalIsOpen(false)}
    >
      <ModalWrapper>
        <StarsTitle>Rate your experience:</StarsTitle>
        <StarComponents
          disabled={false}
          reviewRating={reviewRating}
          setReviewRating={setReviewRating}
          size={40}
        />
        <CommentContainer
          multiline
          onChangeText={setReviewComment}
          value={reviewComment}
        />
        <DateTimePickerWrapper
          value={reviewDate}
          mode="date"
          display="spinner"
          onChange={(_: Event, selectedDate: Date | undefined) => {
            const currentDate = selectedDate || reviewDate;
            setReviewDate(currentDate);
          }}
          maximumDate={new Date()}
        />

        <Button
          title="Submit review"
          onPress={() => {
            createReview({
              restaurant: restaurantId,
              comment: reviewComment.trim(),
              score: reviewRating,
            }).then(() => {
              setModalIsOpen(false);
              setReviewRating(0);
              setReviewComment('');
              setReviewDate(new Date());
            });
          }}
        />
      </ModalWrapper>
    </Modal>
  );
};

const ModalWrapper = styled.View`
  display: flex;
  align-items: center;
  padding: 20px;
  height: 500px;
  border-radius: 25px;
  padding-bottom: 20px;
  background-color: #ffffff;
`;

const DateTimePickerWrapper = styled(DateTimePicker)`
  width: 100%;
`;

const StarsTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const CommentContainer = styled.TextInput`
  width: 80%;
  border: 1px black solid;
  height: 100px;
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 20px;
`;

export default ReviewModal;
