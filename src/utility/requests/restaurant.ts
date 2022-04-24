import { FullRestaurant, Restaurant } from '../../types';
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
  skip: number;
};
type GetRestaurantsRequestBody = {};

export const getRestaurants = ({
  limit,
  skip,
}: GetRestaurantsRequestBody & GetRestaurantsQueryParameters): Promise<
  Restaurant[]
> => {
  if (!limit) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return api<GetRestaurantsRequestBody, Restaurant[]>(
    `${backendUrl}/restaurant?limit=${limit}&skip=${skip}`,
    {
      method: 'GET',
    }
  );
};

type GetRestaurantsByOwnerQueryParameters = {
  limit: number;
  skip: number;
  ownerUserId: string;
};
type GetRestaurantsByOwnerRequestBody = {};

export const getRestaurantsByOwner = ({
  limit,
  skip,
  ownerUserId,
}: GetRestaurantsByOwnerRequestBody &
  GetRestaurantsByOwnerQueryParameters): Promise<Restaurant[]> => {
  if (!limit) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return api<GetRestaurantsRequestBody, Restaurant[]>(
    `${backendUrl}/restaurant?limit=${limit}&skip=${skip}&ownerUserId=${ownerUserId}`,
    {
      method: 'GET',
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
  GetRestaurantByIdQueryParameters): Promise<FullRestaurant> => {
  if (!restaurantId) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return api<GetRestaurantByIdRequestBody, FullRestaurant>(
    `${backendUrl}/restaurant/${restaurantId}`,
    {
      method: 'GET',
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
