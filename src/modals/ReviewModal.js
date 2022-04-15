import React, { useState } from 'react';
import { Button } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { submitReview } from '../utility/firebaseUtility';
import StarComponents from '../components/StarComponents';

const ReviewModal = ({ modalIsOpen, setModalIsOpen, restaurantId }) => {
  const [reviewDate, setReviewDate] = useState(new Date());
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || reviewDate;
    setReviewDate(currentDate);
  };
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
          onChange={onDateChange}
          maximumDate={new Date()}
        />

        <Button
          title="Submit review"
          onPress={() => {
            submitReview({
              restaurantId,
              reviewRating,
              reviewComment: reviewComment.trim(),
              reviewDate,
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
