import { FieldsAreEmpty } from '../firebaseUtility/helpers';
import { backendUrl } from './constants';

type CreateReviewRequestBody = {
  restaurantId: string;
  comment: string;
  score: number;
};

export const createReview = ({
  restaurantId,
  comment,
  score,
}: CreateReviewRequestBody) => {
  if (!restaurantId || !comment || !score) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return fetch(`${backendUrl}/review`, {
    method: 'POST',
    body: JSON.stringify({
      restaurant: restaurantId,
      comment,
      score,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => res.json());
};

type UpdateReviewRequestBody = {
  reviewId: string;
  comment: string;
  score: number;
};

export const updateReview = ({
  reviewId,
  comment,
  score,
}: UpdateReviewRequestBody) => {
  if (!reviewId || !comment || !score) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return fetch(`${backendUrl}/review/${reviewId}`, {
    method: 'PUT',
    body: JSON.stringify({
      comment,
      score,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => res.json());
};

type DeleteReviewRequestBody = {
  reviewId: string;
};

export const deleteReview = ({ reviewId }: DeleteReviewRequestBody) => {
  if (!reviewId) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return fetch(`${backendUrl}/review/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => res.json());
};

type CreateReviewReplyRequestBody = {
  reviewId: string;
  comment: string;
};

export const createReviewReply = ({
  reviewId,
  comment,
}: CreateReviewReplyRequestBody) => {
  if (!reviewId || !comment) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return fetch(`${backendUrl}/review/${reviewId}/reply`, {
    method: 'POST',
    body: JSON.stringify({
      comment,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => res.json());
};

type UpdateReviewReplyRequestBody = {
  reviewId: string;
  comment: string;
};

export const updateReviewReply = ({
  reviewId,
  comment,
}: UpdateReviewReplyRequestBody) => {
  if (!reviewId || !comment) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return fetch(`${backendUrl}/review/${reviewId}/reply`, {
    method: 'PUT',
    body: JSON.stringify({
      comment,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => res.json());
};

type DeleteReviewReplyRequestBody = {
  reviewId: string;
  replyId: string;
};

export const deleteReviewReply = ({
  reviewId,
  replyId,
}: DeleteReviewReplyRequestBody) => {
  if (!reviewId || !replyId) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return fetch(`${backendUrl}/review/${reviewId}/reply/${replyId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => res.json());
};
