import { FieldsAreEmpty } from '../firebaseUtility/helpers';
import { backendUrl } from './constants';

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
}: CreateRestaurantRequestBody) => {
  if (!name || !description || !location) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return fetch(`${backendUrl}/restaurant`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      description,
      location,
      image,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => res.json());
};

type GetRestaurantsRequestBody = {
  limit: number;
};

export const getRestaurants = ({ limit }: GetRestaurantsRequestBody) => {
  if (!limit) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return fetch(`${backendUrl}/restaurant?${limit}`, {
    method: 'GET',
  }).then((res) => res.json());
};

type GetRestaurantByIdRequestBody = {
  restaurantId: string;
};

export const getRestaurantById = ({
  restaurantId,
}: GetRestaurantByIdRequestBody) => {
  if (!restaurantId) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return fetch(`${backendUrl}/restaurant/${restaurantId}`, {
    method: 'GET',
  }).then((res) => res.json());
};

type UpdateRestaurantRequestBody = {
  restaurantId: string;
};

export const updateRestaurant = ({
  restaurantId,
}: UpdateRestaurantRequestBody) => {
  if (!restaurantId) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return fetch(`${backendUrl}/restaurant/${restaurantId}`, {
    method: 'PUT',
  }).then((res) => res.json());
};

type DeleteRestaurantRequestBody = {
  restaurantId: string;
};

export const deleteRestaurant = ({
  restaurantId,
}: DeleteRestaurantRequestBody) => {
  if (!restaurantId) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return fetch(`${backendUrl}/restaurant/${restaurantId}`, {
    method: 'DELETE',
  }).then((res) => res.json());
};

// export const signup = ({ email, password, role }) =>
