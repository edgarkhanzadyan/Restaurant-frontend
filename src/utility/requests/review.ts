import { Review } from '../../types';
import { FieldsAreEmpty } from '../helpers';
import { backendUrl } from './constants';
import { api } from './utility';

type CreateReviewRequestBody = {
  restaurant: string;
  comment: string;
  score: number;
};

export const createReview = ({
  restaurant,
  comment,
  score,
}: CreateReviewRequestBody): Promise<unknown> => {
  if (!restaurant || !comment || !score) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return api<CreateReviewRequestBody, unknown>(`${backendUrl}/review`, {
    method: 'POST',
    body: {
      restaurant,
      comment,
      score,
    },
  });
};

type UpdateReviewQueryParameters = {
  reviewId: string;
};
type UpdateReviewRequestBody = {
  comment: string;
  score: number;
};

export const updateReview = ({
  reviewId,
  comment,
  score,
}: UpdateReviewRequestBody & UpdateReviewQueryParameters): Promise<unknown> => {
  if (!reviewId || !comment || !score) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return api<UpdateReviewRequestBody, unknown>(
    `${backendUrl}/review/${reviewId}`,
    {
      method: 'PUT',
      body: {
        comment,
        score,
      },
    }
  );
};

type DeleteReviewQueryParameters = {
  reviewId: string;
};
type DeleteReviewRequestBody = {};

export const deleteReview = ({
  reviewId,
}: DeleteReviewRequestBody & DeleteReviewQueryParameters): Promise<unknown> => {
  if (!reviewId) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return api<DeleteReviewRequestBody, unknown>(
    `${backendUrl}/review/${reviewId}`,
    {
      method: 'DELETE',
      body: {},
    }
  );
};

type CreateReviewReplyQueryParameters = {
  reviewId: string;
};
type CreateReviewReplyRequestBody = {
  comment: string;
};
export const createReviewReply = ({
  reviewId,
  comment,
}: CreateReviewReplyRequestBody &
  CreateReviewReplyQueryParameters): Promise<unknown> => {
  if (!reviewId || !comment) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return api(`${backendUrl}/review/${reviewId}/reply`, {
    method: 'POST',
    body: {
      comment,
    },
  });
};

type UpdateReviewReplyQueryParameters = {
  reviewId: string;
};
type UpdateReviewReplyRequestBody = {
  comment: string;
};

export const updateReviewReply = ({
  reviewId,
  comment,
}: UpdateReviewReplyRequestBody &
  UpdateReviewReplyQueryParameters): Promise<unknown> => {
  if (!reviewId || !comment) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return api<UpdateReviewReplyRequestBody, unknown>(
    `${backendUrl}/review/${reviewId}/reply`,
    {
      method: 'PUT',
      body: {
        comment,
      },
    }
  );
};

type DeleteReviewReplyQueryParameters = {
  reviewId: string;
  replyId: string;
};
type DeleteReviewReplyRequestBody = {};
export const deleteReviewReply = ({
  reviewId,
  replyId,
}: DeleteReviewReplyRequestBody & DeleteReviewReplyQueryParameters) => {
  if (!reviewId || !replyId) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return api<DeleteReviewReplyRequestBody, unknown>(
    `${backendUrl}/review/${reviewId}/reply/${replyId}`,
    {
      method: 'DELETE',
      body: {},
    }
  );
};

type GetUnrepliedReviewsRequestBody = {};
type GetUnrepliedReviewsResponseBody = { reviews: Review[]; message: string };
export const getUnrepliedReviews = () =>
  api<GetUnrepliedReviewsRequestBody, GetUnrepliedReviewsResponseBody>(
    `${backendUrl}/review/unreplied`,
    {
      method: 'GET',
    }
  );
