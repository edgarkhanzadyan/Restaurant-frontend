import { FieldsAreEmpty } from '../firebaseUtility/helpers';
import { backendUrl } from './constants';
import { api } from './utility';

type CreateRestaurantRequestBody = {
  name: string;
  description: string;
  location: string;
  image?: string;
};

export const createRestaurant = ({
  name,
  description,
  location,
  image,
}: CreateRestaurantRequestBody): Promise<unknown> => {
  if (!name || !description || !location) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return api<CreateRestaurantRequestBody, unknown>(`${backendUrl}/restaurant`, {
    method: 'POST',
    body: {
      name,
      description,
      location,
      image,
    },
  });
};

type GetRestaurantsQueryParameters = {
  limit: number;
};
type GetRestaurantsRequestBody = {};

export const getRestaurants = ({
  limit,
}: GetRestaurantsRequestBody &
  GetRestaurantsQueryParameters): Promise<unknown> => {
  if (!limit) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return api<GetRestaurantsRequestBody, unknown>(
    `${backendUrl}/restaurant?${limit}`,
    {
      method: 'GET',
      body: {},
    }
  );
};

type GetRestaurantByIdQueryParameters = {
  restaurantId: string;
};
type GetRestaurantByIdRequestBody = {};

export const getRestaurantById = ({
  restaurantId,
}: GetRestaurantByIdRequestBody &
  GetRestaurantByIdQueryParameters): Promise<unknown> => {
  if (!restaurantId) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return api<GetRestaurantByIdRequestBody, unknown>(
    `${backendUrl}/restaurant/${restaurantId}`,
    {
      method: 'GET',
      body: {},
    }
  );
};

type UpdateRestaurantQueryParameters = {
  restaurantId: string;
};
type UpdateRestaurantRequestBody = {};

export const updateRestaurant = ({
  restaurantId,
}: UpdateRestaurantRequestBody &
  UpdateRestaurantQueryParameters): Promise<unknown> => {
  if (!restaurantId) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return api<UpdateRestaurantRequestBody, unknown>(
    `${backendUrl}/restaurant/${restaurantId}`,
    {
      method: 'PUT',
      body: {},
    }
  );
};

type DeleteRestaurantQueryParameters = {
  restaurantId: string;
};
type DeleteRestaurantRequestBody = {};

export const deleteRestaurant = ({
  restaurantId,
}: DeleteRestaurantRequestBody &
  DeleteRestaurantQueryParameters): Promise<unknown> => {
  if (!restaurantId) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return api<DeleteRestaurantRequestBody, unknown>(
    `${backendUrl}/restaurant/${restaurantId}`,
    {
      method: 'DELETE',
      body: {},
    }
  );
};
